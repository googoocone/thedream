
import * as xlsx from 'xlsx';

const workbook = xlsx.readFile('scholarship2.xlsx');
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];

// Get headers (first row)
const jsonData = xlsx.utils.sheet_to_json(worksheet, { header: 1 });
if (jsonData.length > 0) {
    console.log("Headers:", jsonData[0]);
    console.log("First Row Data:", jsonData[1]);
} else {
    console.log("Empty file");
}
