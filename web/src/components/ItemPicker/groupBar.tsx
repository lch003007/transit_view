import {Save,SaveAs,Delete} from '@mui/icons-material';
import { IconButton,Tooltip } from '@mui/material';
import MyBox from '../MyBox';

export default function GroupBar({save=()=>{},saveAs=()=>{},remove=()=>{}}:any){
    const functionButtons = [
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
        {functionButtons.map((functionButton:any)=>{
            return <Tooltip title={functionButton.tooltip}><IconButton onClick={functionButton.onClick}>{functionButton.component}</IconButton></Tooltip>
        })}
        {/* <IconButton><Save/></IconButton>
        <IconButton><SaveAs/></IconButton>
        <IconButton><Delete/></IconButton> */}
    </MyBox>
}
