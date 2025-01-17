'use client'
import { useState } from "react";


export default function MySelect({state,setState,options,title}:any){
    const [selectedValue, setSelectedValue] = useState('');
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setState(event.target.value);
  };

  return (
    <div>
      <label htmlFor="native-select">選擇選項：</label>
      <select
        id="native-select"
        value={state}
        onChange={handleChange}
        style={{ padding: '8px', fontSize: '16px' }}
      >
        <option value="" disabled>
          請選擇
        </option>
        {options.map((option:string)=>{
            return <option key={option} value={option} ><input /></option>
        })}
      </select>
      <p>當前選擇：{selectedValue}</p>
    </div>
  );
}