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
import { Dayjs } from "dayjs";
import { PanelData,IntervalKeys,VdTraffic } from "@/types";
import React from "react";




function VdChart({endDate,amount = 100,id}:{endDate:Dayjs,amount?:number,id:number}) {
  const [activeTab, setActiveTab] = useState(0);

    const [checkBox,setCheckBox] = useState<IntervalKeys>('intervalTime0')
    const {setGroup,itemsSelected,setItemsSelected,setItemLength} = useContext(ItemPickerContext)
    const {post} = useApi()
    const panelRef = useRef(false)
    const width = 0
    const height = 0
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
                return {...prevData}
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
      if(Object.keys(itemsSelected).includes(String(id)))
      {
          const roadData = itemsSelected[id]
          post("vd/panel", { roadId: roadData.id }).then((data) => {
            setPanelData(() => {
              const prevData = { ...roadData, ...data };
              prevData["speeds"] = [];
              prevData["volumes"] = [];
              return {...prevData};
            });
            panelRef.current = true;
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
                  <IconButton onClick={()=>{
                    setItemsSelected((prevData)=>{
                      delete prevData[id]
                      return prevData
                    })

                    setPanelData(initPanelData)
                        setItemsSelected((prevData)=>{
                            delete prevData[id]
                            return {...prevData}
                        })
                  }}><CloseIcon/></IconButton>
                  </Box>


                </Box>
                <Box sx={{ display: 'flex', width: '100%' }}>
  {/* Tabs 區域，固定大小 / 可滾動 */}
  <Box sx={{ flexShrink: 0, minWidth: 0 }}>
    <Tabs
      value={activeTab}
      onChange={handleTabChange}
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
          borderRadius: "8px 8px 0 0",
          ":hover": {
            backgroundColor: "#f0f0f0",
          },
        },
        ".MuiTab-root.Mui-selected": {
          color: "primary.main",
          backgroundColor: "#f5f5f5",
        },
        ".MuiTabs-indicator": {
          display: "none",
        },
      }}
    >
      <Tab label="平均速率" />
      <Tab label="總車流量" />
    </Tabs>
  </Box>

  {/* location 區域，吃剩下寬度，過長變 ... */}
  <Box
    sx={{
      flexGrow: 1,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      ml: 2,
      alignSelf: 'center', // 垂直置中
    }}
  >
    {panelData.location}
  </Box>
</Box>
                
              </Paper>
              
              <Box sx={{ background: "white",height:'80%',display:'flex',justifyContent:'space-around' }}>
                
      
                {activeTab === 0 && (
                  <MyChart
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

                  <MyCheckBoxGroup<IntervalKeys>
                    state={checkBox}
                    setState={setCheckBox}
                    labels={Array.from({ length: 4 }, (_, index) => {
                      const intervalKey = `intervalTime${index}` as IntervalKeys
                      return `${panelData[intervalKey]}min`;
                    })}
                    values={Array.from({ length: 4 }, (_, index) => {
                      const intervalKey = `intervalTime${index}` as IntervalKeys
                      return intervalKey;
                    })}
                  />
              </Box>
              
            </Box>
          )}
        </Box>
      );
}

export default VdChart;
