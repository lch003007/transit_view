'use client'
import { InputHTMLAttributes } from "react"

interface MyTextProps extends InputHTMLAttributes<HTMLInputElement>{
    notNull?:boolean
}

export default function MyText({style,notNull,value,...props}:MyTextProps){
    return <input type="text" style={{
        borderRadius: "5px", // 圓角
        boxShadow: "1px 4px 6px rgba(0, 0, 0, 0.5)", // 陰影
        padding: "5px 10px", // 內距
        backgroundColor: "#f9f9f9", // 背景顏色（可選）
        color: "#333", // 字體顏色（可選）
        display: "inline-block", // 保證是塊狀元素
        border: `0.5px solid ${!value&&notNull?'red':'#D0D0D0'}`, // 超細邊框
        outline:'none',
        ...style, // 支持傳入其他樣式
    }} value={value} {...props} />
}
