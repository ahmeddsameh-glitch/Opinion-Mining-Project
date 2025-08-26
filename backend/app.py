from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
from svmtrainedmodel import loadSVM  
from svmpredict import predict_svm         

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

# ---- Load trained SVM model + vectorizer at startup ----
models = loadSVM()
svm_model = models["svm_model"]
vectorizer = models["svm_vectorizer"]
print("✅ SVM model + vectorizer loaded successfully at startup!")

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

        # Run predictions with SVM
        results = predict_svm(models , comments)
        print("results",results)
        return jsonify({
            "message": "Reviews processed successfully",
            "results": results
        }), 200

    except Exception as e:
        print("❌ Exception in /api/reviews:", e)
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
