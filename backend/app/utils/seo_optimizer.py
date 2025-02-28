import spacy
import textstat
from collections import Counter

nlp = spacy.load("en_core_web_sm")

def optimize_content_for_seo(text: str) -> dict:
    """Optimize content for SEO using AI-based analysis."""
    
    doc = nlp(text)

    # Extract important keywords
    keywords = [token.text.lower() for token in doc if token.is_alpha and not token.is_stop]
    keyword_freq = Counter(keywords)

    # Readability score using Flesch Reading Ease
    readability_score = textstat.flesch_reading_ease(text)

    # Passive voice detection
    passive_phrases = [token.text for token in doc if token.dep_ == "auxpass"]

    # Word complexity score
    complex_words = [token.text for token in doc if textstat.syllable_count(token.text) >= 3]

    # SEO recommendation
    seo_friendly = "Yes" if readability_score > 50 and len(text) > 300 else "No"

    return {
        "keywords": dict(keyword_freq.most_common(10)),
        "readability_score": round(readability_score, 2),
        "passive_phrases": passive_phrases,
        "complex_words": complex_words,
        "seo_friendly": seo_friendly
    }
