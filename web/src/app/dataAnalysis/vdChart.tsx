'use client'
import { IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useContext, useEffect, useRef, useState } from "react";
import { ItemPickerContext } from "@/contexts/ItemPickerContext";
import useApi from "@/hooks/useApi";
import { MyCheckBoxGroup } from "@/components/MyInput";
import MyChart from "@/components/MyChart";
import { Tabs, Tab, Box, Paper } from '@mui/material';
import {Chart as ChartJS} from 'chart.js'
import { Dayjs } from "dayjs";
import { PanelData,IntervalKeys,VdTraffic } from "@/types";
import React from "react";
import { LayoutContext } from "@/contexts/LayoutContext";




function VdChart({endDate,amount = 100,id}:{endDate:Dayjs,amount?:number,id:number}) {
  const{setFlash} = useContext(LayoutContext)  
  const [activeTab, setActiveTab] = useState(0);
  const [updateChart,setUpdateChart] = useState<Boolean>(false)

    const [checkBox,setCheckBox] = useState<IntervalKeys>('intervalTime0')
    const {setGroup,itemsSelected,setItemsSelected,itemLength,setItemLength} = useContext(ItemPickerContext)
    const {post} = useApi()
    const panelRef = useRef(false)
    const [width,setWidth] = useState(0)
    const [height,setHeight] = useState(0)
    const initPanelData = {
      id: 0,
      VDID: "",
      LinkID: "",
      location: "",
      Bearing: "",
      RoadDirection: "",
      LaneNum: 0,
      ActualLaneNum: 0,
      roadId: 0,
      intervalTime0: 0,
      flowGate0: 0,
      rateGate0: 0,
      intervalTime1: 0,
      flowGate1: 0,
      rateGate1: 0,
      intervalTime2: 0,
      flowGate2: 0,
      rateGate2: 0,
      intervalTime3: 0,
      flowGate3: 0,
      rateGate3: 0,
      lineAlert: false,
      alert: false,
      speeds: [],
      volumes: [],
    }
    const [panelData,setPanelData] = useState<PanelData>(initPanelData)
    const boxRef = useRef<HTMLDivElement>(null)
    const chartRefRate = useRef<ChartJS | null>(null)
    const chartRefVolume = useRef<ChartJS | null>(null)
    useEffect(()=>{
      if(updateChart){
        setUpdateChart(false)

        setFlash((prevData)=>{
          return false
        })
        // chartRefRate.current?.resize();
        // chartRefRate.current?.update();
        // chartRefVolume.current?.resize();
        // chartRefVolume.current?.update();
      }
    },[updateChart])

    const handleTabChange = (event:React.SyntheticEvent, newValue:number) => {
        setActiveTab(newValue);
    };
    
    const getVdTraffic = ()=>{
        const intervalTime = Math.max(...Array.from({ length: 4 }, (_, index) =>{
            const intervalKey = `intervalTime${index}` as IntervalKeys
            return Number(panelData[intervalKey])
        }))*Number(panelData['ActualLaneNum'])+(amount*Number(panelData['ActualLaneNum']))
        post('vd/traffic',{
            where: {
              roadId: panelData.roadId,
              DataCollectTime:{
                lte:endDate
              }
            },
            take: intervalTime?intervalTime:0,
            orderBy: {
              DataCollectTime: 'desc'
            }
          }).then((data)=>{
            setPanelData((prevData)=>{
                prevData['speeds'] = data.map((item:VdTraffic)=>item.Speed)
                prevData['volumes'] = data.map((item:VdTraffic)=>item.Volume)
                return prevData
            })

        })
    }

    if(panelRef.current){
        panelRef.current = false
        getVdTraffic()
    }

    useEffect(()=>{
        if(Object.keys(panelData).length!=0)
            getVdTraffic()
    },[endDate])

    useEffect(()=>{
      if(boxRef.current?.parentElement)
        {
            setWidth(boxRef.current.offsetWidth/5)
            setHeight(boxRef.current.offsetHeight/7)
        }
        setUpdateChart(true)
        setFlash(true)
    },[itemLength])

    // useEffect(()=>{
    //   // console.log(123)

    // },[width,height])

    useEffect(()=>{
      if(Object.keys(itemsSelected).includes(String(id)))
      {
          const roadData = itemsSelected[id]
          post("vd/panel", { roadId: roadData.id }).then((data) => {
            setPanelData(() => {
              const prevData = { ...roadData, ...data };
              prevData["speeds"] = [];
              prevData["volumes"] = [];
              return prevData;
            });
            panelRef.current = true;
            setUpdateChart(true)
          });
      }
  },[Object.keys(itemsSelected).includes(String(id))])
    
    return (
        <Box height={"100%"} width={"100%"} ref={boxRef}>
          {panelData['id'] === 0 ? (
            <Box
              onDragOver={(e) => {
                e.preventDefault();
              }}
              onDrop={(e) => {
                e.preventDefault();
                const group = e.dataTransfer.getData('group')
                if(group){
                  const groupData = JSON.parse(group)
                  setItemLength(groupData.itemLength)
                  setItemsSelected(groupData.roadData)
                  setGroup(groupData.groupId)
              }else{
                const roadData = JSON.parse(e.dataTransfer.getData("item"));
                                    setItemsSelected((prevData)=>{
                        return {...prevData,[id]:roadData}
                    })
              }
                

              }}
              sx={{
                width: "100%",
                height: "100%",
                border: "solid 1px white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "5px",
                boxShadow: "1px 4px 6px rgba(0, 0, 0, 0.5)",
              }}
            >
              <AddCircleOutlineIcon
                sx={{
                  color: "white",
                  height: width * 5 > height * 7 ? height * 7 : width * 5,
                  width: width * 5 > height * 7 ? height * 7 : width * 5,
                }}
              />
            </Box>
          ) : (
            <Box sx={{ width: "100%",height:'100%' }}>
                
              <Paper
                sx={{
                  width: "100%",
                  position: "relative",
                  zIndex: 2,
                  backgroundColor: "#ffffff",
                  borderBottom: "1px solid #ddd",
                }}
              >
                                <Box sx={{ display: "flex", justifyContent: "end",position:'relative' }}>
                  <Box sx={{position:'absolute',zIndex:'100'}}>
                  {panelData.location}
                  <IconButton onClick={()=>{
                    setItemsSelected((prevData)=>{
                      delete prevData[id]
                      return prevData
                    })
                    setPanelData(initPanelData)
                        setItemsSelected((prevData)=>{
                            delete prevData[id]
                            return prevData
                        })
                  }}><CloseIcon/></IconButton>
                  <MyCheckBoxGroup<IntervalKeys>
                    state={checkBox}
                    setState={setCheckBox}
                    labels={Array.from({ length: 4 }, (_, index) => {
                      const intervalKey = `intervalTime${index}` as IntervalKeys
                      return `${panelData[intervalKey]}分鐘`;
                    })}
                    values={Array.from({ length: 4 }, (_, index) => {
                      const intervalKey = `intervalTime${index}` as IntervalKeys
                      return intervalKey;
                    })}
                  />
                  </Box>
                </Box>
                <Tabs
                  value={activeTab}
                  onChange={handleTabChange}
                  aria-label="tab navigation"
                  variant="scrollable"
                  scrollButtons="auto"
                  indicatorColor="primary"
                  textColor="primary"
                  sx={{
                    backgroundColor: "#ffffff",
                    ".MuiTab-root": {
                      fontWeight: "bold",
                      textTransform: "none",
                      padding: "12px 16px",
                      minWidth: "100px",
                      backgroundColor: "#ffffff",
                      borderRadius: "8px 8px 0 0", // 標籤的圓角設計
                      ":hover": {
                        backgroundColor: "#f0f0f0",
                      },
                    },
                    ".MuiTab-root.Mui-selected": {
                      color: "primary.main",
                      backgroundColor: "#f5f5f5",
                    },
                    ".MuiTabs-indicator": {
                      display: "none", // 隱藏原生指示器，讓背景色代替
                    },
                    borderRadius: "10px",
                  }}
                >
                  <Tab key="rate" label="平均速率" id="rate" />
                  <Tab key="speed" label="總車流量" id="speed" />
                </Tabs>
              </Paper>
      
              <Box sx={{ background: "white",height:'80%' }}>

      
                {activeTab === 0 && (
                  <MyChart
                  ref={chartRefRate}
                    labels={Array.from({ length: amount }, (_, index) =>
                      endDate.subtract(index, "minutes").format("HH:mm")
                    ).reverse()}
                    datasets={[
                      {
                        label: "平均速率",
                        data: Array.from({ length: amount }, (_, index) => {
                          const actualLaneNum = Number(panelData["ActualLaneNum"]);
                          const interval = panelData[checkBox];
                          const speedArray = panelData["speeds"].slice(
                            index * actualLaneNum,
                            (index + interval) * actualLaneNum
                          );
                          return (
                            speedArray.reduce(
                              (acc: number, curr: number) => acc + curr,
                              0
                            ) / speedArray.length
                          );
                        }),
                        fill: false,
                        backgroundColor: "rgb(75, 192, 192)",
                        borderColor: "rgba(75, 192, 192, 0.2)",
                        tension: 0.5, // 增加曲線效果
                      },
                    ]}
                  />
                )}
      
                {activeTab === 1 && (
                  <MyChart
                  ref={chartRefVolume}
                    labels={Array.from({ length: amount }, (_, index) =>
                      endDate.subtract(index, "minutes").format("HH:mm")
                    ).reverse()}
                    datasets={[
                      {
                        label: "車流量",
                        data: Array.from({ length: amount }, (_, index) => {
                          const actualLaneNum = Number(panelData["ActualLaneNum"]);
                          const interval = panelData[checkBox];
                          const volumeArray = panelData["volumes"].slice(
                            index * actualLaneNum,
                            (index + interval) * actualLaneNum
                          );
                          return volumeArray.reduce(
                            (acc: number, curr: number) => acc + curr,
                            0
                          );
                        }),
                        fill: false,
                        backgroundColor: "rgb(75, 192, 192)",
                        borderColor: "rgba(75, 192, 192, 0.2)",
                        tension: 0.5, // 增加曲線效果
                      },
                    ]}
                  />
                )}
              </Box>
            </Box>
          )}
        </Box>
      );
}

export default VdChart;
