'use client'
import { IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useContext, useEffect, useRef, useState } from "react";
import { ItemPickerContext } from "@/contexts/ItemPickerContext";
import useApi from "@/hooks/useApi";
import { MyCheckBoxGroup } from "@/components/MyInput";
import MyChart from "@/components/MyChart";
import { light } from "@mui/material/styles/createPalette";
import { Tabs, Tab, Box, Typography,Paper } from '@mui/material';
import {Chart as ChartJS} from 'chart.js'




function VdChart({endDate,amount = 100,id}:any) {
    const [activeTab, setActiveTab] = useState(0);
    const [checkBox,setCheckBox] = useState('intervalTime0')
    const {setGroup,itemsSelected,setItemsSelected,itemLength,setItemLength} = useContext(ItemPickerContext)
    const {post} = useApi()
    const panelRef = useRef(false)
    const [width,setWidth] = useState(0)
    const [height,setHeight] = useState(0)
    const [panelData,setPanelData] = useState<Record<string,any>>({})
    const boxRef = useRef<HTMLDivElement>(null)
    const chartRefRate = useRef<ChartJS | null>(null)
    const chartRefVolume = useRef<ChartJS | null>(null)

    const handleTabChange = (event:any, newValue:any) => {
        setActiveTab(newValue);
    };
    
    const getVdTraffic = ()=>{
        const intervalTime = Math.max(...Array.from({ length: 4 }, (_, index) =>{
            return Number(panelData[`intervalTime${index}`])
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
                prevData['speeds'] = data.map((item:any)=>item.Speed)
                prevData['volumes'] = data.map((item:any)=>item.Volume)
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
    },[itemLength])

    useEffect(()=>{
      chartRefRate.current?.resize();
      chartRefRate.current?.update();
      chartRefVolume.current?.resize();
      chartRefVolume.current?.update();
    },[width,height])

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
          });
      }
  },[Object.keys(itemsSelected).includes(String(id))])
    
    return (
        <Box height={"100%"} width={"100%"} ref={boxRef}>
          {Object.keys(panelData).length === 0 ? (
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
                    setPanelData({})
                        setItemsSelected((prevData)=>{
                            delete prevData[id]
                            return prevData
                        })
                  }}><CloseIcon/></IconButton>
                  <MyCheckBoxGroup
                    state={checkBox}
                    setState={setCheckBox}
                    labels={Array.from({ length: 4 }, (_, index) => {
                      return `${panelData[`intervalTime${index}`]}分鐘`;
                    })}
                    values={Array.from({ length: 4 }, (_, index) => {
                      return `intervalTime${index}`;
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
