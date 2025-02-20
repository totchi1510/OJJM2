// chart.js
function drawChart(data) {
  const timeLabels = data.map(row => row[0]);  // Date (X-axis)
  const drivingScores = data.map(row => parseFloat(row[1]));  // Driving score (Y-axis)
  const heartRates = data.map(row => parseFloat(row[2]));  // Heart rate (Y-axis)

  const ctx = document.getElementById('chart_div').getContext('2d');
  new Chart(ctx, {
    type: 'line',  // You can also use 'bar', 'line', etc.
    data: {
      labels: timeLabels,
      datasets: [{
        label: '運転スコア',
        data: drivingScores,
        borderColor: 'rgba(75, 192, 192, 1)',  // Line color for driving scores
        fill: false
      },
      {
        label: '心拍数',
        data: heartRates,
        borderColor: 'rgba(153, 102, 255, 1)',  // Line color for heart rate
        fill: false
      }]
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
            text: '値'
          }
        }
      }
    }
  });
}

// Export the function so it can be used in app.js
export { drawChart };
