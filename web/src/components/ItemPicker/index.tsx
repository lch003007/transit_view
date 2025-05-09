'use client'
import { useEffect, useContext, useState } from "react";
import { Box } from "@mui/material";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { ItemPickerContext } from "@/contexts/ItemPickerContext";
import {ButtonGroup,Button} from "@mui/material";

interface GroupData{
  name:string,
  itemLength:number,
  roadData:Record<number,Record<string,string|number>>,
  groupId:number
}

interface ItemGroup{
  id:number,
  name:string,
  cctvIds?:string,
  roadIds?:string,
  itemLength:number
}

export default function ItemPicker({title,itemKey,itemOptions,itemGroups=[],groupItemKey,idKey}:{title:string,itemKey:string,itemOptions:Record<string,string|number>[],itemGroups?:ItemGroup[],groupItemKey?:string,idKey:string}){ 
  const {setItemLength,itemLength,setItemsSelected,itemsSelected} = useContext(ItemPickerContext)
    const vidtoLengthOption = [1,4,9,16]
    const [keyword,setKeyword] = useState('')
    useEffect(()=>{
      setItemLength(1)
      setItemsSelected({})
    },[setItemLength,setItemsSelected])
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
        <Box sx={{display:'flex',justifyContent:'center'}}>
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
        </Box>
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
          <TableRow>
            <TableCell>
      <input type="text" value={keyword} placeholder="請輸入關鍵字"
      onChange={(e)=>{setKeyword(e.target.value)}} style={{height:'30px',border:'none',outline:'none',    borderRadius: "5px", 
          boxShadow: "5px 4px 4px rgba(0, 0, 0, 0.5)",width:'100px'}}/>
            </TableCell>
          </TableRow>
          {itemGroups.map((item:ItemGroup)=>{
            if(!(String(item[groupItemKey as keyof typeof item])?.includes(keyword)))
              return <></>
            return<TableRow
            key={`itemRow${item.id}`}
            sx={{
              "&:not(:last-child)": {
                borderBottom: "1px solid #f0f0f0", // 白線分隔
              },
            }}
          >
            <TableCell draggable
            onDragStart={(e) => {
              const groupData:GroupData = {
                name:String(item.name),
                itemLength:Number(item.itemLength),
                roadData:{},
                groupId:Number(item.id)
              }
              String(item[idKey as keyof typeof item]).split(',').map((roadId:string,index:number)=>{
                if(Number(roadId)!=0)
                {
                  groupData['roadData'][index] = itemOptions.filter((option:Record<string,string|number>)=>option.id==roadId)[0]
                }
              })
              e.dataTransfer.setData("group", JSON.stringify(groupData));

            }} sx={{ fontSize: "16px", padding: "15px",cursor: "pointer",color:'white' }}>
              {item[groupItemKey as keyof typeof item]}
              </TableCell>
          </TableRow>
          })}
          
          {itemOptions.map((item:Record<string,string|number>) => {
            let color = 'white'
            if(!(String(item[itemKey as keyof typeof item])?.includes(keyword)))
              return <></>
            Object.keys(itemsSelected).map(key=>{
              if(itemsSelected[key]['id']==item['id'])
                color = '#84C1FF'
            })

            return <TableRow
              key={`itemRow${item.id}`}
              sx={{
                "&:not(:last-child)": {
                  borderBottom: "1px solid #f0f0f0", // 白線分隔
                },
              }}
            >
              <TableCell draggable
              onDragStart={(e) => {
                e.dataTransfer.setData("item", JSON.stringify(item));
              }} sx={{ fontSize: "16px", padding: "15px",cursor: "pointer",color:color }}>
                {item[itemKey as keyof typeof item]}
                </TableCell>
            </TableRow>
})}
        </TableBody>
      </Table>
    </TableContainer>
</Box>
    );
  };