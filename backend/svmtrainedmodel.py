import joblib
import os

MODEL_DIR = os.path.join(os.path.dirname(__file__), '../notebooks/Models')

def loadSVM():
    """
    Load and return trained SVM model + vectorizer in a dictionary.
    """
    models = {}

    model_files = {
        "svm_model": "svm_sentiment_model.pkl",
        "svm_vectorizer": "svm_vectorizer.pkl"
    }

    for key, filename in model_files.items():
        path = os.path.join(MODEL_DIR, filename)
        models[key] = joblib.load(path)

    return models
