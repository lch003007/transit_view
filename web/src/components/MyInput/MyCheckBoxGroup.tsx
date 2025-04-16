'use client';
import { useState } from "react";

interface MyCheckBoxProps<T extends string = string> {
  labels?: string[]; // 顯示的標籤
  state: T; // 當前選中的值
  setState: (value: T) => void; // 更新選中狀態的函數
  values: T[]; // 對應的值
}

export default function MyCheckBoxGroup<T extends string = string>({ labels, setState, values }: MyCheckBoxProps<T>) {
  const [checkBox, setCheckBox] = useState(labels?.[0]);

  return (
    <div style={{ display: "flex", gap: "6px", flexWrap: "wrap",flexDirection:'column',background:'white' }}>
      {labels?.map((label, index) => (
        <label
          key={index}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1px",
            padding: "2px 5px",
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