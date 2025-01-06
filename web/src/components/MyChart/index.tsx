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
  
  export default function MyChart({labels,datasets}:any) {
    const data = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        {
          label: 'Sales for 2023 (M)',
          data: [3, 2, 2, 1, 5, 4],
          fill: false,
          backgroundColor: 'rgb(75, 192, 192)',
          borderColor: 'rgba(75, 192, 192, 0.2)',
          tension: 0.5, // 增加曲線效果
        },
      ],
    };
  
    // 明確類型定義
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
        <Line options={options} data={{labels:labels,datasets:datasets}} />
      </>
    );
  }