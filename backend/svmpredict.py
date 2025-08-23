def predict_svm(models, comments):
    vectorizer = models["svm_vectorizer"]
    model = models["svm_model"]

    # Transform comments into TF-IDF vectors
    X = vectorizer.transform(comments)

    # Predict sentiment
    predictions = model.predict(X)

    return predictions.tolist()
