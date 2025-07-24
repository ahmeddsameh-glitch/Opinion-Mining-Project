import pandas as pd
from nltk.tokenize import TreebankWordTokenizer
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
import string
import nltk

nltk.download('stopwords')
nltk.download('wordnet')
nltk.download('omw-1.4')

# Load data
df = pd.read_csv('/home/mca/Opinion-Mining-Project/data/battles.csv') 
text_col = 'note'
print(df.columns)
print(df[text_col].dropna().head(10))

tokenizer = TreebankWordTokenizer()
stop_words = set(stopwords.words('english'))
lemmatizer = WordNetLemmatizer()

def preprocess_text(text):
    if pd.isnull(text):
        return ""
    tokens = tokenizer.tokenize(text.lower())
    tokens = [t for t in tokens if t not in string.punctuation]
    tokens = [t for t in tokens if t not in stop_words]
    tokens = [lemmatizer.lemmatize(t) for t in tokens]
    return ' '.join(tokens)

df['note_clean'] = df[text_col].apply(preprocess_text)
print(df[['note', 'note_clean']].head(10))
print("Original note (row 9):")
print(df.loc[9, 'note'])
print("\nCleaned note (row 9):")
print(df.loc[9, 'note_clean'])

