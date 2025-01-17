'use client'
import { DbTable } from '@/components/Table/dbTable';
import { Tabs, Tab, Box, Typography,Paper } from '@mui/material';
import { useState } from 'react';
import User from './user';

export default function EquipmentManagement(){
    const [activeTab, setActiveTab] = useState(0);

    const handleTabChange = (event:any, newValue:any) => {
        setActiveTab(newValue);
    };

    const tabDatas = [
        {
            label: '帳號',
            path: 'auth',
            title: {
                id: 'id',
                username: '帳號',
                password: '密碼',
                auth:'權限'
            },
            notNull: ['username', 'password'],
            hide: ['id'],
        },
        {
            label: '旅行時間',
            path: 'travelTime',
            title: {
                id: 'id',
                name: '路段',
                startX: '起點X座標',
                startY: '起點Y座標',
                endX: '終點X座標',
                endY: '終點Y座標',
                middleX: '中繼X座標',
                middleY: '中繼Y座標',
                direction: '方向'
            },
            notNull: ['name', 'startX', 'startY', 'endX', 'endY', 'direction'],
            hide: ['id'],
            number:['startX','startY','endX','endY','middleX','middleY',]
        },
        {
            label: '監控攝影機',
            path: 'cctv',
            title: {
                id: 'id',
                cctvId: '攝影機編號',
                location: '位置',
                roadId: '路段ID',
                roadName: '路段名稱',
                positionLat: '緯度',
                positionLon: '經度',
                videoStreamUrl: '串流URL',
                direction: '方向'
            },
            notNull: ['cctvId'],
            hide: ['id'],
            number:['positionLat','positionLon'],
        },
        {
            label: '設備',
            path: 'vd/device',
            title: {
                id: 'id',
                VDID: '設備編號',
                SubAuthorityCode: '管理單位代碼',
                BiDirectional: '是否雙向',
                VDType: '設備類型',
                LocationType: '位置類型',
                DetectionType: '檢測類型',
                PositionLon: '經度',
                PositionLat: '緯度',
                RoadID: '路段ID',
                RoadName: '路段名稱',
                RoadClass: '道路等級'
            },
            notNull: ['VDID'],
            hide: ['id'],
            number:['VDType','LocationType','DetectionType','PositionLon','PositionLat','RoadClass'],
            boolean:['BiDirectional']
        },
        {
            label: '道路',
            path: 'vd/road',
            title: {
                id: 'id',
                VDID: '設備編號',
                LinkID: '連結ID',
                location: '位置',
                Bearing: '方向角度',
                RoadDirection: '道路方向',
                LaneNum: '車道數',
                ActualLaneNum: '實際車道數'
            },
            notNull: ['VDID', 'LinkID', 'location'],
            hide: ['id'],
            number:['LaneNum','ActualLaneNum']
        },

    ];
    return (
        <Box sx={{ width: '100%' }}>
            <Paper
                sx={{
                    width: '100%',
                    position: 'relative',
                    zIndex: 2,
                    backgroundColor: '#ffffff',
                    borderBottom: '1px solid #ddd',
                }}
            >
                <Tabs
                    value={activeTab}
                    onChange={handleTabChange}
                    aria-label="tab navigation"
                    variant="scrollable"
                    scrollButtons="auto"
                    indicatorColor="primary"
                    textColor="primary"
                    sx={{
                        backgroundColor: '#ffffff',
                        '.MuiTab-root': {
                            fontWeight: 'bold',
                            textTransform: 'none',
                            padding: '12px 16px',
                            minWidth: '100px',
                            backgroundColor: '#ffffff',
                            borderRadius: '8px 8px 0 0', // 標籤的圓角設計
                            ':hover': {
                                backgroundColor: '#f0f0f0',
                            },
                        },
                        '.MuiTab-root.Mui-selected': {
                            color: 'primary.main',
                            backgroundColor: '#f5f5f5',
                        },
                        '.MuiTabs-indicator': {
                            display: 'none', // 隱藏原生指示器，讓背景色代替
                        },
                        borderRadius:'10px'
                    }}
                >
                    {tabDatas.map((tabData, index) => (
                        <Tab key={index} label={tabData.label} id={`tab-${tabData.path}`}  />
                    ))}
                </Tabs>
            </Paper>
            <Box
                sx={{
                    position: 'relative',
                    zIndex: 1,
                    width: '100%',
                    backgroundColor: '#f9f9f9',
                    marginTop: '-8px', // 讓內容區域和標籤部分重疊
                    padding: '16px',
                    borderRadius: '8px',
                }}
            >
                {tabDatas.map((tabData, index) => (
                    <div
                        key={`tab-content-${index}`}
                        role="tabpanel"
                        hidden={activeTab !== index}
                        id={`tabpanel-${tabData.path}`}
                    >
                        {index==0?<User title={tabData.title} hide={tabData.hide}/>:
                        <>                        {activeTab === index && (
                            <DbTable
                                path={tabData.path}
                                title={tabData.title}
                                form={true}
                                notNull={tabData.notNull}
                                hide={tabData.hide}
                                numberData={tabData.number??[]} 
                                booleanData={tabData.boolean??[]}
                            />
                        )}</>
                        }

                    </div>
                ))}
            </Box>
        </Box>
    );
}
