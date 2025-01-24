'use client'
import { DbTable } from '@/components/Table/dbTable';
import User from './user';
import MyTab from '@/components/MyTab';

export default function EquipmentManagement(){
    const tabDatas = [
        {
            label: '帳號',
            key:'auth',
            path: 'auth',
            title: {
                id: 'id',
                username: '帳號',
                password: '密碼',
                auth:'權限'
            },
            notNull: ['username', 'password'],
            hide: ['id'],
            component:<></>
        },
        {
            label: '旅行時間',
            key:'travelTime',
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
            number:['startX','startY','endX','endY','middleX','middleY',],
            component:<></>
        },
        {
            label: '監控攝影機',
            key: 'cctv',
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
            component:<></>
        },
        {
            label: '設備',
            key:'device',
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
            boolean:['BiDirectional'],
            component:<></>
        },
        {
            label: '道路',
            key:'road',
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
            number:['LaneNum','ActualLaneNum'],
            component:<></>
        },
        
    ];
    tabDatas.map((tabData:any,index:any)=>{
        tabDatas[index]['component'] = index==0?
        <User title={tabData.title} hide={tabData.hide}/>:
<DbTable
                                path={tabData.path}
                                title={tabData.title}
                                form={true}
                                notNull={tabData.notNull}
                                hide={tabData.hide}
                                numberData={tabData.number??[]} 
                                booleanData={tabData.boolean??[]}
                            />
    })
    return (
        <MyTab tabDatas={tabDatas}/>
    );
}
