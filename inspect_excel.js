const XLSX = require('xlsx');

const workbook = XLSX.readFile('scholarship2.xlsx');
console.log('Sheet Names:', workbook.SheetNames);
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];

const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
console.log('Total Rows:', rows.length);

function excelDateToJSDate(serial) {
    if (!serial || isNaN(serial)) return serial;
    const utc_days = Math.floor(serial - 25569);
    const utc_value = utc_days * 86400;
    const date_info = new Date(utc_value * 1000);
    return date_info.toISOString().split('T')[0];
}

rows.forEach((row, index) => {
    // Print row index and title (index 1) and dates (index 14, 15)
    const title = row[1];
    const period = row[14];
    const end = row[15];
    console.log(`Row ${index}: Title="${title}", Period=${period} (${excelDateToJSDate(period)}), End=${end} (${excelDateToJSDate(end)})`);
});
