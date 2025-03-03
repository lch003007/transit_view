'use client'
import React, { useContext, useState,useEffect } from "react";
import {
  Box,
  IconButton,
} from "@mui/material";
import {Delete,Add,Edit} from '@mui/icons-material';
import { DialogContext } from "@/contexts/DialogContext";
import MyDialog from "../MyDialog";
import { Form } from "./Form";
import { BaseTable } from "./baseTable";
import useApi from "@/hooks/useApi";
import Wrapper from "../Wrapper";
import { ReactNode } from "react";

interface Config{
  where?:Record<string,string|number|Date>,
  data?:Record<string,string|number|Date>
}

// 定義數據的類型
// ManualTable 組件
export function FeatureTable({ 
    data=[],
    title={},
    filterValues={},
    totalFilter=false,
    form=false,
    hide=[],
    notNull=[],
    path='',
    numberData=[],
    booleanData=[],
    addFunction,
    editFunction,
    deleteFunction,
    api=false,

    config={}
}: { 
    data?: Record<string,string>[],
    title?:Record<string,string|ReactNode>,
    filterValues?:Record<string,string|number>,
    totalFilter?:boolean,
    form?:boolean,
    hide?:string[],
    notNull?:string[],
    path?:string,
    numberData?:string[],
    booleanData?:string[],
    addFunction?:()=>void,
    editFunction?:(item:Record<string,string>)=>void,
    deleteFunction?:(item:Record<string,string>)=>void,
    api?:boolean,
    config?:Config
 }) {
  const {post} = useApi()
  const [tableData,setTableData] = useState(data)
  const [isLoading,setLoading] = useState(false)
  const {openDialog,keys} = useContext(DialogContext)
  const {addKey,deleteKey,editKey} = keys
  const [keyword,setKeyword] = useState('')
  const [editData,setEditData] = useState<Record<string,string>>({})
  const [deleteData,setDeleteData] = useState<Record<string,string>>({})

  // 處理頁數更改

  useEffect(()=>{
    if(api){
      setLoading(true)
      post(path,config).then(res=>{
        setTableData(res)
        setLoading(false)
      })
    }
  },[])

  // 計算當前頁的數據
  const filteredData = tableData.filter(item=>{
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

  Object.keys(title).length>0?Object.keys(title).map(key=>{
        if(hide.includes(key))
        {
            title[key] = <></>
            return
        }
        title[key] = <>{title[key]?title[key]:key}</>
        if(form){
            title['form'] = <></>
        }
}):<></>
  
  
  const currentData = filteredData.map((item)=>{
    const currentItem:Record<string,string|ReactNode> = {...item}
     Object.keys(item).map((key)=>{
        if(hide.includes(key))
        {
          currentItem[key] = <></>
            return
        }
        if(form){
          currentItem['form'] = <><IconButton  onClick={()=>{
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
                }}><Edit/></IconButton></>
        }
        })
        
    return currentItem
})


  return (
    <Wrapper isLoading={isLoading}>
    {totalFilter?
      <Box sx={{display:'flex',justifyContent:'end',alignItems:'center',marginBottom:'10px',}}>
      <Box sx={{color:'white'}}>關鍵字:</Box>
      <input type="text"             value={keyword}
      onChange={(e)=>{setKeyword(e.target.value)}} style={{height:'30px',border:'none',outline:'none',    borderRadius: "5px", 
          boxShadow: "5px 4px 4px rgba(0, 0, 0, 0.5)",}}/>
  </Box>
  :<></>  
  }
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

  <BaseTable title={title} data={currentData}/>
    



  <MyDialog openKey={addKey}>
    <Form booleanData={booleanData} numberData={numberData} addKey={addKey} editKey={editKey} deleteKey={deleteKey} path={`${path}/insert`} hide={hide} type={addKey} title={title} notNull={notNull} />
  </MyDialog>
  <MyDialog openKey={editKey}>
      <Form booleanData={booleanData} numberData={numberData} addKey={addKey} editKey={editKey} deleteKey={deleteKey} path={`${path}/update`} hide={hide} type={editKey} defaultData={editData} title={title} notNull={notNull} />
</MyDialog> 
<MyDialog openKey={deleteKey}>
      <Form addKey={addKey} editKey={editKey} deleteKey={deleteKey} path={`${path}/delete`} hide={hide} type={deleteKey} defaultData={deleteData} title={title} notNull={notNull} />
</MyDialog>
</Wrapper>
  );
}
