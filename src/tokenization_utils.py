import re
from wordsegment import load, segment

# Load wordsegment once
load()

def tokenize_sentence(sentence):
    # Step 1: Segment merged words (e.g., "amazingsupport" → "amazing support")
    segmented = ' '.join(segment(sentence))
    
    # Step 2: Tokenize (split into lowercase words)
    tokens = re.findall(r'\b\w+\b', segmented.lower())
    print(tokens)
    return tokens
text = "I recently watched the new action movie and honestly, it was thrilling from start to finish. The plot kept me on the edge of my seat, and the acting was top-notch. However, I felt the soundtrack didn’t quite match the intensity of the scenes. The movie was released in May 2023 and runs for approximately 2 hours and 15 minutes. It grossed over $300 million worldwide in its first week. Many critics praised the director for his bold choices, while some audiences thought the pacing was too fast. Personally, I think the cinematography was stunning, especially in the desert scenes. According to IMDb, the film has a rating of 7.8 out of 10.The lead actor previously starred in a hit sci-fi franchise.In my opinion, this is his best performance yet."
tokenize_sentence(text)