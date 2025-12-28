import pandas as pd

print("--- Inspecting generic read ---")
try:
    df = pd.read_excel('scholarship3.xlsx', header=None, nrows=5)
    print(df)
except Exception as e:
    print(e)
