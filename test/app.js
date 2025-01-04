const axios = require('axios'); // 確保已安裝 axios 套件

// 定義 API 的 URL 和參數
const apiUrl = 'https://link.motc.gov.tw/v2/Road/Link/Historical/24.02.1/LinkID/3000200100155F'; // 替換成你的 API URL


// 使用 Axios 發送 GET 請求
axios.get(apiUrl)
  .then(response => {
    // 處理成功的響應
    console.log('Response Data:', response.data);
  })
  .catch(error => {
    // 處理錯誤
    if (error.response) {
      console.error('Error Response:', error.response.data);
    } else if (error.request) {
      console.error('No Response Received:', error.request);
    } else {
      console.error('Error Message:', error.message);
    }
  });