import pandas as pd
import random

def generate_dataset(n=1000):
    base_data = {
        "text": [
            "I LOOOVE this product 😍😍!!! Highly recommended... #awesome",
            "Worst. Experience. Ever. Will NEVER buy again!!! 🤮🤬",
            "meh... it was okay, I guess. kinda boring tho 🙄",
            "ABSOLUTELY AMAZING SERVICE!!! 😍💯 www.company.com",
            "@brand You guys rock! Keep it up 👏🔥🔥🔥",
            "Totally disappointed. Delivery late, product broken. 😡",
            "just okay. nothing special. 3/10 maybe 🤷‍♂️",
            "Loved the color, but the fit was terrible :(",
            "Refunded. Not worth the price!!! http://badshop.com",
            "Thanks @brand for the quick support!!"
        ],
        "label": [
            "positive", "negative", "neutral", "positive", "positive",
            "negative", "neutral", "negative", "negative", "positive"
        ]
    }
    base_df = pd.DataFrame(base_data)
    
    texts = base_df['text'].tolist()
    labels = base_df['label'].tolist()
    
    emojis = ['😍', '🤮', '🤬', '🙄', '💯', '👏', '🔥', '😡', '🤷‍♂️', '🙂', '😕']
    hashtags = ['#awesome', '#fail', '#meh', '#happy', '#sad', '#ok']
    endings = ['!', '!!', '...', '.', '']
    
    new_texts = []
    new_labels = []
    
    for _ in range(n):
        idx = random.randint(0, len(texts) - 1)
        base_text = texts[idx]
        base_label = labels[idx]
        
        text = base_text
        
        # 50% chance to add extra emoji
        if random.random() < 0.5:
            text += ' ' + random.choice(emojis)
        
        # 30% chance to add hashtag if not already present
        if random.random() < 0.3 and not any(tag in text for tag in hashtags):
            text += ' ' + random.choice(hashtags)
        
        # Randomly change ending punctuation
        if text[-1] in ['!', '.', '?']:
            text = text[:-1] + random.choice(endings)
        
        new_texts.append(text)
        new_labels.append(base_label)
    
    df = pd.DataFrame({'text': new_texts, 'label': new_labels})
    return df
df = generate_dataset(10000000)
print(df['label'].value_counts())
print(df.head())
