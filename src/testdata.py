import pandas as pd

def get_data():
    data = {
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
    df = pd.DataFrame(data)
    return df
