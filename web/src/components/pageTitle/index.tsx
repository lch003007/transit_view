'use client';
import {routes} from '@/routes'
import Box from '@mui/material/Box';
import { usePathname } from 'next/navigation';

export default function PageTitle() {
  const pathname = usePathname();
  const route = routes.find(item=>item.path==pathname.split('/')[1])
  return <Box sx={{
    background:'#36404E',
    color:'white',
    width:'100%',
    height:'4vh',
    fontSize:'20px',
    zIndex:'-1',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    borderBottom:' 2px solid #399DAB'
}}>{route?route?.name:''}</Box>;
}

