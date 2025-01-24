'use client'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

export default function Options({itemKey,itemOptions,itemsSelected}:any){
    return <TableContainer component={Paper}>
    <Table sx={{borderCollapse: "separate", borderSpacing: 0,background:'#3A566C'}}>
      <TableBody>
        {itemOptions.map((item:any,index:number) => (
          <TableRow
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
            }} sx={{ fontSize: "16px", padding: "15px",cursor: "pointer",color:itemsSelected[index]?'#84C1FF':'white' }}>
              {item[itemKey as keyof typeof item]}
              </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
}