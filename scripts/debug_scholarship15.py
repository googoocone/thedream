import pandas as pd

try:
    df = pd.read_excel('scholarship16.xlsx', header=2)
    for index, row in df.iterrows():
        print(f"Row {index}: Name='{row.get('name')}', TargetGrade='{row.get('target_grade')}'")
    
    # Print a sample of the 'Right Side' columns for the first row (checking for shift)
    print("\nRight Side Sample (Row 0):")
    keys = ['target_grade', 'min_gpa', 'max_income', 'target_gender', 'target_school_type', 'target_region', 'target_major_category', 'min_prev_semester_credits', 'special_criteria', 'target_nationality', 'target_parents_region', 'target_university_region', 'target_high_school_region']
    for k in keys:
        print(f"{k}: {df.iloc[0].get(k)}")
except Exception as e:
    print(e)
