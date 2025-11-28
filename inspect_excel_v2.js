const XLSX = require('xlsx');
const workbook = XLSX.readFile('scholarships.xlsx');
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];
const data = XLSX.utils.sheet_to_json(sheet, { header: 1, range: 0, defval: null });

console.log('Sheet Name:', sheetName);
for (let i = 0; i < 5; i++) {
    console.log(`Row ${i}:`, JSON.stringify(data[i]));
}
