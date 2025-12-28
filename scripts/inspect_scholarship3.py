import pandas as pd

try:
    df = pd.read_excel('scholarship3.xlsx', header=1)
    print("Headers:", list(df.columns))
    print("First row:", df.iloc[0].to_dict())
except Exception as e:
    print("Error reading with header=1:", e)
    # Try header=0
    try:
        df = pd.read_excel('scholarship3.xlsx', header=0)
        print("Headers (header=0):", list(df.columns))
    except Exception as e2:
        print("Error reading with header=0:", e2)
