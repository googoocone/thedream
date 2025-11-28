const XLSX = require('xlsx');
const fs = require('fs');

function excelDateToJSDate(serial) {
    if (!serial || isNaN(serial)) return null;
    const utc_days = Math.floor(serial - 25569);
    const utc_value = utc_days * 86400;
    const date_info = new Date(utc_value * 1000);
    return date_info.toISOString().split('T')[0];
}

function escapeSql(str) {
    if (str === null || str === undefined) return 'NULL';
    return "'" + String(str).replace(/'/g, "''").replace(/\n/g, '\\n') + "'";
}

const workbook = XLSX.readFile('scholarships.xlsx');
let sql = `
-- Seed data for scholarships
TRUNCATE TABLE public.scholarships;
INSERT INTO public.scholarships (
    name, foundation, category, benefit_type, amount, 
    payment_method, payment_period, extra_benefits, 
    target_hashtags, target_description, eligibility, selection_count,
    application_count, application_period, application_end, 
    application_method, required_documents, description, contact, link
) VALUES
`;

const rows = [];

workbook.SheetNames.forEach(sheetName => {
    const sheet = workbook.Sheets[sheetName];
    let rangeIndex = 4; // Default for 공공장학금 (starts at row 5, index 4)

    // Check sheet name to determine start row
    if (sheetName.includes('민간')) {
        rangeIndex = 2; // 민간장학금 starts at row 3 (index 2)
    }

    console.log(`Processing ${sheetName} starting from index ${rangeIndex}...`);

    const data = XLSX.utils.sheet_to_json(sheet, { header: 1, range: rangeIndex, defval: null });

    data.forEach(row => {
        // Check if row has name (index 1)
        if (!row[1]) return;

        const name = escapeSql(row[1]);
        const foundation = escapeSql(row[2]);
        const category = escapeSql(row[3]);
        const benefit_type = escapeSql(row[4]);
        const amount = escapeSql(row[5]);
        const payment_method = escapeSql(row[6]);
        const payment_period = escapeSql(row[7]);
        const extra_benefits = escapeSql(row[8]);

        // Hashtags
        let tags = row[9] ? row[9].toString().split(' ').filter(t => t.trim() !== '') : [];
        const target_hashtags = tags.length > 0 ? "ARRAY[" + tags.map(t => escapeSql(t)).join(',') + "]" : "NULL";

        const target_description = escapeSql(row[10]);
        const eligibility = escapeSql(row[11]);
        const selection_count = escapeSql(row[12]);
        const application_count = escapeSql(row[13]);
        const application_period = escapeSql(row[14]);

        // Date conversion
        const app_end_date = excelDateToJSDate(row[15]);
        const application_end = app_end_date ? `'${app_end_date}'` : 'NULL';

        const application_method = escapeSql(row[16]);
        const required_documents = escapeSql(row[17]);
        const description = escapeSql(row[18]);
        const contact = escapeSql(row[19]);
        const link = escapeSql(row[20]);

        rows.push(`(${name}, ${foundation}, ${category}, ${benefit_type}, ${amount}, 
            ${payment_method}, ${payment_period}, ${extra_benefits}, 
            ${target_hashtags}, ${target_description}, ${eligibility}, ${selection_count},
            ${application_count}, ${application_period}, ${application_end}, 
            ${application_method}, ${required_documents}, ${description}, ${contact}, ${link})`);
    });
});

sql += rows.join(',\n') + ';';

fs.writeFileSync('supabase/seed_scholarships.sql', sql);
console.log(`Generated SQL with ${rows.length} scholarships.`);
