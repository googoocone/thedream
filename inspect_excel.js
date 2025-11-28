const XLSX = require('xlsx');
const workbook = XLSX.readFile('scholarships.xlsx');
const sheetName = workbook.SheetNames[0]; // '민간' or '공공'
const sheet = workbook.Sheets[sheetName];
const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });

console.log('Sheet Name:', sheetName);
console.log('Headers:', data[0]);
console.log('First Row:', data[1]);
