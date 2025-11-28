const XLSX = require('xlsx');
const workbook = XLSX.readFile('scholarships.xlsx');
workbook.SheetNames.forEach(sheetName => {
    const sheet = workbook.Sheets[sheetName];
    const range = XLSX.utils.decode_range(sheet['!ref']);
    console.log(`Sheet: ${sheetName}, Rows: ${range.e.r + 1}`);
});
