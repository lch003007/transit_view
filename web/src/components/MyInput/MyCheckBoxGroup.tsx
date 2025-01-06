'use client';
import { useState } from "react";

interface MyCheckBoxProps {
  labels?: string[]; // 顯示的標籤
  state: string; // 當前選中的值
  setState: (value: string) => void; // 更新選中狀態的函數
  values: string[]; // 對應的值
}

export default function MyCheckBoxGroup({ labels, state, setState, values }: MyCheckBoxProps) {
  const [checkBox, setCheckBox] = useState(labels?.[0]);

  return (
    <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
      {labels?.map((label, index) => (
        <label
          key={index}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            padding: "5px 10px",
            border: checkBox === label ? "2px solid #007BFF" : "1px solid #CCC",
            borderRadius: "5px",
            cursor: "pointer",
            background: checkBox === label ? "#E6F0FF" : "transparent",
            transition: "all 0.2s ease",
          }}
        >
          <input
            type="checkbox"
            style={{ cursor: "pointer" }}
            onChange={() => {
              setState(values[index]);
              setCheckBox(label);
            }}
            checked={checkBox === label}
          />
          {label}
        </label>
      ))}
    </div>
  );
}