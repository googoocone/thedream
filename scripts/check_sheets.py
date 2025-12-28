import pandas as pd

xl = pd.ExcelFile('scholarship3.xlsx')
print("Sheet names:", xl.sheet_names)
