import {Save,SaveAs,Delete} from '@mui/icons-material';
import { IconButton,Tooltip } from '@mui/material';
import MyBox from '../MyBox';
import { ReactNode } from 'react';

interface FunctionButton{
    component:ReactNode,
    tooltip:string,
    onClick:()=>void
}

export default function GroupBar({save=()=>{},saveAs=()=>{},remove=()=>{}}:{save:()=>void,saveAs:()=>void,remove:()=>void}){
    const functionButtons:FunctionButton[] = [
        {
            component:<Save/>,
            tooltip:'儲存群組',
            onClick:save
        },
        {
            component:<SaveAs/>,
            tooltip:'另存群組',
            onClick:saveAs
        },
        {
            component:<Delete/>,
            tooltip:'刪除群組',
            onClick:remove
        },
    ]
    return <MyBox sx={{marginLeft:'10px',display:'flex',flexDirection:'column',background:'white'}}>
        {functionButtons.map((functionButton:FunctionButton,index:number)=>{
            return <Tooltip key={`groupBar${index}`} title={functionButton.tooltip}><IconButton onClick={functionButton.onClick}>{functionButton.component}</IconButton></Tooltip>
        })}
        {/* <IconButton><Save/></IconButton>
        <IconButton><SaveAs/></IconButton>
        <IconButton><Delete/></IconButton> */}
    </MyBox>
}
