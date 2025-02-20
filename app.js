const apiKey = 'AIzaSyCnKO4VX7mzk8BNZv1ItWFVpSMHxUKoU4g';  // Replace with your API Key
const spreadsheetId = '1Y9UWQbNmzGvPZxVTs732iUHo9o26KJDbSumj08xObjs';  // Replace with your Spreadsheet ID
const range = 'Sheet1!A1:E2';  // Adjust the range to your sheet (dates in column A, values in column B)

// Fetch data from Google Sheets
fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Sheet1?key=${apiKey}`)
  .then(response => response.json())
  .then(data => {
    displayData(data.values);
  })
  .catch(error => console.error('Error fetching data:', error));

// Display the data in a table
function displayData(data) {
  const tableContainer = document.getElementById('table-container');
  const table = document.createElement('table');
  table.setAttribute('border', '1'); // Optional: Adds a border to the table for better visualization

  // Create table header row
  const headerRow = document.createElement('tr');
  
  // Define the headers based on the columns in your data
  const headers = ['Date', '運転スコア', '心拍数', '皮膚電位', '天気'];
  
  // Create header cells
  headers.forEach(headerText => {
    const th = document.createElement('th');
    th.textContent = headerText;
    headerRow.appendChild(th);
  });

  table.appendChild(headerRow);

  // Create table rows from data
  data.forEach(row => {
    const tableRow = document.createElement('tr');
    
    // Create a table cell for each column in the row
    row.forEach(cell => {
      const td = document.createElement('td');
      td.textContent = cell;
      tableRow.appendChild(td);
    });

    table.appendChild(tableRow);
  });

  // Append the table to the container
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
