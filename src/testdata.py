import pandas as pd
import random

def generate_dataset(n=1000):
    base_data = {
        "text": [
            # Positive (20 examples)
            "I LOOOVE this product 😍😍!!! Highly recommended... #awesome",
            "ABSOLUTELY AMAZING SERVICE!!! 😍💯 www.company.com",
            "@brand You guys rock! Keep it up 👏🔥🔥🔥",
            "Thanks @brand for the quick support!!",
            "Amazing food and fast delivery. Loved it! 😍",
            "This is the best experience I've had with this brand!",
            "Top-notch service. You nailed it. 💯",
            "Superb product! Definitely buying again.",
            "Friendly staff and very helpful. Thank you!",
            "Top service — totally worth the price.",
            "I'm so happy with my purchase!",
            "Exceeded my expectations in every way.",
            "Perfect quality and fast shipping.",
            "Love it! Will order more for sure.",
            "Exceptional customer support. Highly satisfied.",
            "This made my day! Absolutely fantastic.",
            "I would recommend this to all my friends.",
            "Five stars! Can't wait to buy again.",
            "Brilliant experience from start to finish.",
            "Couldn't be happier with this product.",

            # Negative (30 examples)
            "Worst. Experience. Ever. Will NEVER buy again!!! 🤮🤬",
            "Totally disappointed. Delivery late, product broken. 😡",
            "Refunded. Not worth the price!!! http://badshop.com",
            "What a disaster. Never again.",
            "Bad quality, poor customer service. 👎",
            "Useless app. Crashes all the time. 😤",
            "Awful experience. Very frustrating.",
            "Terrible support and no refund. 😡",
            "Completely broken on arrival. Waste of money.",
            "Shipping took forever and item was wrong. #fail",
            "Product arrived damaged and unusable.",
            "Did not meet my expectations at all.",
            "Extremely poor packaging and slow delivery.",
            "Very unhappy with the service provided.",
            "This was a complete waste of money.",
            "Not worth the hype, very disappointing.",
            "Bad experience from beginning to end.",
            "The product stopped working within days.",
            "Customer support was rude and unhelpful.",
            "I regret buying this item.",
            "Terrible taste and awful texture.",
            "Never recommending this to anyone.",
            "Completely useless, waste of time.",
            "Unacceptable quality and service.",
            "Extremely dissatisfied with my purchase.",
            "Product doesn't work as advertised.",
            "Very poor build quality.",
            "This ruined my day.",
            "Not happy with the results at all.",
            "Disappointed beyond words.",

            # Neutral (20 examples)
            "meh... it was bad, I guess. kinda boring tho 🙄",
            "just bad. nothing special. 3/10 maybe 🤷‍♂️",
            "Loved the color, but the fit was terrible :(",
            "It's alright.",
            "Kind of liked it, kind of didn't.",
            "Just average, not great, not bad.",
            "Okay experience overall. Nothing stood out.",
            "It worked, but nothing more.",
            "Not sure how I feel about it.",
            "Fine for the price, I guess.",
            "I neither liked nor disliked it.",
            "Average product, does the job.",
            "Nothing remarkable, just okay.",
            "Could be better, could be worse.",
            "Acceptable for what I paid.",
            "Mediocre quality but fair price.",
            "It’s just another product on the market.",
            "No strong feelings one way or another.",
            "Some good, some bad — overall neutral.",
            "Indifferent about this purchase.",

            # Borderline / Tricky (20 examples)
            "I'm not sure how I feel about this product.",
            "It was okay, nothing special.",
            "Could be better, could be worse.",
            "Not bad, but not great either.",
            "Pretty average, nothing memorable.",
            "Sometimes good, sometimes not so much.",
            "I liked some parts, disliked others.",
            "Service was fine, nothing to complain about.",
            "Mediocre experience overall.",
            "Might recommend, but with reservations.",
            "Mixed feelings about this one.",
            "Some aspects were good, some were lacking.",
            "Neutral on this, can’t say more.",
            "Neither impressed nor disappointed.",
            "Fair enough, but expected more.",
            "It's complicated, not easy to judge.",
            "Varied experience, ups and downs.",
            "Hard to say if I liked it or not.",
            "Balanced pros and cons here.",
            "Could go either way depending on mood."
        ],
        "label": [
            # Positive x20
            *["positive"]*20,

            # Negative x30
            *["negative"]*30,

            # Neutral x20
            *["neutral"]*20,

            # Borderline / Tricky x20 (label as neutral)
            *["neutral"]*20
        ]
    }

    base_df = pd.DataFrame(base_data)

    texts = base_df["text"].tolist()
    labels = base_df["label"].tolist()

    emojis = ["😍", "🤮", "🤬", "🙄", "💯", "👏", "🔥", "😡", "🤷‍♂️", "🙂", "😕"]
    hashtags = ["#awesome", "#fail", "#meh", "#happy", "#sad", "#ok"]
    endings = ["!", "!!", "...", ".", ""]

    new_texts = []
    new_labels = []

    for _ in range(n):
        idx = random.randint(0, len(texts) - 1)
        base_text = texts[idx]
        base_label = labels[idx]

        text = base_text

        # 50% chance to add extra emoji
        if random.random() < 0.5:
            text += " " + random.choice(emojis)

        # 30% chance to add hashtag if not already present
        if random.random() < 0.3 and not any(tag in text for tag in hashtags):
            text += " " + random.choice(hashtags)

        # Randomly change ending punctuation
        if text[-1] in ["!", ".", "?"]:
            text = text[:-1] + random.choice(endings)

        new_texts.append(text)
        new_labels.append(base_label)

    df = pd.DataFrame({"text": new_texts, "label": new_labels})
    return df

# Example usage:
df = generate_dataset(100000)
print(df["label"].value_counts())
print(df.head())
