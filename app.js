import { drawChart } from './chart.js';

const apiKey = 'AIzaSyCnKO4VX7mzk8BNZv1ItWFVpSMHxUKoU4g';  // APIキー
const spreadsheetId = '1Y9UWQbNmzGvPZxVTs732iUHo9o26KJDbSumj08xObjs';  // スプレッドシートID
const range = 'Sheet1!A1:E';  // 取得範囲を拡大

let dataCache = [];  // 取得済みデータを保持

// Google Sheets APIからデータを取得
function fetchData() {
  fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`)
    .then(response => response.json())
    .then(data => {
      if (data.values) {
        const newData = data.values.slice(dataCache.length); // 取得済みデータとの差分を取る
        if (newData.length > 0) {
          dataCache = data.values; // キャッシュを更新
          appendData(newData); // 新しいデータを追加
          drawChart(dataCache); // グラフを更新
        }
      }
    })
    .catch(error => console.error('Error fetching data:', error));
}

// データをテーブルに追加
function appendData(data) {
  const tableContainer = document.getElementById('table-container');
  let table = tableContainer.querySelector('table');

  if (!table) {
    table = document.createElement('table');
    table.setAttribute('border', '1');

    const headerRow = document.createElement('tr');
    const headers = ['Date', '運転スコア', '心拍数', '皮膚電位', '天気'];
    
    headers.forEach(headerText => {
      const th = document.createElement('th');
      th.textContent = headerText;
      headerRow.appendChild(th);
    });

    table.appendChild(headerRow);
    tableContainer.appendChild(table);
  }

  data.forEach(row => {
    const tableRow = document.createElement('tr');
    row.forEach(cell => {
      const td = document.createElement('td');
      td.textContent = cell;
      tableRow.appendChild(td);
    });
    table.appendChild(tableRow);
  });
}

// Raspberry Pi のプログラムを実行する関数
function runRaspberryPiScript() {
  if (window.confirm("Raspberry Pi でスクリプトを実行しますか？")) {
    fetch('/run_script', { method: 'POST' })
      .then(response => response.text())
      .then(data => alert("スクリプト実行結果: " + data))
      .catch(error => console.error('Error running script:', error));
  }
}

// ボタンのクリックイベントを追加
document.getElementById("run_script_button").addEventListener("click", runRaspberryPiScript);

// スクロールを監視し、最下部に達したらデータ更新
function observeScroll() {
  const sentinel = document.createElement('div');
  sentinel.id = 'scroll-sentinel';
  document.body.appendChild(sentinel);

  const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      fetchData();
    }
  }, { rootMargin: '100px' });

  observer.observe(sentinel);
}

// 初期データ取得 & スクロール監視開始
fetchData();
observeScroll();

// Service Worker登録
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js')
    .then(registration => console.log('Service Worker registered:', registration.scope))
    .catch(error => console.log('Service Worker registration failed:', error));
}
