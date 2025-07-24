import pandas as pd

# Load the CSV from the data folder
df = pd.read_csv('/home/mca/Opinion-Mining-Project/data/battles.csv')

# Check data types and null counts
print(df.info())

# Preview first rows
print(df.head())

# Basic stats for numeric columns
print(df.describe())

# See which columns have missing values
print(df.isnull().sum())

# For columns with few missing values, drop rows with missing in a specific column
# Replace 'column_name' with an actual column that has missing values you want to drop
# For example, if 'attacker_king' has missing values you want to drop:
df = df.dropna(subset=['attacker_king'])

# Or fill missing values in a numeric column with the mean (replace 'column_name' accordingly)
# For example, if 'year' has missing values:
df['year'] = df['year'].fillna(df['year'].mean())

# For text columns, fill missing values with empty string or a placeholder
df['note'] = df['note'].fillna('')

# Remove duplicate rows
df = df.drop_duplicates()

# Fix data types
# Convert 'year' to numeric, coercing errors to NaN (just in case)
df['year'] = pd.to_numeric(df['year'], errors='coerce')

# Convert categorical columns to 'category' type for memory efficiency
df['attacker_king'] = df['attacker_king'].astype('category')
df['defender_king'] = df['defender_king'].astype('category')
df['region'] = df['region'].astype('category')

# Encode categorical variables using one-hot encoding for ML models
df_encoded = pd.get_dummies(df, columns=['attacker_king', 'defender_king', 'region'])

# Optional: Check the new encoded dataframe
print(df_encoded.head())
df_encoded.to_csv('/home/mca/Opinion-Mining-Project/data/battles_cleaned.csv', index=False)
