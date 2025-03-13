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
          yAxisID: 'y-axis-driving'  // Left Y-axis
        },
        {
          label: '心拍数',
          data: heartRates,
          borderColor: 'rgba(153, 102, 255, 1)',  // Line color for heart rate
          fill: false,
          yAxisID: 'y-axis-heart'  // Right Y-axis
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
            text: '運転スコア'
          },
          id: 'y-axis-driving',
          position: 'left',
          beginAtZero: true,
          min: 0,
          max: 100
        },
        y1: {
          title: {
            display: true,
            text: '心拍数'
          },
          id: 'y-axis-heart',
          position: 'right',
          beginAtZero: true,
          min: 0,
          max: 100,
          grid: {
            drawOnChartArea: false  // 右軸のグリッドラインを消す
          }
        }
      }
    }
  });
}

// Export the function so it can be used in app.js
export { drawChart };
