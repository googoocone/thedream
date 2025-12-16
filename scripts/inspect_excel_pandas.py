import pandas as pd
import sys

try:
    df = pd.read_excel('scholarship.xlsx')
    print("Columns:", df.columns.tolist())
    print("First row:", df.iloc[0].to_dict())
    print("\nNon-null counts:\n", df.count())
    
    # Check for group_name in excel
    if 'group_name' in df.columns:
        print("\ngroup_name found in Excel.")
    else:
        print("\ngroup_name NOT found in Excel.")

except Exception as e:
    print(f"Error: {e}")
