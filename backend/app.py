from flask import Flask, jsonify
import pandas as pd
import ast
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
@app.route('/comments')
def get_comments():
    # Read CSV with pandas
    df = pd.read_csv('/home/mca/Opinion-Mining-Project/data/test_sample.csv', encoding='utf-8')

    # Convert 'tokenized' column from string to list safely
    if 'tokenized' in df.columns:
        df['tokenized'] = df['tokenized'].apply(lambda x: ast.literal_eval(x) if pd.notnull(x) else [])

    # Select only needed columns to send (adjust as needed)
    # For example: text, label, tokenized
    data_to_send = df[['text', 'label', 'tokenized']].to_dict(orient='records')

    return jsonify(data_to_send)

if __name__ == '__main__':
    app.run(debug=True)
