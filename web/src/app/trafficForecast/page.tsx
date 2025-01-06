'use client'
import { ManualTable } from "@/components/Table/manualTable"
import { DbTable } from "@/components/Table/dbTable";
import { useEffect, useState } from "react";
import useApi from "@/hooks/useApi";

function formatDuration(seconds: number): string {
  if (seconds <= 0) return "0秒";

  const days = Math.floor(seconds / (24 * 60 * 60));
  seconds %= 24 * 60 * 60;

  const hours = Math.floor(seconds / (60 * 60));
  seconds %= 60 * 60;

  const minutes = Math.floor(seconds / 60);
  seconds %= 60;

  const parts: string[] = [];

  if (days > 0) parts.push(`${days}天`);
  if (hours > 0) parts.push(`${hours}小時`);
  if (minutes > 0) parts.push(`${minutes}分鐘`);
  if (seconds > 0) parts.push(`${seconds}秒`);

  return parts.join(" ");
}

export default function TrafficForecast(){
    // return <><ManualTable data={sampleData} title={{id:'編號',name:'名稱'}} filterValues={{}} /></>
    return <><ManualTable data={[
      {
        name:'蘇花路廊',
        volumeNow:'NaN',
        volume1:'NaN',
        volume3:'NaN',
        volume6:'NaN',
      }
    ]}  title={
      {
        name:'路段',
        volumeNow:'現在車流量',
        volume1:'1小時後',
        volume3:'3小時後',
        volume6:'6小時後',
    }} /></>
  }