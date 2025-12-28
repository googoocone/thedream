
import pandas as pd
import os

file_path = 'scholarship18.xlsx'
if not os.path.exists(file_path):
    print(f"{file_path} does not exist.")
else:
    try:
        # Inspect columns and first few rows
        df = pd.read_excel(file_path, header=2)
        print(f"Total Rows: {len(df)}")
        print("Columns:", df.columns.tolist())
        
        print("\n--- Rows ---")
        for i, row in df.iterrows():
            print(f"Row {i}: {row.get('name', 'N/A')} | {row.get('target_university_region', 'N/A')}")
            
    except Exception as e:
        print(f"Error reading excel: {e}")
