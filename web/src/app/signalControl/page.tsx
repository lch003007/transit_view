import { Box } from "@mui/material";

export default function SignalControl(){
    return <Box sx={{color:'white',fontSize:30}}>
        請點選連結至號誌控制系統：<br/>
        <a href="http://172.16.35.1:8080/suhua/main" target="_blank" rel="noopener noreferrer">
        http://172.16.35.1:8080/suhua/main
</a>
    </Box>
}