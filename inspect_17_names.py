
import pandas as pd

file_path = 'scholarship17.xlsx'
try:
    df = pd.read_excel(file_path, header=2)
    print(f"Total Rows: {len(df)}")
    
    print("\n--- LEFT SIDE (Cols 0-20) ---")
    left_names = df.iloc[:, 1].dropna().unique() # Column 1 is typically 'name'
    print(left_names)
    
    print("\n--- RIGHT SIDE (Cols 22+) ---")
    # Proxy mapping usually takes target_grade (Col 22) as name?
    # Let's check Col 22
    right_names = df.iloc[:, 22].dropna().unique()
    print(right_names)

except Exception as e:
    print(e)
