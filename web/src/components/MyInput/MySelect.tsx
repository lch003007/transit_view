'use client'
import React from 'react';

interface MySelectProps {
  labels: string[]; // 顯示的選項文字
  ids: string[]; // 對應的值
  state: string; // 當前選中的值
  setState: (value: string) => void; // 更新選中值的函數
}

const MySelect: React.FC<MySelectProps> = ({ labels, ids, state, setState }) => {
  // 處理選擇變更
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setState(event.target.value); // 更新父層的狀態
  };
  console.log(ids)
  return (
    <div style={{ display: 'inline-block', position: 'relative' }}>
      <select
        value={state} // 綁定當前選中的值
        onChange={handleChange} // 監聽值的變化
        style={{
          padding: '8px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          fontSize: '16px',
          background: '#fff',
          appearance: 'none', // 隱藏默認的瀏覽器樣式
          width: '150px',
          cursor: 'pointer',
        }}
      >
        {labels.map((label, index) => (
          <option key={ids[index]} value={ids[index]}>
            {label}
          </option>
        ))}
      </select>
      {/* 模擬下拉箭頭 */}
      <span
        style={{
          position: 'absolute',
          right: '10px',
          top: '50%',
          transform: 'translateY(-50%)',
          pointerEvents: 'none',
        }}
      >
        ▼
      </span>
    </div>
  );
};

export default MySelect;