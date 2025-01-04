'use client'
import { useEffect, useState,useContext } from "react";
import api from "@/api";
import { Box } from "@mui/material";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { ItemPickerContext } from "@/contexts/ItemPickerContext";
import {ButtonGroup,Button} from "@mui/material";


export default function ItemPicker({title,path,itemKey}:{title:string,path:string,itemKey:string}){
    const {setItemLength,itemLength,setItemsSelected,itemsSelected} = useContext(ItemPickerContext)
    const [videos,setVideos] = useState([{id:'',location:''}])
    const {post} = api
    const vidtoLengthOption = [1,4,9,16]

    useEffect(()=>{
      setItemLength(1)
      setItemsSelected({})
      post(path).then(function(data){
        setVideos(data)
      })
    },[])
    
    return (
<Box sx={{
    background:'#3A566C',
    marginRight:'30px',
    color:'white',
    borderRadius: "10px", 
        boxShadow: "5px 4px 4px rgba(0, 0, 0, 0.5)",
        padding:'10px',
        overflow:'auto',
        height:'100%',
        maxWidth:'250px'
    }}>
        <ButtonGroup  variant="outlined" aria-label="Basic button group">
            {vidtoLengthOption.map(item=>{
                return <Button sx={{background:item==itemLength?'#84C1FF':'white'}} onClick={()=>{
                    setItemLength(item)
                    setItemsSelected((prevData)=>{
                        Object.keys(prevData).map(prevKey=>{
                            if(Number(prevKey)>=item)
                                delete prevData[prevKey]
                        })
                        return prevData
                    })
                }} key={`buttonGroup${item}`}><Box>{item}</Box></Button>
            })}
        </ButtonGroup>
    <TableContainer component={Paper}>
      <Table sx={{borderCollapse: "separate", borderSpacing: 0,background:'#3A566C'}}>
        {/* 表頭 */}
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold",color:'white' }}>{title}</TableCell>
          </TableRow>
        </TableHead>

        {/* 表格內容 */}
        <TableBody>
          {videos.map((video,index) => (
            <TableRow
              key={`videoRow${video.id}`}
              sx={{
                "&:not(:last-child)": {
                  borderBottom: "1px solid #f0f0f0", // 白線分隔
                },
              }}
            >
              <TableCell draggable
              onDragStart={(e) => {
                e.dataTransfer.setData("item", JSON.stringify(video));
              }} sx={{ fontSize: "16px", padding: "15px",cursor: "pointer",color:itemsSelected[index]?'#84C1FF':'white' }}>
                {video[itemKey as keyof typeof video]}
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
</Box>
    );
  };