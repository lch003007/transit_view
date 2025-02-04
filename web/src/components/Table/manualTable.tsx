'use client'
import React, { useContext, useState } from "react";
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
import MyDialog from "../MyDialog";
import { Form } from "./Form";
// 定義數據的類型


// ManualTable 組件
export function ManualTable({ data=[],title={},filterValues={},totalFilter=false,form=false,hide=[],notNull=[],path='',numberData=[],booleanData=[],addFunction,editFunction,deleteFunction }: { data?: any[],title?:any,filterValues?:any,totalFilter?:boolean,form?:boolean,hide?:string[],notNull?:string[],path?:string,numberData?:string[],booleanData?:string[],addFunction?:any,editFunction?:any,deleteFunction?:any, }) {
  const {openDialog,closeDialog,keys} = useContext(DialogContext)
  const {addKey,deleteKey,editKey} = keys
  // const addKey = 'formAdd'
  // const deleteKey = 'formDelete'
  // const editKey = 'formEdit'
  const [keyword,setKeyword] = useState('')
  const [page, setPage] = useState(0); // 當前頁數
  const [rowsPerPage, setRowsPerPage] = useState(20); // 每頁顯示的行數
  const [sortInfo,setSortInfo] = useState({key:'',order:1})
  const [sortHover,setSortHover] = useState('')
  const [editData,setEditData] = useState<Record<string,string>>({})
  const [deleteData,setDeleteData] = useState<Record<string,string>>({})

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
  const filteredData = data.filter(item=>{
    let totalString = ''
    const filterResult = Object.keys(item).map(key=>{
        totalString+=String(item[key])
        if(filterValues[key])
            if(!String(item[key]).includes(String(filterValues[key])))
                return false
        return true
    })

    for(const result of filterResult){
        if(!result)
            return result
    }
    return totalString.includes(keyword)
    //return true
  })
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
    {totalFilter?
      <Box sx={{display:'flex',justifyContent:'end',alignItems:'center',marginBottom:'10px',}}>
      <Box sx={{color:'white'}}>關鍵字:</Box>
      <input type="text"             value={keyword}
      onChange={(e)=>{setKeyword(e.target.value)}} style={{height:'30px',border:'none',outline:'none',    borderRadius: "5px", 
          boxShadow: "5px 4px 4px rgba(0, 0, 0, 0.5)",}}/>

  </Box>
  :<></>  
  }

    
    <Paper sx={{
      boxShadow: "5px 4px 4px rgba(0, 0, 0, 0.5)",
      borderRadius: "10px"
    }}>
      {form?
    <Box sx={{display:'flex',justifyContent:'end',paddingTop:'10px',paddingRight:'10px'}}><IconButton onClick={()=>{
      if(addFunction)
        addFunction()
      else{
        openDialog(addKey)
      }
      }}><Add/></IconButton>
      </Box>:<></>  
    }
      
      
      
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {Object.keys(title).length>0?Object.keys(title).map(key=>{
                if(hide.includes(key))
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
                {form?<TableCell></TableCell>:<></>}
            </TableRow>
          </TableHead>
          <TableBody>
          {currentData.map((item,index)=>{
                return <TableRow key={`tableRow${index}`}>
                    {Object.keys(item).map((key,index)=>{
                                      if(hide.includes(key))
                                        return <></>
                        return <TableCell key={key=`tableCell${index}`}>{item[key]}</TableCell>
                    })}
                    {form?<TableCell><IconButton  onClick={()=>{
                      if(deleteFunction){
                        deleteFunction(item)
                      }else{
                        setDeleteData(item)
                        openDialog(deleteKey)
                      }
}
                    }><Delete/></IconButton><IconButton  onClick={()=>{
                      if(editFunction){
                        editFunction(item)
                      }else{
                        setEditData(item)
                        openDialog(editKey)
                      }
                      

                      
                      }}><Edit/></IconButton></TableCell>:<></>}
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
        rowsPerPageOptions={[20, 30, 10000]} // 可選每頁行數
        labelRowsPerPage='每頁數量：'
      />
    </Paper>

  <MyDialog openKey={addKey}>
    <Form booleanData={booleanData} numberData={numberData} addKey={addKey} editKey={editKey} deleteKey={deleteKey} path={`${path}/insert`} hide={hide} type={addKey} title={title} notNull={notNull} />
  </MyDialog>
  <MyDialog openKey={editKey}>
      <Form booleanData={booleanData} numberData={numberData} addKey={addKey} editKey={editKey} deleteKey={deleteKey} path={`${path}/update`} hide={hide} type={editKey} defaultData={editData} title={title} notNull={notNull} />
</MyDialog> 
<MyDialog openKey={deleteKey}>
      <Form addKey={addKey} editKey={editKey} deleteKey={deleteKey} path={`${path}/delete`} hide={hide} type={deleteKey} defaultData={deleteData} title={title} notNull={notNull} />
</MyDialog>
    </>
  );
}
