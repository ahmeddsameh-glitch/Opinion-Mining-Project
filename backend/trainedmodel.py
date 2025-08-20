import joblib
import os

MODEL_DIR = os.path.join(os.path.dirname(__file__), '../notebooks/Models')

def load_trained_models():
    """
    Load and return all trained models as a dictionary using joblib.
    """
    models = {}
    
    model_files = {
        'logistic_model': 'logistic_model.pkl',
        'tfidf_vectorizer': 'tfidf_vectorizer.pkl',
        'label_encoder': 'label_encoder.pkl'
    }

    for key, filename in model_files.items():
        path = os.path.join(MODEL_DIR, filename)
        models[key] = joblib.load(path)  # use joblib here
    
    return models
