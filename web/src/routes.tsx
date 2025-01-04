import {
    ScreenshotMonitor,
    Videocam,
    TimeToLeave,
    ReportProblem,
    Traffic,
    BarChart,
    Timeline,
    QueryBuilder,
    Build,
  } from "@mui/icons-material";

export const routes = [
    {
      path: 'liveVideo',
      name: '即時影像', // 即時影像：代表實時的視頻監控功能
      icon: Videocam,
    },
    {
      path: 'trafficMonitor',
      name: '流量監控', // 流量監控：用於交通流量的即時監測
      icon: ScreenshotMonitor,
    },
    {
      path: 'travelTime',
      name: '旅行時間', // 旅行時間：顯示某段路線的旅行時間
      icon: TimeToLeave,
    },
    {
      path: 'roadEvents',
      name: '路況事件', // 路況事件：突發交通事件或路況信息
      icon: ReportProblem,
    },
    {
      path: 'signalControl',
      name: '號誌控制', // 號誌控制：用於交通信號燈的控制和監測
      icon: Traffic,
    },
    {
      path: 'dataAnalysis',
      name: '數據分析', // 數據分析：進行交通數據的統計和分析
      icon: BarChart,
    },
    {
      path: 'trafficForecast',
      name: '流量預測', // 流量預測：基於歷史數據的交通流量預測
      icon: Timeline,
    },
    {
      path: 'travelTimeForecast',
      name: '旅行時間預測', // 旅行時間預測：基於算法預測某路線的旅行時間
      icon: QueryBuilder,
    },
    {
      path: 'equipmentManagement',
      name: '設備及建構管理', // 設備及建構管理：對相關設備進行監測和管理
      icon: Build,
    },
  ];