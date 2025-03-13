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
          label: '心拍数',
          data: heartRates,
          borderColor: 'rgba(153, 102, 255, 1)',  // Line color for heart rate
          fill: false,
          yAxisID: 'y-axis-heart'  // 左側Y軸
        },
        {
          label: '運転スコア',
          data: drivingScores,
          borderColor: 'rgba(75, 192, 192, 1)',  // Line color for driving scores
          fill: false,
          yAxisID: 'y-axis-driving'  // 右側Y軸
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
            text: '心拍数'
          },
          id: 'y-axis-heart',
          position: 'left',  // 心拍数を左側に
          beginAtZero: true,
          min: 0,
          max: 100
        },
        y1: {
          title: {
            display: true,
            text: '運転スコア'
          },
          id: 'y-axis-driving',
          position: 'right',  // 運転スコアを右側に
          beginAtZero: true,
          min: 0,
          max: 100,
          grid: {
            drawOnChartArea: false  // グリッド線が重ならないように
          }
        }
      }
    }
  });
}

// Export the function so it can be used in app.js
export { drawChart };
