const XLSX = require('xlsx');
const fs = require('fs');

const workbook = XLSX.readFile('scholarships.xlsx');
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];

const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

// Skip first 3 rows (0: Group Header, 1: Column Header (KR), 2: Column Header (EN))
// Data starts from index 3
const dataRows = jsonData.slice(3);

function escapeSql(str) {
    if (str === null || str === undefined) return 'NULL';
    if (typeof str === 'string') {
        const escaped = str.replace(/'/g, "''");
        return `'${escaped}'`;
    }
    return str;
}

function parseArray(str) {
    if (!str) return 'NULL';
    // If it's a string looking like array, or comma separated?
    // Based on schema, some might be arrays in DB but strings in Excel.
    // For text[] columns like tags, target_hashtags, special_criteria
    // If input is "tag1, tag2", convert to ARRAY['tag1', 'tag2']
    // If input is "tag1", convert to ARRAY['tag1']

    // Check if it's already array-like string
    if (typeof str === 'string') {
        const items = str.split(',').map(s => s.trim()).filter(s => s !== '');
        if (items.length === 0) return 'NULL';
        const pgArray = items.map(i => `"${i.replace(/"/g, '\\"')}"`).join(',');
        return `'{${pgArray}}'`;
    }
    return `'${str}'`; // Fallback
}

// Column Indices (Based on Row 2)
// 1: name
// 2: foundation
// 3: category
// 4: benefit_type
// 5: support_detail (amount info?) -> mapped to amount usually? No, DB has 'amount' at col 21
// Let's check Row 2 again from output
// ...
// 21: amount
// ...
// 28: target_major_category
// ...
// 38: target_universities

// Valid Columns in DB (based on create_scholarships_table.sql and additions)
/*
  name, foundation, category, benefit_type, amount, 
  payment_method, payment_period, extra_benefits, 
  target_hashtags, target_description, eligibility, 
  selection_count, application_count, application_period, application_end, 
  application_method, required_documents, description, contact, link,
  
  target_grade, min_gpa, max_income, target_gender, target_school_type,
  target_region, target_major_category, min_prev_semester_credits, special_criteria,
  target_nationality, target_parents_region, target_university_region, target_high_school_region,
  max_csat_grade, max_school_grade, target_enrollment_status, target_universities
*/

// Mapping index from Excel to DB Column Name
const colMap = {
    1: 'name',
    2: 'foundation',
    3: 'category',
    4: 'benefit_type',
    // 5: 'support_detail' -> DB doesn't seem to have strict support_detail matching standard columns, maybe 'description'? Or extra col?
    // Let's check DB schema again. 'amount' (text) is there.
    // Row 2 says: 21: amount. 5: support_detail (지원 금액 상세).
    // Let's use 21 for amount. 
    6: 'payment_method',
    7: 'payment_period',
    8: 'extra_benefits',
    9: 'target_hashtags', // Array?
    10: 'target_description',
    11: 'eligibility',
    12: 'selection_count',
    13: 'application_count',
    14: 'application_period',
    15: 'application_end', // Need date parsing?
    16: 'application_method',
    17: 'required_documents',
    18: 'description',
    19: 'contact',
    20: 'link',
    21: 'amount',
    22: 'target_grade',
    23: 'min_gpa',
    24: 'max_income',
    25: 'target_gender',
    26: 'target_school_type',
    27: 'target_region',
    28: 'target_major_category',
    29: 'min_prev_semester_credits',
    30: 'special_criteria', // Array?
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

dataRows.forEach(row => {
    // Only process if name exists
    if (!row[1]) return;

    let cols = [];
    let vals = [];

    // Logic Fix: If target_universities is present (and not '무관'), 
    // force target_region and target_university_region to '전국' (Nationwide).
    // This allows the specific university list to be the sole filter.
    const targetUnis = row[38]; // Index 38 is target_universities
    if (targetUnis && typeof targetUnis === 'string' && targetUnis !== '무관' && targetUnis.trim() !== '') {
        // target_region is Index 27 -> Mapped via colMap
        // target_university_region is Index 33 -> Mapped via colMap
        row[27] = '전국';
        row[33] = '전국';
    }

    for (const [idx, dbCol] of Object.entries(colMap)) {
        let val = row[idx];

        // Handling Date for application_end (Index 15)
        // Excel might return number (days since 1900) or string
        if (dbCol === 'application_end') {
            if (typeof val === 'number') {
                // Convert Excel date to JS Date
                const date = new Date((val - (25567 + 2)) * 86400 * 1000);
                // Adjust logic if needed (25569 is usual offset, but sometimes tricky)
                // Or simple formatting yyyy-mm-dd
                // Actually exceljs might be better but we use xlsx structure
                // Simple approximation: (val - 25569) * 86400000
                const jsDate = new Date(Math.round((val - 25569) * 86400 * 1000));
                val = jsDate.toISOString().split('T')[0];
            } else if (typeof val === 'string') {
                // Try to extract YYYY-MM-DD if present
                const match = val.match(/\d{4}-\d{2}-\d{2}/);
                if (match) {
                    val = match[0];
                }
            }
        }

        // Map excel "any" to db "any" (already consistent?)

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

console.log(sqlStatements.join('\n'));
fs.writeFileSync('data/generated_scholarships.sql', sqlStatements.join('\n'));
