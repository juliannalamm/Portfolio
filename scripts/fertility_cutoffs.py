import pandas as pd


df = pd.read_csv('semen_analysis_data_Train.csv')

# 5th-centile cutoffs (from WHO) 
cutoffs = {
    'Ejaculate volume (mL)': 1.5,
    'Total sperm count': 39,        
    'Sperm concentration': 15,       
    'Sperm vitality (%)': 58,                 
    'Progressive motility (%)': 32,     
    'Normal spermatozoa (%)': 4.0                
}

# Label as Subfertile if ANY parameter is below its cutoff, otherwise Fertile
df['fertility_label'] = df.apply(
    lambda row: 'Subfertile'
        if any(row[param] < cutoff for param, cutoff in cutoffs.items())
        else 'Fertile',
    axis=1
)

#  check of how many in each category
print(df['fertility_label'].value_counts())


