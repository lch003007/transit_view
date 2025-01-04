"use client";
import Image from "next/image";
import { useContext } from "react";
import { LayoutContext } from "@/contexts/LayoutContext";
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { IconButton } from "@mui/material";
import Box from "@mui/material/Box";
export default function Topbar(){
    const {setSidenavHide,setHoverSidenav} = useContext(LayoutContext)
    return <Box sx={{
        width:'100vw',
        height:'6vh',
        minHeight:'50px',
        position:'relative',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        background:'linear-gradient(to right, #20232B, #315B89)',
        borderBottom:' 1px solid #399DAB'
        }}>
        
    <IconButton 
    onMouseEnter={()=>{setHoverSidenav(true)}}
    onMouseLeave={()=>{setHoverSidenav(false)}}
    onClick={()=>{
        setSidenavHide((prev:boolean)=>{
            return !prev
        })
    }}  sx={{position:'absolute',left:5}}>
        <MenuRoundedIcon sx={{color:'white',fontSize:30}}/>
        </IconButton>
    <Image src="/image/logo.png" width={70} height={70} alt="logo" />
    <Box sx={{fontSize:25,color:'white'}}>蘇花路廊智慧交流數據化視覺平台</Box>
  </Box>
}