import re
from nltk.tokenize import PunktSentenceTokenizer
import nltk

nltk.download('punkt')

def better_sentence_splitter(text):
    # Fix glued punctuation by adding space after ., !, or ? if missing
    text = re.sub(r'([.!?])(?=[A-Za-z])', r'\1 ', text)
    # Initialize pretrained PunktSentenceTokenizer
    tokenizer = PunktSentenceTokenizer()
    sentences = tokenizer.tokenize(text)
    return sentences
text = " According to IMDb, the film has a rating of 7.8 out of 10.The lead actor previously starred in a hit sci-fi franchise.In my opinion, this is his best performance yet."
text = better_sentence_splitter(text)
print("the text is : ", text)
