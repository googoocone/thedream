import pandas as pd

try:
    df = pd.read_excel('scholarship3.xlsx', header=2)
    print("Headers (header=2):", list(df.columns))
    print("First row:", df.iloc[0].to_dict())
except Exception as e:
    print("Error reading with header=2:", e)
