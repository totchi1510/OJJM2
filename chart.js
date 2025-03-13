function drawChart(data) {
  const timeLabels = data.map(row => row[0]);  // Date (X-axis)
  const drivingScores = data.map(row => parseFloat(row[1])).filter(val => !isNaN(val));  // Driving score (Y-axis)
  const heartRates = data.map(row => parseFloat(row[3])).filter(val => !isNaN(val));  // Heart rate (Y-axis)

  const ctx = document.getElementById('chart_div').getContext('2d');
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: timeLabels,
      datasets: [
        {
          label: '運転スコア',
          data: drivingScores,
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          fill: false,
          tension: 0.3,
          pointStyle: 'circle',
          borderWidth: 2,
          yAxisID: 'y-axis-driving'
        },
        {
          label: '心拍数',
          data: heartRates,
          borderColor: 'rgba(153, 102, 255, 1)',
          backgroundColor: 'rgba(153, 102, 255, 0.2)',
          fill: false,
          tension: 0.3,
          pointStyle: 'rect',
          borderWidth: 2,
          yAxisID: 'y-axis-heart'
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          title: {
            display: true,
            text: '時間'
          },
          ticks: {
            autoSkip: true,
            maxTicksLimit: 10
          }
        },
        'y-axis-driving': {
          type: 'linear',
          position: 'left',
          title: {
            display: true,
            text: '運転スコア'
          },
          beginAtZero: true
        },
        'y-axis-heart': {
          type: 'linear',
          position: 'right',
          title: {
            display: true,
            text: '心拍数'
          },
          beginAtZero: true,
          grid: {
            drawOnChartArea: false
          }
        }
      },
      plugins: {
        legend: {
          position: 'top'
        },
        tooltip: {
          mode: 'index',
          intersect: false
        }
      },
      interaction: {
        mode: 'index',
        intersect: false
      }
    }
  });
}

// Export the function so it can be used in app.js
export { drawChart };

  
