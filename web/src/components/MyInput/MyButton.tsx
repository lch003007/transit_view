import { ButtonHTMLAttributes } from "react"

export default function MyButton({children,style,...props}:ButtonHTMLAttributes<HTMLButtonElement>){
    return <button 
    style={{
        boxShadow: "3px 4px 6px rgba(0, 0, 0, 0.5)", // 陰影
        borderRadius: "5px", // 圓角
        padding: "10px 20px", // 內距可選
        border: "none", // 去除邊框（可選）
        backgroundColor: "white", // 背景顏色（可選）
        color: "black", // 文字顏色（可選）
        cursor: "pointer", // 鼠標樣式
        ...style
    }}
    {...props}
    >{children}</button>
}
