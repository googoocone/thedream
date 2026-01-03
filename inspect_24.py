import pandas as pd
import sys

try:
    df = pd.read_excel('scholarship24.xlsx', header=2)
    print("Columns:", df.columns.tolist())
    for index, row in df.iterrows():
        print(f"--- ROW {index} ---")
        print(f"Name: {row.get('name')}")
        print(f"Target Desc: {row.get('target_description')}")
        print(f"Eligibility: {row.get('eligibility')}")
        print(f"Support Detail: {row.get('support_detail')}")
        print("----------------")
except Exception as e:
    print(e)
