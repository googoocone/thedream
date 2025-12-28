
const XLSX = require('xlsx');
const fs = require('fs');

const workbook = XLSX.readFile('test_scholarships.xlsx');
const sheetName = workbook.SheetNames[0];
console.log('Sheet Names:', workbook.SheetNames);
const worksheet = workbook.Sheets[sheetName];

// Read ALL rows (header: 1 returns array of arrays)
const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

// Data starts from index 3 (Row 4 in Excel)
console.log('Worksheet Range (!ref):', worksheet['!ref']);
console.log('Direct Check V4 (Amount):', worksheet['V4']);
console.log('Direct Check AM4 (Target Unis):', worksheet['AM4']);

const dataRows = jsonData.slice(3);

function escapeSql(str) {
    if (str === null || str === undefined) return 'NULL';
    if (typeof str === 'string') {
        // Remove null characters or weird stuff if any
        str = str.replace(/\0/g, '');
        const escaped = str.replace(/'/g, "''");
        return `'${escaped}'`;
    }
    return str;
}

function parseArray(str) {
    if (!str) return 'NULL';
    if (typeof str === 'string') {
        const items = str.split(',').map(s => s.trim()).filter(s => s !== '');
        if (items.length === 0) return 'NULL';
        const pgArray = items.map(i => `"${i.replace(/"/g, '\\"')}"`).join(',');
        return `'{${pgArray}}'`;
    }
    return `'${str}'`; // Fallback
}

// Column Indices (Based on Row 2 / Index 2 of Header)
const colMap = {
    1: 'name',
    2: 'foundation',
    3: 'category',
    4: 'benefit_type',
    6: 'payment_method',
    7: 'payment_period',
    8: 'extra_benefits',
    9: 'target_hashtags',
    10: 'target_description',
    11: 'eligibility',
    12: 'selection_count',
    13: 'application_count',
    14: 'application_period',
    15: 'application_end',
    16: 'application_method',
    17: 'required_documents',
    18: 'description',
    19: 'contact',
    20: 'link',
    // The 18 Fields requested
    21: 'amount',
    22: 'target_grade',
    23: 'min_gpa',
    24: 'max_income',
    25: 'target_gender',
    26: 'target_school_type',
    27: 'target_region',
    28: 'target_major_category',
    29: 'min_prev_semester_credits',
    30: 'special_criteria',
    31: 'target_nationality',
    32: 'target_parents_region',
    33: 'target_university_region',
    34: 'target_high_school_region',
    35: 'max_csat_grade',
    36: 'max_school_grade',
    37: 'target_enrollment_status',
    38: 'target_universities'
};

const arrayCols = ['target_hashtags', 'special_criteria'];

let sqlStatements = [];

console.log(`Processing ${dataRows.length} rows...`);

dataRows.forEach((row, idx) => {
    // Skip empty rows or rows without name
    if (!row[1]) return;

    // Check Unhae (first row) specifically
    if (idx === 0) {
        if (row[21] === undefined) {
            console.error("FATAL: Unhae row is missing Data at index 21! Full row:", JSON.stringify(row));
        } else {
            console.log("Unhae Amount Check:", row[21]);
        }
    }

    let cols = [];
    let vals = [];

    // Logic Fix from Step 383: Trust Target Universities
    const targetUnis = row[38];
    if (targetUnis && typeof targetUnis === 'string' && targetUnis !== '무관' && targetUnis.trim() !== '') {
        // Bypass region filter by setting DB value to 'National'
        row[27] = '전국';
        row[33] = '전국';
    }

    for (const [colIdxStr, dbCol] of Object.entries(colMap)) {
        const colIdx = parseInt(colIdxStr);
        let val = row[colIdx];

        // Date Handling
        if (dbCol === 'application_end') {
            if (typeof val === 'number') {
                const jsDate = new Date(Math.round((val - 25569) * 86400 * 1000));
                val = jsDate.toISOString().split('T')[0];
            } else if (typeof val === 'string') {
                const match = val.match(/\d{4}-\d{2}-\d{2}/);
                if (match) val = match[0];
            }
        }

        cols.push(dbCol);

        if (arrayCols.includes(dbCol)) {
            vals.push(parseArray(val));
        } else {
            vals.push(escapeSql(val));
        }
    }

    const sql = `INSERT INTO scholarships (${cols.join(', ')}) VALUES (${vals.join(', ')});`;
    sqlStatements.push(sql);
});

fs.writeFileSync('data/generated_scholarships.sql', sqlStatements.join('\n'));
console.log(`Generated ${sqlStatements.length} SQL statements.`);
