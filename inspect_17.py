import pandas as pd
import sys

# Force utf-8 output if possible
sys.stdout.reconfigure(encoding='utf-8')

try:
    df = pd.read_excel('scholarship17.xlsx', header=None)
    
    # Write first 10 rows to a text file
    with open('inspect_17_rows.txt', 'w', encoding='utf-8') as f:
        for i, row in df.head(10).iterrows():
            f.write(f"Row {i}:\n")
            # Write each cell value with its column index
            for idx, val in enumerate(row):
                if pd.notna(val):
                    f.write(f"  Col {idx}: {val}\n")
            f.write("\n")
            
    print("Inspection written to inspect_17_rows.txt")

except Exception as e:
    print(f"Error: {e}")
