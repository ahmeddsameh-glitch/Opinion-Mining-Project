from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
from trainedmodel import load_trained_models
from predict_save import predict_and_save_sentiments   # ⬅️ new import

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

# ---- Load trained models once at startup ----
models = load_trained_models()
logistic_model = models['logistic_model']
vectorizer = models['tfidf_vectorizer']
label_encoder = models['label_encoder']
print("✅ Models loaded successfully at startup!")

# ---- API route ----
@app.route('/api/reviews', methods=['POST'])
def receive_reviews():
    try:
        data = request.get_json()
        if not data or 'reviews' not in data:
            return jsonify({"error": "Missing reviews"}), 400

        reviews = data['reviews']
        print("📥 Received reviews:", reviews)

        # Extract only the comment texts for prediction
        comments = [r["comment"] for r in reviews if "comment" in r]

        # Run predictions
        results = predict_and_save_sentiments(
            logistic_model, vectorizer, label_encoder,
            comments, "test_sample.csv"
        )

        return jsonify({
            "message": "Reviews processed successfully",
            "results": results
        }), 200

    except Exception as e:
        print("❌ Exception in /api/reviews:", e)
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
