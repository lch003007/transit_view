import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ChartOptions, // 引入類型
  } from 'chart.js';
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

  export default function MyChart({labels,datasets,ref}:{labels:string[],datasets:Datasets[],ref:any}) {
    console.log(ref)

    const options: ChartOptions<'line'> = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top', // 合法的值
        },
        // title: {
        //   display: true,
        //   text: '速率數據',
        // },
      },
    };
  
    return (
      <>
        <Line style={{width:'100%',height:'100%'}} ref={ref} options={options} data={{labels:labels,datasets:datasets}} />
      </>
    );
  }