from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

@app.route('/api/reviews', methods=['POST'])
def receive_reviews():
    try:
        data = request.get_json()
        if not data or 'reviews' not in data:
            return jsonify({"error": "Missing reviews"}), 400
        reviews = data['reviews']
        print("Received reviews:", reviews)
        df = pd.DataFrame(reviews)
        df.to_csv('test_sample.csv', index=False,header=False, encoding='utf-8')
        return jsonify({"message": "Reviews received successfully"}), 200

    except Exception as e:
        print("Exception in /api/reviews:", e)
        return jsonify({"error": str(e)}), 500
    print("")
if __name__ == '__main__':
    app.run(debug=True)
