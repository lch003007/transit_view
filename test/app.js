const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');
const ffmpeg = require('fluent-ffmpeg');
const path = require('path');

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
console.log('FFmpeg path:', ffmpegInstaller.path); // 確認設置成功

// 定義錄製函數
function recordStream(url, outputFile, duration = 10) {
  return new Promise((resolve, reject) => {
    ffmpeg(url)
    .outputOptions('-c:v libx264') // 使用 x264 編碼器
    .outputOptions('-preset ultrafast') // 提高編碼速度
    .outputOptions('-r 30') // 強制幀率為 30fps
    .outputOptions('-t ' + duration) // 設置錄製時間
    .outputOptions('-vsync vfr') // 確保時間戳同步
      .on('start', () => {
        console.log(`開始錄製：${url}`);
      })
      .on('error', (err) => {
        console.error(`錄製出錯：${err.message}`);
        reject(err);
      })
      .on('end', () => {
        console.log(`錄製完成：${outputFile}`);
        resolve();
      })
      .save(outputFile);
  });
}

// 批次併發處理函數
async function batchRecordStreams(urls, batchSize, duration = 10,delayMs = 200) {
  const startTime = Date.now();
  for (let i = 0; i < urls.length; i += batchSize) {
    const batch = urls.slice(i, i + batchSize); // 每次抓取一批
    console.log(`開始處理第 ${i + 1} 至 ${i + batch.length} 批串流`);

    // 使用 Promise.all 同時處理一批 URL
    await Promise.all(
      batch.map(async (url, index) => {
        const outputFile = path.resolve(__dirname, `output_${i + index + 1}.mp4`);
        try {
          await recordStream(url, outputFile, duration);
        } catch (error) {
          console.error(`錄製失敗：${url}，錯誤：${error.message}`);
        }
        await delay(delayMs); // 每次錄製後延遲一段時間
      })
    );

    console.log(`第 ${i + 1} 至 ${i + batch.length} 批處理完成`);
  }
  const endTime = Date.now();
  console.log(`所有錄製完成，總耗時：${(endTime - startTime) / 1000} 秒`);
}

// 主函數
async function main(batchSize) {
  const urls = [
    "https://cctv-ss01.thb.gov.tw:443/T191-006K+200",
    "https://cctv-ss01.thb.gov.tw:443/T191-008K+950",
    "https://cctv-ss01.thb.gov.tw:443/T191-016K+000",
    "https://cctv-ss01.thb.gov.tw:443/T191-016K+700",
    "https://cctv-ss01.thb.gov.tw:443/T11C-000K+250",
    "https://cctv-ss01.thb.gov.tw:443/T11C-018K+200",
    "https://cctv-ss01.thb.gov.tw:443/T11A-016K+400",
    "https://cctv-ss01.thb.gov.tw:443/T11A-018K+500",
    "https://cctv-ss01.thb.gov.tw:443/T11-004K+960",
    "https://cctv-ss01.thb.gov.tw:443/T11-005K+970",
    "https://cctv-ss01.thb.gov.tw:443/T11-006K+080",
    "https://cctv-ss01.thb.gov.tw:443/T11-006K+025",
    "https://cctv-ss01.thb.gov.tw:443/T11-008K+800",
    "https://cctv-ss01.thb.gov.tw:443/T11-010K+150",
    "https://cctv-ss01.thb.gov.tw:443/T11-012K+500",
    "https://cctv-ss01.thb.gov.tw:443/T11-018K+505",
    "https://cctv-ss01.thb.gov.tw:443/T11-019K+000",
    "https://cctv-ss01.thb.gov.tw:443/T11-019K+080",
    "https://cctv-ss01.thb.gov.tw:443/T11-019K+080-1",
    "https://cctv-ss01.thb.gov.tw:443/T11-020K+560",
    "https://cctv-ss01.thb.gov.tw:443/T11-020K+560-1",
    "https://cctv-ss01.thb.gov.tw:443/T11-020K+685",
    "https://cctv-ss01.thb.gov.tw:443/T11-020K+685-1",
    "https://cctv-ss01.thb.gov.tw:443/T11-021K+500",
    "https://cctv-ss01.thb.gov.tw:443/T11-021K+500-1",
    "https://cctv-ss01.thb.gov.tw:443/T11-021K+615",
    "https://cctv-ss01.thb.gov.tw:443/T11-021K+615-1",
    "https://cctv-ss01.thb.gov.tw:443/T11-023K+500",
    "https://cctv-ss01.thb.gov.tw:443/T11-033K+880",
    "https://cctv-ss01.thb.gov.tw:443/T11-034K+400",
  ];

  console.log(`開始批次錄製，每次併發 ${batchSize} 個串流...`);
  await batchRecordStreams(urls.splice(0,batchSize), batchSize, 10); // 設置錄製 10 秒
}

main(25).catch((err) => console.error('主流程出錯：', err.message));