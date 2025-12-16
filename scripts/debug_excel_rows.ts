
import * as xlsx from 'xlsx';

const INPUT_FILE = 'scholarship2.xlsx';

function main() {
    const workbook = xlsx.readFile(INPUT_FILE);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    // Read header row (Index 1 / Row 2)
    const jsonData = xlsx.utils.sheet_to_json(worksheet, { range: 1 });

    console.log("--- Row 3 (Index 0 in data) ---");
    console.log(jsonData[0]);

    console.log("\n--- Row 4 (Index 1 in data) ---");
    console.log(jsonData[1]);
}

main();
