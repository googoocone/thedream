
import * as xlsx from 'xlsx';
import * as fs from 'fs';
import * as path from 'path';

const INPUT_FILE = 'scholarship2.xlsx';
const OUTPUT_FILE = path.join('data', 'insert_scholarships.sql');

// Helper to escape single quotes for SQL
const escapeSql = (str: any) => {
    if (str === null || str === undefined || str === '') return 'NULL';
    if (typeof str === 'number') {
        if (Number.isNaN(str)) return 'NULL';
        return str;
    }
    const s = String(str).trim();
    if (s === 'NaN') return 'NULL';
    return `'${s.replace(/'/g, "''")}'`;
};

// Helper to convert Excel date
const excelDateToISO = (serial: any) => {
    if (!serial) return 'NULL';
    if (typeof serial === 'string' && serial.includes('-')) return `'${serial}'`;
    if (typeof serial === 'number') {
        const date = new Date((serial - 25569) * 86400 * 1000);
        const yyyy = date.getFullYear();
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const dd = String(date.getDate()).padStart(2, '0');
        return `'${yyyy}-${mm}-${dd}'`;
    }
    return 'NULL';
};

async function generateSql() {
    console.log(`📖 Reading ${INPUT_FILE}...`);
    const workbook = xlsx.readFile(INPUT_FILE);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    // Read as Array of Arrays to ignore mismatched headers
    const rows = xlsx.utils.sheet_to_json(worksheet, { header: 1 }) as any[][];

    console.log(`📊 Found ${rows.length} total rows.`);

    // Row 3 (Index 2) is the SCHEMA ROW
    const schemaRow = rows[2];
    if (!schemaRow) {
        console.error("❌ Schema row (Row 3) not found!");
        return;
    }

    // Build a map of "DB Column Name" -> "Excel Column Index"
    const colMap: { [key: string]: number } = {};
    schemaRow.forEach((cell, idx) => {
        if (typeof cell === 'string') {
            const key = cell.trim();
            // Handle typos user might have made (e.g. "min_gpa ")
            colMap[key] = idx;
        }
    });

    console.log("🔑 Detected Schema Keys:", Object.keys(colMap));

    // Valid data starts from Row 4 (Index 3)
    const dataRows = rows.slice(3);

    let sqlContent = `-- Auto-generated Insert SQL for Scholarships\n`;
    sqlContent += `-- Source: ${INPUT_FILE}\n`;
    sqlContent += `-- Generated at: ${new Date().toISOString()}\n\n`;

    // --- 0. Schema Migration (Auto-add missing columns) ---
    sqlContent += `-- 0. Schema Migration (Safe to run multiple times)\n`;
    const newColumns = [
        'category', 'benefit_type', 'amount_detail', 'payment_method', 'payment_period',
        'extra_benefits', 'target_hashtags', 'eligibility', 'section_count', 'application_count',
        'application_period', 'application_method', 'required_documents', 'contact'
    ];
    newColumns.forEach(col => {
        sqlContent += `ALTER TABLE public.scholarships ADD COLUMN IF NOT EXISTS ${col} text;\n`;
    });
    sqlContent += `\n`;

    let count = 0;

    dataRows.forEach((row, index) => {
        // Helper to get value by DB key
        const getVal = (key: string) => {
            const idx = colMap[key];
            if (idx === undefined) return undefined;
            return row[idx];
        };

        const name = getVal('name');
        if (!name) return; // Skip empty rows

        const foundation = getVal('foundation');
        const amount = getVal('amount') || '추후공지';
        const appEnd = getVal('application_end');

        // Fields
        const targetGrade = getVal('target_grade');
        const minGpa = getVal('min_gpa') || 0; // The schema key might be "min_gpa" (trimmed)
        const maxIncome = getVal('max_income') || 10;
        const targetGender = getVal('target_gender') || 'any';
        const schoolType = getVal('target_school_type') || 'university,college';
        const region = getVal('target_region') || '전국';
        const majorCat = getVal('target_major_category') || '무관';

        // Special Criteria (Array)
        const specificRaw = getVal('special_criteria');
        const specialCriteria = specificRaw ? `ARRAY['${String(specificRaw).replace(/'/g, "''")}']` : 'NULL';

        const nationality = getVal('target_nationality') || 'Korea';
        const prevCredit = getVal('min_prev_semester_credits');
        const parentsRegion = getVal('target_parents_region');
        const univRegion = getVal('target_university_region');
        const hsRegion = getVal('target_high_school_region');
        const csat = getVal('max_csat_grade');
        const schoolGrade = getVal('max_school_grade');
        const enrollStatus = getVal('target_enrollment_status') || 'enrolled';

        const description = getVal('target_description') || '';
        const link = getVal('link') || '';

        // New Columns
        const category = getVal('category');
        const benefitType = getVal('benefit_type');
        const amountDetail = getVal('amount_detail');
        const paymentMethod = getVal('payment_method');
        const paymentPeriod = getVal('payment_period');
        const extraBenefits = getVal('extra_benefits');

        // CORRECTION: target_hashtags must be an ARRAY
        const rawHashtags = getVal('target_hashtags');
        const targetHashtags = rawHashtags
            ? `ARRAY['${String(rawHashtags).split(',').map(s => s.trim().replace(/'/g, "''")).join("','")}']`
            : 'NULL';

        const eligibility = getVal('eligibility');
        const sectionCount = getVal('section_count');
        const appCount = getVal('application_count');
        const appPeriod = getVal('application_period');
        const appMethod = getVal('application_method');
        const reqDocs = getVal('required_documents');
        const contact = getVal('contact');

        // Handle tags
        const tags = "ARRAY['민간장학금']";

        const insertStmt = `INSERT INTO public.scholarships (
            name, foundation, amount, application_end,
            category, benefit_type, amount_detail, payment_method, payment_period,
            extra_benefits, target_hashtags, eligibility, section_count, application_count,
            application_period, application_method, required_documents, contact,
            target_grade, min_gpa, max_income, target_gender,
            target_school_type, target_region, target_major_category,
            special_criteria, target_nationality,
            min_prev_semester_credits, target_parents_region, target_university_region, target_high_school_region, 
            max_csat_grade, max_school_grade, target_enrollment_status,
            tags, target_description, link
        ) VALUES (
            ${escapeSql(name)}, ${escapeSql(foundation)}, ${escapeSql(amount)}, ${excelDateToISO(appEnd)},
            ${escapeSql(category)}, ${escapeSql(benefitType)}, ${escapeSql(amountDetail)}, ${escapeSql(paymentMethod)}, ${escapeSql(paymentPeriod)},
            ${escapeSql(extraBenefits)}, ${targetHashtags}, ${escapeSql(eligibility)}, ${escapeSql(sectionCount)}, ${escapeSql(appCount)},
            ${escapeSql(appPeriod)}, ${escapeSql(appMethod)}, ${escapeSql(reqDocs)}, ${escapeSql(contact)},
            ${escapeSql(targetGrade)}, ${escapeSql(minGpa)}, ${escapeSql(maxIncome)}, ${escapeSql(targetGender)},
            ${escapeSql(schoolType)}, ${escapeSql(region)}, ${escapeSql(majorCat)},
            ${specialCriteria}, ${escapeSql(nationality)},
            ${escapeSql(prevCredit)}, ${escapeSql(parentsRegion)}, ${escapeSql(univRegion)}, ${escapeSql(hsRegion)},
            ${escapeSql(csat)}, ${escapeSql(schoolGrade)}, ${escapeSql(enrollStatus)},
            ${tags}, ${escapeSql(description)}, ${escapeSql(link)}
        );`;

        sqlContent += insertStmt + '\n';
        count++;
    });

    if (!fs.existsSync(path.dirname(OUTPUT_FILE))) {
        fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
    }

    fs.writeFileSync(OUTPUT_FILE, sqlContent);
    console.log(`✅ SQL Generated at: ${OUTPUT_FILE} (Rows: ${count})`);
}

generateSql();
