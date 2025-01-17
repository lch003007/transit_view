'use client'
import React, { useContext, useState,useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  Box,
  IconButton,
} from "@mui/material";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import {Delete,Add,Edit} from '@mui/icons-material';
import { DialogContext } from "@/contexts/DialogContext";
import MyDialog from "@/components/MyDialog";

import { Form } from "@/components/Table/Form";
import useApi from "@/hooks/useApi";
import { routes } from "@/routes";
import { MyButton, MySelect, MyText } from "@/components/MyInput";


// 定義數據的類型



// ManualTable 組件
export default function User({title={},filterValues={},totalFilter=false,form=false,hide=[],notNull=[],path='',numberData=[],booleanData=[] }: { title?:any,filterValues?:any,totalFilter?:boolean,form?:boolean,hide?:string[],notNull?:string[],path?:string,numberData?:string[],booleanData?:string[] }) {
    const {post} = useApi()
    const {openDialog,closeDialog,keys} = useContext(DialogContext)
  const {addKey,deleteKey,editKey} = keys
  const [page, setPage] = useState(0); // 當前頁數
  const [rowsPerPage, setRowsPerPage] = useState(5); // 每頁顯示的行數
  const [sortInfo,setSortInfo] = useState({key:'',order:1})
  const [sortHover,setSortHover] = useState('')
  const [editData,setEditData] = useState<Record<string,string>>({})
  const [deleteData,setDeleteData] = useState<Record<string,string>>({})
  const [data,setData] = useState([])
    useEffect(()=>{
        post('auth').then((dbData)=>{
            setData(dbData.map((item:any)=>{
                return {...item,password:'********'}
            }))
        })
    },[])
  // 處理頁數更改
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  // 處理每頁顯示行數的更改
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // 計算當前頁的數據
  const filteredData = data
  if(filteredData.length>0){
    if(Object.keys(filteredData[0]).includes(sortInfo['key'])){
        filteredData.sort((a,b)=>{
            return sortInfo.order === 1 ? (a[sortInfo.key] > b[sortInfo.key] ? 1 : -1) : (a[sortInfo.key] > b[sortInfo.key] ? -1 : 1)
        })
    }
  }
  
  const currentData = filteredData.map(item=>{
    const newItem:any = {}
    Object.keys(title).map(key=>{
        newItem[key] = item[key]
    })
    // console.log(newItem)
    return newItem
  }).slice(page * rowsPerPage, (page + 1) * rowsPerPage);

  return (
    <>
    <Paper sx={{
      boxShadow: "5px 4px 4px rgba(0, 0, 0, 0.5)",
      borderRadius: "10px"
    }}>

    <Box sx={{display:'flex',justifyContent:'end',paddingTop:'10px',paddingRight:'10px'}}><IconButton onClick={()=>{
        openDialog(addKey)
        
        }}><Add/></IconButton>
      </Box>
    
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {Object.keys(title).length>0?Object.keys(title).map(key=>{
                if(hide.includes(key)||key=='auth')
                  return <></>
                return <TableCell key={key} >
                    <button onClick={()=>{
                        setSortInfo((prevData)=>{
                            setSortHover('')
                            if(prevData['key']==key)
                                return {key:key,order:prevData['order']*-1}
                            else
                                return {key:key,order:1}
                        })
                    }} style={{
                        fontSize:'16px',
                        display:'flex',
                        alignItems:'center',
                        cursor:'pointer',
                        background:'none',
                        border:'none'}}
                        onMouseEnter={()=>{
                            if(sortInfo['key']!=key)
                                setSortHover(key)
                        }}
                        onMouseLeave={()=>{
                            setSortHover('')
                        }}
                        >
                        {title[key]?title[key]:key}
                        {sortHover==key?
                        <ArrowUpwardIcon sx={{fontSize:'16px',color:'gray'}}/>:<></>
                    }
                    {sortInfo['key']==key?
                sortInfo['order']==1?
                <ArrowUpwardIcon sx={{fontSize:'16px',color:'black'}}/>
                :<ArrowDownwardIcon sx={{fontSize:'16px',color:'black'}}/>
                :<></>    
                }
                        
                        </button>
                    </TableCell>
}):<></>}
                <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {currentData.map((item,index)=>{
                return <TableRow key={`tableRow${index}`}>
                    {Object.keys(item).map((key,index)=>{
                                      if(hide.includes(key)||key=='auth')
                                        return <></>
                        return <TableCell key={key=`tableCell${index}`}>{item[key]}</TableCell>
                    })}
                    <TableCell><IconButton  onClick={()=>{
                      setDeleteData(item)
                      openDialog(deleteKey)}
                    }><Delete/></IconButton><IconButton  onClick={()=>{
                      
                      setEditData(item)
                      openDialog(editKey)
                      
                      }}><Edit/></IconButton></TableCell>
                </TableRow>
            })}

          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={filteredData.length} // 總行數
        page={page} // 當前頁數
        onPageChange={handleChangePage} // 處理頁數更改
        rowsPerPage={rowsPerPage} // 每頁行數
        onRowsPerPageChange={handleChangeRowsPerPage} // 處理每頁行數更改
        rowsPerPageOptions={[5, 10, 15]} // 可選每頁行數
        labelRowsPerPage='每頁數量：'
      />
    </Paper>

  <MyDialog openKey={addKey}>
        <AddUser/>
  </MyDialog>
  <MyDialog openKey={editKey}>
      <EditUser editData={editData} />
</MyDialog> 
<MyDialog openKey={deleteKey}>
      <Form addKey={addKey} editKey={editKey} deleteKey={deleteKey} path={`${path}/delete`} hide={hide} type={deleteKey} defaultData={deleteData} title={title} notNull={notNull} />
</MyDialog>
    </>
  );
}

function AddUser(){
    const [state,setState] = useState({username:'',password:'',auth:''})
    return <UserForm state={state} setState={setState} path='auth/insert' type='add'/>

}

function UserForm({state,setState,path,type,originalState,id,usernameDisabled=false}:any){
    const {post} = useApi()
    return <Box sx={{marginX:'10px',marginBottom:'5px',display:'flex',flexDirection:'column',gap:'10px'}}>
        帳號:<MyText disabled={usernameDisabled} value={state['username']} onChange={(e)=>{
            setState((prevData:any)=>{
                return {...prevData,username:e.target.value}
            })
        }} />
        密碼:<MyText type="password" value={state['password']} onChange={(e)=>{
            setState((prevData:any)=>{
                return {...prevData,password:e.target.value}
            })
        }} />
        權限:<AuthSelect state={state['auth']} setState={(data:any)=>{
        setState((prevData:any)=>{
            return {...prevData,auth:data}
        })
    }}  />
        <Box sx={{display:'flex',justifyContent:'start'}}>

            <MyButton onClick={()=>{
                const config = postFormat(state,type,originalState,id)
                post(path,config).then(()=>{
                    window.location.reload();
                })

            }}>確定</MyButton>
        </Box>
    </Box>
}

function postFormat(data:any,type:string,originalData?:any,id?:number){
    if(type=='edit'){
        const editData:any = {}
        Object.keys(data).map((key:any)=>{
            if(data[key]!=originalData[key])
                editData[key] = data[key]
        })
        console.log(editData)
        return {
            where:{
                id:id
            },
            data:editData
        }
    }
    return data
}

function EditUser({editData}:any){
    const [state,setState] = useState({...editData,password:''})

    return <UserForm originalState={{username:editData.username,password:'',auth:editData.auth}} id={editData.id} state={state} setState={setState} path='auth/update' type='edit' usernameDisabled={true} />
}

// function postInsert(path){
//     const {post} = useApi()
// }

function AuthSelect({state,setState}:any){
    const title:any = {}
    const values = state==""?[]:state.split(',')
    routes.map((route:any)=>{
        title[route.path] = <><input type="checkbox" />{route.name}</>
    })
    return <ul>{routes.map((item:any)=>{
        return <li style={{display:'flex'}}><input checked={values.includes(item.path)}
        onChange={(e)=>{
            if(e.target.checked)
                setState([...values,item.path].join(','))
            else
                setState(values.filter((value:string)=>value!=item.path).join(','))
        }}
        style={{
            display:'flex',
        }} type="checkBox" />{item.name}</li>
    })}</ul>
}
