export interface PanelData {
    id: number;
    VDID: string;
    LinkID: string;
    location: string;
    Bearing: string;
    RoadDirection: string;
    LaneNum: number;
    ActualLaneNum: number;
    roadId: number;
    intervalTime0: number;
    flowGate0: number;
    rateGate0: number;
    intervalTime1: number;
    flowGate1: number;
    rateGate1: number;
    intervalTime2: number;
    flowGate2: number;
    rateGate2: number;
    intervalTime3: number;
    flowGate3: number;
    rateGate3: number;
    lineAlert: boolean;
    alert: boolean;
    speeds: number[];
    volumes: number[];
  }
  
  export type IntervalKeys = `intervalTime${0 | 1 | 2 | 3}`

  export interface VdTraffic {
    id: number;
    roadId: number;
    LaneID: number;
    LaneType: number;
    Speed: number | null; // 可能為 null
    Volume: number | null; // 可能為 null
    Occupancy: number;
    MVolume: number | null; // 可能為 null
    SVolume: number | null; // 可能為 null
    LVolume: number | null; // 可能為 null
    TVolume: number | null; // 可能為 null
    MSpeed: number | null; // 可能為 null
    SSpeed: number | null; // 可能為 null
    LSpeed: number | null; // 可能為 null
    TSpeed: number | null; // 可能為 null
    Status: number;
    DataCollectTime: string; // 這通常是 ISO 8601 格式的時間字串
  }

  export interface Auth {
    id: number;
    username: string;
    password: string;
    auth: string; // 這是一個逗號分隔的權限字串
    createdAt: string; // ISO 8601 日期格式
    updatedAt: string; // ISO 8601 日期格式
  }
  