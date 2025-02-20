const apiKey = 'AIzaSyCnKO4VX7mzk8BNZv1ItWFVpSMHxUKoU4g';  // Replace with your API Key
const spreadsheetId = '1Y9UWQbNmzGvPZxVTs732iUHo9o26KJDbSumj08xObjs';  // Replace with your Spreadsheet ID
const range = 'Sheet1!A1:B1';  // Adjust the range to your sheet (dates in column A, values in column B)

// Fetch data from Google Sheets
fetch(`https://sheets.googleapis.com/v4/spreadsheets/1Y9UWQbNmzGvPZxVTs732iUHo9o26KJDbSumj08xObjs/values/Sheet1!A1:B1?key=AIzaSyCnKO4VX7mzk8BNZv1ItWFVpSMHxUKoU4g`)
  .then(response => response.json())
  .then(data => {
    displayData(data.values);
  })
  .catch(error => console.error('Error fetching data:', error));

// Display the data in a table
function displayData(data) {
  const tableContainer = document.getElementById('table-container');
  const table = document.createElement('table');

  // Create table header row
  const headerRow = document.createElement('tr');
  const th1 = document.createElement('th');
  th1.textContent = 'Date';
  const th2 = document.createElement('th');
  th2.textContent = 'Value';
  headerRow.appendChild(th1);
  headerRow.appendChild(th2);
  table.appendChild(headerRow);

  // Create table rows from data
  data.forEach(row => {
    const tableRow = document.createElement('tr');
    const td1 = document.createElement('td');
    td1.textContent = row[0];  // Date in the first column
    const td2 = document.createElement('td');
    td2.textContent = row[1];  // Value in the second column
    tableRow.appendChild(td1);
    tableRow.appendChild(td2);
    table.appendChild(tableRow);
  });

  tableContainer.appendChild(table);
}

// Register the service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js')
    .then(registration => {
      console.log('Service Worker registered with scope:', registration.scope);
    })
    .catch(error => {
      console.log('Service Worker registration failed:', error);
    });
}
