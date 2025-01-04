import { DialogContext } from "@/contexts/DialogContext";
import { Dialog,DialogProps,Box, IconButton } from "@mui/material";
import { useContext } from "react";
import CloseIcon from '@mui/icons-material/Close';

interface MyDialogProps extends Omit<DialogProps, "open"> {
    openKey: string; // `openKey` 是必需的，用來從上下文中獲取開關狀態
  }

export default function MyDialog({children,openKey,...props}:MyDialogProps){
    const {getOpen,closeDialog} = useContext(DialogContext)

    return <Dialog {...props} open={getOpen(openKey)}>
        <Box>
            <Box sx={{display:'flex',justifyContent:'end'}}>
                <IconButton
                onClick={()=>{
                    closeDialog(openKey)
                }}
                ><CloseIcon/></IconButton>
            </Box>
        {children}
        </Box>
    </Dialog>
}