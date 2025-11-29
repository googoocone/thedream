const XLSX = require('xlsx');
const fs = require('fs');

const workbook = XLSX.readFile('scholarship.xlsx');
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];

// Convert sheet to JSON to see headers
const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });
if (data.length > 0) {
    console.log('Headers:', data[0]);
    console.log('First Row Data:', data[1]);
} else {
    console.log('Empty file');
}
