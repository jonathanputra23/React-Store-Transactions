const XLSX = require('xlsx');
const fs = require('fs');

// Read the Excel file
const workbook = XLSX.readFile('test.xlsx');
const worksheet = workbook.Sheets[workbook.SheetNames[0]];
const jsonData = XLSX.utils.sheet_to_json(worksheet);

// Write the JSON data to a file
fs.writeFileSync('items.json', JSON.stringify(jsonData), 'utf-8');

console.log('Data extracted and saved to items.json');
