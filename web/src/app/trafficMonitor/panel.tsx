'use client'
import { Box, IconButton } from "@mui/material";
import PropTypes from "prop-types";
import { styled } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useContext, useEffect, useRef, useState } from "react";
import { ItemPickerContext } from "@/contexts/ItemPickerContext";
import useApi from "@/hooks/useApi";
import EditIcon from '@mui/icons-material/Edit';



function Panel() {
    const {itemsSelected,setItemsSelected,itemLength} = useContext(ItemPickerContext)
    const {post} = useApi()
    // const width = parentWidth / 5;
    // const height = parentHeight / 7;
    const panelRef = useRef(false)
    const [width,setWidth] = useState(0)
    const [height,setHeight] = useState(0)
    const [panelData,setPanelData] = useState<Record<string,string>>({})
    const boxRef = useRef<HTMLDivElement>(null)
    const getFontSize = (type:string='label')=>{
        if(type=='label')
            return height/2>width/4?width/4:height/2
        else
            return height>width/3?width/3:height
    }
    const getVdTraffic = ()=>{
        const intervalTime = Math.max(...Array.from({ length: 4 }, (_, index) =>{
            return Number(panelData[`intervalTime${index}`])
        }))*Number(panelData['ActualLaneNum'])
        post('vd/traffic',{
            where: {
              roadId: panelData.roadId
            },
            take: intervalTime,
            orderBy: {
              DataCollectTime: 'desc'
            }
          }).then((data)=>{
            setPanelData((prevData)=>{
                Array.from({ length: 4 }, (_, index) =>{
                    prevData[`flowValue${index}`] = data.slice(0,Number(prevData[`intervalTime${index}`])*Number(prevData['ActualLaneNum'])).reduce((acc:number, cur:any) => acc + cur.Volume, 0)
                    prevData[`rateValue${index}`] = String(Math.round(data.slice(0,Number(prevData[`intervalTime${index}`])*Number(prevData['ActualLaneNum'])).reduce((acc:number, cur:any) => acc + cur.Volume, 0)/Number(prevData[`intervalTime${index}`])*Number(prevData['ActualLaneNum'])))
                })
                return prevData
            })

        })
    }

    setInterval(()=>{
        if(Object.keys(panelData).length>0){
            getVdTraffic()
        }
    },1000*60)

    if(panelRef.current){
        panelRef.current = false
        getVdTraffic()
    }

    useEffect(()=>{
        if(boxRef.current?.parentElement)
        {
            setWidth(boxRef.current.offsetWidth/5)
            setHeight(boxRef.current.offsetHeight/7)

        }
    },[itemLength])

    const MyTable = styled('table')({
        width: '100%',
        borderCollapse: 'collapse',
        borderRadius: '15px',
        overflow: 'hidden',
        boxShadow: '3px 4px 10px rgba(0, 0, 0, 0.5)',
    
    });
    
    const MyTr = styled('tr')(({ theme }) => ({
        // height: height,
        '&:nth-of-type(even)': {
            backgroundColor: '#C4E1E1',
        },
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.common.white,
        },
        '&:hover': {
            backgroundColor: '#CDCD9A',
            color: theme.palette.primary.contrastText,
        },
    }));
    
    const MyTd = styled('td')(({ theme }) => ({
        textAlign: 'center',
        // padding: '10px',
        fontSize: getFontSize('content'),
        border: `1px solid ${theme.palette.divider}`,
        color: theme.palette.text.primary,
        '&:first-of-type': {
            fontWeight: 'bold',
        },
        // width:width,
        padding:0
    }));
    
    const MyTh = styled('th')(({ theme }) => ({
        textAlign: 'center',
        // padding: '12px',
        fontSize: getFontSize(),
        fontWeight: 'bold',
        border: `1px solid ${theme.palette.divider}`,
        background: '#3D7878',
        color: theme.palette.primary.contrastText,
        // width:width,
        padding:0
    }));
    
    
    return (
        <Box height={"100%"} width={'100%'} ref={boxRef}>
            {Object.keys(panelData).length==0?
            <Box 
            onDragOver={(e)=>{e.preventDefault()}}
            onDrop={(e)=>{
                e.preventDefault()
                const roadData = JSON.parse(e.dataTransfer.getData('item'))
                console.log(roadData)
                post('vd/panel',{roadId:roadData.id}).then(data=>{
                    setPanelData(()=>{
                        const prevData = {...roadData,...data}
                        Array.from({ length: 4 }, (_, index) => {
                            prevData[`rateValue${index}`] = null
                            prevData[`flowValue${index}`] = null
                        })
                        return prevData
                    }
                        )
                panelRef.current = true
                    })
            }}
            sx={{width:'100%',height:'100%',border:'solid 1px white',display:'flex',justifyContent:'center',alignItems:'center',borderRadius: "5px",
                boxShadow: "1px 4px 6px rgba(0, 0, 0, 0.5)"}}>
                    <AddCircleOutlineIcon sx={{color:'white',height:width*5>height*7?height*7:width*5,width:width*5>height*7?height*7:width*5}} />
                </Box>
                :
                <>
        
            <Box sx={{display:'flex',justifyContent:'space-between'}}>
                <Box sx={{fontSize:height,color:'white'}}>{panelData.location??''}</Box>
                <Box>
                    {/* <CircleIcon sx={{fontSize:height}} />
                    <img style={{height:height}} src="image/line_icon_gray.png"/>
                    <img style={{height:height}} src="image/alert_icon.png"/> */}
                    <IconButton onClick={()=>{setPanelData({})}}>
                    <CloseIcon  sx={{fontSize:height,color:'white'}}/>
                    </IconButton>
                </Box>
            </Box>
            <MyTable>
                <thead>
                    <MyTr>
                        <MyTh rowSpan={2}>統計區間<br />(分鐘)</MyTh>
                        <MyTh colSpan={2}>流量(輛)</MyTh>
                        <MyTh colSpan={2}>平均速率(km/hr)</MyTh>
                    </MyTr>
                    <MyTr>
                        <MyTh>門檻值</MyTh>
                        <MyTh>實際值</MyTh>
                        <MyTh>門檻值</MyTh>
                        <MyTh>實際值</MyTh>
                    </MyTr>
                </thead>
                <tbody>
                    {Array.from({ length: 4 }, (_, index) => (
                        <MyTr key={index}>
                            {[
                                "intervalTime",
                                "flowGate",
                                "flowValue",
                                "rateGate",
                                "rateValue",
                            ].map((key) => {
                                const fieldKey = `${key}${index}`;
                                const fieldData = panelData[fieldKey]??'N/A';
                                return (
                                    <MyTd key={fieldKey}>
                                        {fieldData}
                                    </MyTd>
                                );
                            })}
                        </MyTr>
                    ))}
                </tbody>
            </MyTable>
            </>
                }
        </Box>
    );
}

export default Panel;
