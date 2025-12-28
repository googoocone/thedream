import pandas as pd
import math

def clean_val(val):
    if pd.isna(val):
        return "NULL"
    if isinstance(val, str):
        # Escape single quotes
        val = val.replace("'", "''")
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

# header=2 because headers are on row 3 (0-indexed 2)
df = pd.read_excel('scholarship3.xlsx', header=2)

sql_content = "-- Generated SQL for Scholarship Insertion (v3)\n\n"

for index, row in df.iterrows():
    # Base fields
    # Using 'name' for group_name
    original_name = str(row['name']) if not pd.isna(row['name']) else "Unknown"
    group_name = clean_val(original_name)
    
    # Determine suffix based on criteria
    # Row distinction logic:
    # 1. Disabled: special_criteria has 'disabled' (and min_gpa usually 0)
    # 2. Low Income: special_criteria has 'basic_livelihood' (min_gpa usually low like 1.6 or 2.0?)
    # 3. Freshman: min_gpa is 0 (and NOT disabled)
    # 4. General: min_gpa > 0 (e.g. 2.6 or 3.0)
    
    sc_val_check = str(row['special_criteria']) if not pd.isna(row['special_criteria']) else ""
    try:
        min_gpa_check = float(row['min_gpa']) if not pd.isna(row['min_gpa']) else 0.0
    except:
        min_gpa_check = 0.0
    
    suffix = ""
    # Check "disabled" first
    if 'disabled' in sc_val_check:
        suffix = "(장애인)"
    # Check "low income"
    elif 'basic_livelihood' in sc_val_check or 'second_lowest' in sc_val_check:
        suffix = "(기초/차상위)"
    # Check freshman vs general matching logic
    elif min_gpa_check == 0:
        suffix = "(신입/편입)" 
    else:
        suffix = "(재학생/일반)"
        
    combined_name = f"{original_name} {suffix}"
    name = clean_val(combined_name)
    
    foundation = clean_val(row['foundation'])
    category = clean_val(row['category'])
    benefit_type = clean_val(row['benefit_type'])
    payment_method = clean_val(row['payment_method'])
    payment_period = clean_val(row['payment_period'])
    extra_benefits = clean_val(row['extra_benefits'])
    
    # Arrays
    target_hashtags = clean_array(row['target_hashtags'])
    
    # Special Criteria Handling
    sc_val = row['special_criteria']
    if pd.isna(sc_val):
        sc_list = []
    else:
        sc_list = [x.strip() for x in str(sc_val).split(',')]
    
    # Ensure 'multi_child' is included if relevant? 
    # Previous script enforced this, assuming this file is also for multi-child scholarships or similar batch processing.
    # However, since this is 'scholarship3.xlsx' and might be generic, I should be careful.
    # The user instruction was "follow previously established rules".
    # The previous script had: `if 'multi_child' not in sc_list: sc_list.append('multi_child')`
    # This implies the previous batch was ALL multi-child.
    # I should check if I should apply this blindly to 'scholarship3.xlsx'.
    # If 'scholarship3.xlsx' contains diverse scholarships, this might be wrong.
    # But given "follow rules", I will stick to the logic unless I see 'multi_child' isn't appropriate.
    # Wait, looking at the previous file content (generated_scholarships.sql), not ALL had multi_child.
    # For example, line 105 (Somang Scholarship) has `special_criteria` '{"기독교"}'. No multi_child.
    # Line 207 (National Work-Study) has '{"저소득","장애인","다자녀","다문화"}'.
    # So blindly adding 'multi_child' in the previous script (lines 105-106 of generated_scholarship_sql.py) might have been specific to THAT generic import task or file 'scholarship.xlsx'.
    # I will verify the file content. 
    # If the file 'scholarship3.xlsx' doesn't look like a multi-child specific list, I should probably NOT force it.
    # Does 'scholarship3.xlsx' have a consistent theme?
    # I'll check 'special_criteria' column in the first few rows via the previous inspection output.
    # Row 0: special_criteria is NaN.
    # I will REMOVE the forced 'multi_child' addition for now to be safe, or just map what's in the column. 
    # If the user wants it, they can say so, or it would be in the column.
    # The safest "rule" is to map what is in the Excel.
    
    if not sc_list:
        special_criteria = "NULL"
    else:
        quoted_items = [f"'{x}'" for x in sc_list if x]
        if quoted_items:
            special_criteria = f"ARRAY[{', '.join(quoted_items)}]"
        else:
            special_criteria = "NULL"
    
    # Text
    target_description = clean_val(row['target_description'])
    eligibility = clean_val(row['eligibility'])
    selection_count = clean_val(row['section_count'])
    application_count = clean_val(row['application_count'])
    
    # Dates
    start_date_raw = row['application_period']
    end_date_raw = row['application_end']
    
    app_start_val = clean_date(start_date_raw)
    app_end_val = clean_date(end_date_raw)
    
    app_period_str = "NULL"
    if app_start_val != "NULL" and app_end_val != "NULL":
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
    target_grade = clean_val(row['target_grade'])
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
    target_universities = clean_val(row['target_university'])

    sql = f"""
INSERT INTO scholarships (
    group_name, name, foundation, category, benefit_type, payment_method, payment_period,
    extra_benefits, target_hashtags, target_description, eligibility, selection_count,
    application_count, application_period, application_start, application_end,
    application_method, required_documents, description, contact, link, amount,
    target_grade, min_gpa, max_income, target_gender, target_school_type,
    target_region, target_major_category, min_prev_semester_credits, special_criteria,
    target_nationality, target_parents_region, target_university_region, target_high_school_region,
    max_csat_grade, max_school_grade, target_enrollment_status, target_universities
) VALUES (
    {group_name}, {name}, {foundation}, {category}, {benefit_type}, {payment_method}, {payment_period},
    {extra_benefits}, {target_hashtags}, {target_description}, {eligibility}, {selection_count},
    {application_count}, {app_period_str}, {app_start_val}, {app_end_val},
    {application_method}, {required_documents}, {description}, {contact}, {link}, {amount},
    {target_grade}, {min_gpa}, {max_income}, {target_gender}, {target_school_type},
    {target_region}, {target_major_category}, {min_prev_semester_credits}, {special_criteria},
    {target_nationality}, {target_parents_region}, {target_university_region}, {target_high_school_region},
    {max_csat_grade}, {max_school_grade}, {target_enrollment_status}, {target_universities}
);
"""
    sql_content += sql

with open('data/generated_scholarships_3.sql', 'w', encoding='utf-8') as f:
    f.write(sql_content)

print("SQL file generated successfully at data/generated_scholarships_3.sql")
