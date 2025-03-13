function drawChart(data) {
  const timeLabels = data.map(row => row[0]);  // Date (X-axis)
  const drivingScores = data.map(row => parseFloat(row[1]));  // Driving score (Y-axis)
  const heartRates = data.map(row => parseFloat(row[3]));  // Heart rate (Y-axis)

  const ctx = document.getElementById('chart_div').getContext('2d');
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: timeLabels,
      datasets: [
        {
          label: '運転スコア',
          data: drivingScores,
          borderColor: 'rgba(75, 192, 192, 1)',  // Line color for driving scores
          fill: false,
          yAxisID: 'y-axis-main'  // 統一Y軸
        },
        {
          label: '心拍数',
          data: heartRates,
          borderColor: 'rgba(153, 102, 255, 1)',  // Line color for heart rate
          fill: false,
          yAxisID: 'y-axis-main'  // 統一Y軸
        }
      ]
    },
    options: {
      responsive: true,
      scales: {
        x: {
          title: {
            display: true,
            text: '時間'
          }
        },
        y: {
          title: {
            display: true,
            text: 'スコア・心拍数'
          },
          id: 'y-axis-main',
          position: 'left',  // 右側の軸を削除
          beginAtZero: true,
          min: 0,
          max: 100
        }
      }
    }
  });
}

// Export the function so it can be used in app.js
export { drawChart };
