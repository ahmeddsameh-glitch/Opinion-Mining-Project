import pandas as pd

def predict_and_save_sentiments(model, vectorizer, label_encoder, comments, output_file="sentiment_results.csv"):
    X = vectorizer.transform(comments)
    probs = model.predict_proba(X)

    results = []
    for comment, prob in zip(comments, probs):
        max_conf = max(prob)
        pred_index = prob.argmax()

        if 0.45 < max_conf < 0.65:
            final_label = "neutral"
        else:
            final_label = label_encoder.inverse_transform([pred_index])[0]

        results.append({
            "comment": comment,
            "sentiment": final_label,
            "confidence": round(float(max_conf), 2)
        })

    # save to CSV
    df = pd.DataFrame(results)
    df.to_csv(output_file, index=False, encoding="utf-8")
    print(f"Sentiment results saved to {output_file}")

    return results
