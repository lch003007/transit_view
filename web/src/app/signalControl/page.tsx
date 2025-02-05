import { MyButton } from "@/components/MyInput";
import { Box } from "@mui/material";
import Link from "next/link";

export default function SignalControl(){
    return <Box sx={{color:'white',fontSize:30}}>
        請點選連結至號誌控制系統：<br/>
        <Link
      href="http://172.16.35.1:8080/suhua/main"
      target="_blank"
      rel="noopener noreferrer"
    //   underline="none" // 防止加上默認的超連結下劃線
    >
        <MyButton>
            前往
        </MyButton>
    </Link>
    </Box>
}