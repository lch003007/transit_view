'use client'
import { Tabs, Tab, Box, Typography,Paper } from '@mui/material';
import { useState } from 'react';

export default function MyTab({tabDatas,backgroundColor='#ffffff'}:any){
    const [activeTab, setActiveTab] = useState(0);
    const handleTabChange = (event:any, newValue:any) => {
        setActiveTab(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Paper
                sx={{
                    width: '100%',
                    position: 'relative',
                    zIndex: 2,
                    backgroundColor: backgroundColor,
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
                        backgroundColor: backgroundColor,
                        '.MuiTab-root': {
                            fontWeight: 'bold',
                            textTransform: 'none',
                            padding: '12px 16px',
                            minWidth: '100px',
                            backgroundColor: backgroundColor,
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
                    {tabDatas.map((tabData:any, index:any) => (
                        <Tab key={index} label={tabData.label} id={`tab-${tabData.key}`}  />
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
                {tabDatas.map((tabData:any, index:any) => <>
                
                {activeTab === index &&(
                    <div
                        key={`tab-content-${index}`}
                        role="tabpanel"
                        hidden={activeTab !== index}
                        id={`tabpanel-${tabData.key}`}
                    >
                        {tabData.component}

                    </div>
                )}</>
            
            )}
            </Box>
        </Box>
    );
}
