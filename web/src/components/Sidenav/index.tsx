"use client"
import { Box } from "@mui/material"
import { useContext } from "react"
import { LayoutContext } from "@/contexts/LayoutContext"
import Link from "next/link"
import {routes} from '@/routes'

export default function Sidenav(){
    const {isSidenavHide,setHoverSidenav} = useContext(LayoutContext)
    const baseWidth = 10//vw
    const miniBaseWidth = 192//px
    const outerCollapseWidth = 0.5
    const outerExpendWidth = 1
    const innerCollapseWidth = 0.3
    const innerExpendWidth = 1


    return <Box sx={{
        height:'94vh',
        backgroundColor:'#212A39',
        width:isSidenavHide?`${outerCollapseWidth*baseWidth}vw`:`${outerExpendWidth*baseWidth}vw`,
        boxShadow: '5px 10px 15px rgba(0, 0, 0, 0.5)',
        marginLeft:'20px',
        paddingTop:'50px',
        minWidth:isSidenavHide?`${outerCollapseWidth*miniBaseWidth}px`:`${outerExpendWidth*miniBaseWidth}px`,
        transition:'width 0.5s ease'}}>
        <Box component={'ul'}
        sx={{
            listStyle:'none',
            padding:0,
            margin:0,
            '& > li':{
                marginBottom:'15px'
            }
        }}
        >

        {routes.map(route=>{
            return <li key={route.path} style={{position:'relative'}}>
                                <Box sx={{
                    height:`${innerCollapseWidth*baseWidth}vw`,
                    width:`${innerCollapseWidth*baseWidth}vw`,
                    background:'#29b299',
                    display:'flex',
                    alignItems:'center',
                    justifyContent:'center',
                    borderRadius:'12px',
                    position:'absolute',
                    minWidth:`${innerCollapseWidth*miniBaseWidth}px`,
                    pointerEvents:'none'
                    }}>
                        {/* {isSidenavHide?<></>:
                        <Box
                        sx={{
                          position: "absolute",
                        //   top: '10%',
                        //   bottom: '10%',
                          
                          right: 3,
                          width: "1px",
                          minHeight:`${miniBaseWidth*0.2}px`,
                          backgroundColor: "white",
                        }}
                      />
                        } */}
                        
                    <route.icon sx={{color:'white',fontSize:`${miniBaseWidth*0.2}px`,}}/>

                </Box>
                <Link 
                onMouseEnter={()=>{setHoverSidenav(true)}}
                onMouseLeave={()=>{setHoverSidenav(false)}}
                href={route.path} 
                style={{
                    border:'none',
                    background:'none',
                    cursor:'pointer'
                    }}>
                <Box sx={{
                    height:`${innerCollapseWidth*baseWidth}vw`,
                    width:isSidenavHide?`${innerCollapseWidth*baseWidth}vw`:`${innerExpendWidth*baseWidth}vw`,
                    background:'#29b299',
                    display:'flex',
                    alignItems:'center',
                    justifyContent:'start',
                    borderRadius:'12px',
                    transition:'width 0.7s ease',
                    overflow:'hidden',
                    minWidth:isSidenavHide?`${innerCollapseWidth*miniBaseWidth}px`:`${innerExpendWidth*miniBaseWidth}px`,
                    minHeight:`${innerCollapseWidth*miniBaseWidth}px`,
                    }}>
                    
                    <Box sx={{
                        left:`${innerCollapseWidth*miniBaseWidth}px`,
                        position:'relative',
                        fontSize:'16px',
                        color:'white',
                        whiteSpace:'nowrap'}}>
                            {route.name}
                        {/* {!isSidenavHide?`${route.name}`:<></>} */}
                    </Box>
                    
                    
                </Box>
                </Link>

            </li>
        })}
        </Box>
        </Box>
}