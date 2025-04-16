import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ChartOptions,
  } from 'chart.js';
import { Dispatch, SetStateAction} from 'react';
  import { Line } from 'react-chartjs-2';

  
  // Chart.js 註冊
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  
  interface Datasets{
    backgroundColor:string,
    borderColor:string,
    data:number[],
    fill:boolean,
    label:string,
    tension:number
  }

  export default function MyChart({
    labels,
    datasets,
  }:{
    labels:string[],
    datasets:Datasets[],
    updateChart?:boolean,
    setUpdateChart?:Dispatch<SetStateAction<boolean>>
  }) {
    const options: ChartOptions<'line'> = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top', // 合法的值
        },
      },
    };
  
    return (
      <>
        <Line style={{width:'100%',height:'100%'}}  options={options} data={{labels:labels,datasets:datasets}} />
      </>
    );
  }