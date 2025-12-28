import pandas as pd

try:
    df = pd.read_excel('scholarship20.xlsx')
    print("Columns:", df.columns.tolist())
    print("First row:", df.iloc[0].tolist())
except Exception as e:
    print(e)
