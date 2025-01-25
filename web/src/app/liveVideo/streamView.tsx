'use client'
import api from "@/api"
import { useEffect, useRef, useState,useContext } from "react"
import { Box,IconButton } from "@mui/material"
import { ItemPickerContext } from "@/contexts/ItemPickerContext"
import CancelIcon from '@mui/icons-material/Cancel';
export default function StreamView({id}:{id:number}){
    const {setGroup,itemsSelected,setItemsSelected,itemLength,setItemLength} = useContext(ItemPickerContext)
    const [videoHover,setVideoHover] = useState(false)
    const videoWidth = 310
    const videoHeight = 212
    const [videoScale,setVideoScale] = useState(1)
    const boxRef = useRef<HTMLDivElement>(null)
    const video = {videoStreamUrl:'',location:'',...itemsSelected[id]}
    const [renderTrigger, setRenderTrigger] = useState({0:0,1:0})
    const [count,setCount] = useState(0)
    const [zIndex,setZIndex] = useState({0:0,1:0})
    console.log(renderTrigger)
    useEffect(()=>{
        if(boxRef.current)
            {
                const boxWidth = boxRef.current.offsetWidth
                const boxHeight = boxRef.current.offsetHeight
                setVideoScale(
                    (boxHeight-10)/videoHeight<
                    (boxWidth-10)/videoWidth?
                    (boxHeight-10)/videoHeight:
                    (boxWidth-10)/videoWidth
                )
            }
        // setVideo(fakeLive()[0])
    },[itemLength])
    // console.log(renderTrigger)
    // console.log(count)
    useEffect(()=>{
        const interval = setInterval(()=>{
            // console.log(count)
            setCount((prevCount)=>{
                setRenderTrigger((prevData:any)=>{
                    // console.log({...prevData,[prevCount%2]:prevData[prevCount%2]+1})
                    return {...prevData,[prevCount%2]:prevData[prevCount%2]+1}
                })
                return prevCount+1
            })
        },10000)
        return ()=>clearInterval(interval)
    },[])

    return <Box 
    onMouseEnter={()=>{
        setVideoHover(true)
    }}
    onMouseLeave={()=>{
        setVideoHover(false)
    }}
    onDragOver={(e)=>{e.preventDefault()}}
    onDrop={(e)=>{
        e.preventDefault()
        const group = e.dataTransfer.getData('group')
        if(group){
            const groupData = JSON.parse(group)
            setItemLength(groupData.itemLength)
            setItemsSelected(groupData.roadData)
            setGroup(groupData.groupId)
        }else{
            setItemsSelected((prevData)=>{
                return {...prevData,[id]:JSON.parse(e.dataTransfer.getData('item'))}
            })
        }
        // setVideo(JSON.parse(e.dataTransfer.getData('video')))

    }}
    
    ref={boxRef}
    sx={{
        position:'relative',
        width:'100%',
        height:'100%',
        borderRadius: "10px", 
        boxShadow: "5px 4px 4px rgba(0, 0, 0, 0.5)",
        background: "linear-gradient(to bottom right, #43424E, #343341)",
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        
        }}>
        <Box sx={{
            width: `${videoWidth}px`, // 設定為全寬
            height: `${videoHeight}px`, // 根據螢幕高度調整
            transform: `scale(${videoScale})`, // 放大 1.5 倍
            position:'absolute',
            zIndex:10,
            color:'white',
            display:'flex',
            justifyContent:'space-between'
        }}>
            <Box>{video.location}</Box>
            <Box>
                {videoHover&&itemsSelected[id]?
                              <IconButton onClick={()=>{
                                setItemsSelected((prevData)=>{
                                    delete prevData[id]
                                    return {...prevData}
                                })
                            }}><CancelIcon sx={{color:'white'}} /></IconButton>
                            :<></>  
            }

            
            </Box>
        </Box>
        <iframe key={`t0${renderTrigger[0]}`} src={video.videoStreamUrl} 
                onLoad={()=>{
                    setZIndex((prevData)=>{
                        return {1:0,0:1}
                    })
                }}
        style={{
        zIndex:zIndex[0],
        width: `${videoWidth}px`, // 設定為全寬
        height: `${videoHeight}px`, // 根據螢幕高度調整
        transform: `scale(${videoScale})`, // 放大 1.5 倍
        transformOrigin: "center center", // 以中心點放大
        border: "solid 1px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)",
        pointerEvents:'none',
        position:'absolute'
    }}

     allow="autoplay; fullscreen" ></iframe>

<iframe key={`t1${renderTrigger[1]}`} src={video.videoStreamUrl} 
        onLoad={()=>{
            setZIndex((prevData)=>{
                return {0:1,1:0}
            })
        }}
        style={{
        zIndex:zIndex[1],
        width: `${videoWidth}px`, // 設定為全寬
        height: `${videoHeight}px`, // 根據螢幕高度調整
        transform: `scale(${videoScale})`, // 放大 1.5 倍
        transformOrigin: "center center", // 以中心點放大
        border: "solid 1px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)",
        pointerEvents:'none',
        position:'absolute'
    }}

     allow="autoplay; fullscreen" ></iframe>

     </Box>
}

//308 210