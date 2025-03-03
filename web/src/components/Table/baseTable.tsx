'use client'
import React, { ReactNode, useContext, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
} from "@mui/material";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { Interface } from "readline";

// 定義數據的類型

interface SortInfo{
  key:string,
  order:number
}
// ManualTable 組件
export function BaseTable({ data=[],title={}}: { data?: Record<string,string|number|ReactNode>[],title?:Record<string,string|number|ReactNode>}) {
  const [page, setPage] = useState(0); // 當前頁數
  const [rowsPerPage, setRowsPerPage] = useState(20); // 每頁顯示的行數
  const [sortInfo,setSortInfo] = useState<SortInfo>({key:'',order:1})
  const [sortHover,setSortHover] = useState('')

  // 處理頁數更改
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  // 處理每頁顯示行數的更改
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if(data.length>0){
    if(Object.keys(data[0]).includes(sortInfo['key'])){
        data.sort((a,b)=>{
          const aValue = a[sortInfo.key]?? ""
          const bValue = b[sortInfo.key]?? ""
          return sortInfo.order === 1 ? (aValue > bValue ? 1 : -1) : (aValue > bValue ? -1 : 1)
      })

    }
  }
  
  const currentData = data.map(item=>{
    const newItem:Record<string,string|number|ReactNode> = {}
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
      
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {Object.keys(title).length>0?Object.keys(title).map(key=>{
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
            </TableRow>
          </TableHead>
          <TableBody>
          {currentData.map((item,index)=>{
                return <TableRow key={`tableRow${index}`}>
                    {Object.keys(item).map((key,index)=>{
                        return <TableCell key={key=`tableCell${index}`}>{item[key]}</TableCell>
                    })}
                </TableRow>
            })}
        
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={data.length} // 總行數
        page={page} // 當前頁數
        onPageChange={handleChangePage} // 處理頁數更改
        rowsPerPage={rowsPerPage} // 每頁行數
        onRowsPerPageChange={handleChangeRowsPerPage} // 處理每頁行數更改
        rowsPerPageOptions={[20, 30, 10000]} // 可選每頁行數
        labelRowsPerPage='每頁數量：'
      />
    </Paper>
    </>
  );
}
