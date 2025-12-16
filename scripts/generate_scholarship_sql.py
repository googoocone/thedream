import pandas as pd
import math

def clean_val(val):
    if pd.isna(val):
        return "NULL"
    if isinstance(val, str):
        # Escape single quotes
        val = val.replace("'", "''")
        # Handle newlines if needed, but standard string is fine. 
        # For multiline strings with E'', we can try to detect or just use standard '...' 
        # Postgres handles newlines in standard strings fine usually.
        return f"'{val}'"
    return str(val)

def clean_date(val):
    if pd.isna(val):
        return "NULL"
    # Assuming timestamp or string
    try:
        dt = pd.to_datetime(val)
        return f"'{dt.strftime('%Y-%m-%d')}'"
    except:
        return "NULL"

def clean_array(val):
    if pd.isna(val):
        return "NULL"
    if isinstance(val, str):
        # validation for empty or 'nan' string
        if val.lower() == 'nan':
             return "NULL"
        items = [x.strip() for x in val.split(',')]
        # quote each item
        quoted_items = [f"'{x}'" for x in items if x]
        if not quoted_items:
            return "NULL"
        return f"ARRAY[{', '.join(quoted_items)}]"
    return "NULL"

def clean_num(val):
    if pd.isna(val):
        return "NULL"
    return str(val)

df = pd.read_excel('scholarship.xlsx', header=1)

# Columns mapping based on analysis
# Excel Header -> DB Column
# Some columns might need specific handling

sql_content = "-- Generated SQL for Scholarship Insertion\n\n"
sql_content += "-- Grouping Strategy: 'group_name' derived from 'name' for UI grouping\n\n"

for index, row in df.iterrows():
    # Base fields
    group_name = clean_val(row['name']) 
    original_name = row['name']
    
    # Determine suffix based on criteria
    # Row distinction logic:
    # 1. Disabled: special_criteria has 'disabled' (and min_gpa usually 0)
    # 2. Low Income: special_criteria has 'basic_livelihood' (min_gpa usually low like 1.6 or 2.0?)
    # 3. Freshman: min_gpa is 0 (and NOT disabled)
    # 4. General: min_gpa > 0 (e.g. 2.6 or 3.0)
    
    # Needs to access raw values before cleaning
    sc_val_check = str(row['special_criteria']) if not pd.isna(row['special_criteria']) else ""
    min_gpa_check = float(row['min_gpa']) if not pd.isna(row['min_gpa']) else 0.0
    
    suffix = ""
    # Check "disabled" first
    if 'disabled' in sc_val_check:
        suffix = "(장애인)"
    # Check "low income"
    elif 'basic_livelihood' in sc_val_check or 'second_lowest' in sc_val_check:
        suffix = "(기초/차상위)"
    # Check freshman vs general
    # Freshman usually has 0 min_gpa requirements in first semester
    elif min_gpa_check == 0:
        suffix = "(신입/편입)" 
    else:
        suffix = "(재학생/일반)"
        
    name = f"'{original_name} {suffix}'"
    foundation = clean_val(row['foundation'])
    category = clean_val(row['category'])
    benefit_type = clean_val(row['benefit_type'])
    payment_method = clean_val(row['payment_method'])
    payment_period = clean_val(row['payment_period'])
    extra_benefits = clean_val(row['extra_benefits'])
    
    # Arrays
    target_hashtags = clean_array(row['target_hashtags'])
    
    # Special Criteria Handling
    # User requested to ensure 'multi_child' is included as this is a multi-child scholarship
    # We append 'multi_child' to whatever is in the excel or create a new array
    sc_val = row['special_criteria']
    if pd.isna(sc_val):
        sc_list = []
    else:
        sc_list = [x.strip() for x in sc_val.split(',')]
    
    if 'multi_child' not in sc_list:
        sc_list.append('multi_child')
    
    # Re-construct array string for SQL
    if not sc_list:
        special_criteria = "NULL"
    else:
        quoted_items = [f"'{x}'" for x in sc_list]
        special_criteria = f"ARRAY[{', '.join(quoted_items)}]"
    
    # Text
    target_description = clean_val(row['target_description'])
    eligibility = clean_val(row['eligibility'])
    selection_count = clean_val(row['section_count']) # keeping typo mapping from plan
    application_count = clean_val(row['application_count'])
    
    # Dates
    application_period_desc = clean_val(row['application_period'])
    # For date columns, we might need to parse if they are dates in excel or strings
    # Excel 'application_period' seemed to be a date timestamp in previous output (1763...)
    # But schema has 'application_period' as text and 'application_start'/'application_end' as DATE
    # Let's see... row['application_period'] in previous output was 1763596800000 which is 2025-11-20
    # And row['application_end'] was 1766707200000 which is 2025-12-26
    # So we should map:
    # application_period -> application_start (DATE)
    # application_end -> application_end (DATE)
    # And maybe we need a string description for 'application_period' text column? 
    # The schema has `application_period text` AND `application_start date`.
    # Let's set `application_start` from the excel `application_period` value.
    # And generate a string for `application_period` text column like "YYYY-MM-DD ~ YYYY-MM-DD"
    
    start_date_raw = row['application_period']
    end_date_raw = row['application_end']
    
    app_start_val = clean_date(start_date_raw)
    app_end_val = clean_date(end_date_raw)
    
    app_period_str = "NULL"
    if app_start_val != "NULL" and app_end_val != "NULL":
       # remove quotes for cleanup
       s = app_start_val.replace("'","")
       e = app_end_val.replace("'","")
       app_period_str = f"'{s} ~ {e}'"
    
    application_method = clean_val(row['application_method'])
    required_documents = clean_val(row['required_documents'])
    description = clean_val(row['description'])
    contact = clean_val(row['contact'])
    link = clean_val(row['link'])
    amount = clean_val(row['amount'])
    
    # Matching columns
    target_grade = clean_val(row['target_grade']) # '1,2,3,4' string is fine
    min_gpa = clean_num(row['min_gpa'])
    max_income = clean_num(row['max_income'])
    target_gender = clean_val(row['target_gender'])
    target_school_type = clean_val(row['target_school_type'])
    target_region = clean_val(row['target_region'])
    target_major_category = clean_val(row['target_major_category'])
    min_prev_semester_credits = clean_num(row['min_prev_semester_credits'])
    target_nationality = clean_val(row['target_nationality'])
    target_parents_region = clean_val(row['target_parents_region'])
    target_university_region = clean_val(row['target_university_region'])
    target_high_school_region = clean_val(row['target_high_school_region'])
    max_csat_grade = clean_num(row['max_csat_grade'])
    max_school_grade = clean_num(row['max_school_grade'])
    target_enrollment_status = clean_val(row['target_enrollment_status'])

    sql = f"""
INSERT INTO scholarships (
    group_name, name, foundation, category, benefit_type, payment_method, payment_period,
    extra_benefits, target_hashtags, target_description, eligibility, selection_count,
    application_count, application_period, application_start, application_end,
    application_method, required_documents, description, contact, link, amount,
    target_grade, min_gpa, max_income, target_gender, target_school_type,
    target_region, target_major_category, min_prev_semester_credits, special_criteria,
    target_nationality, target_parents_region, target_university_region, target_high_school_region,
    max_csat_grade, max_school_grade, target_enrollment_status
) VALUES (
    {group_name}, {name}, {foundation}, {category}, {benefit_type}, {payment_method}, {payment_period},
    {extra_benefits}, {target_hashtags}, {target_description}, {eligibility}, {selection_count},
    {application_count}, {app_period_str}, {app_start_val}, {app_end_val},
    {application_method}, {required_documents}, {description}, {contact}, {link}, {amount},
    {target_grade}, {min_gpa}, {max_income}, {target_gender}, {target_school_type},
    {target_region}, {target_major_category}, {min_prev_semester_credits}, {special_criteria},
    {target_nationality}, {target_parents_region}, {target_university_region}, {target_high_school_region},
    {max_csat_grade}, {max_school_grade}, {target_enrollment_status}
);
"""
    sql_content += sql

with open('data/insert_new_scholarship.sql', 'w', encoding='utf-8') as f:
    f.write(sql_content)

print("SQL file generated successfully at data/insert_new_scholarship.sql")
