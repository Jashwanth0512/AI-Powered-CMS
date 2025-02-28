import openai
import spacy
from elasticsearch import Elasticsearch
import os

nlp = spacy.load("en_core_web_sm")
es = Elasticsearch([{"host": "localhost", "port": 9200}])

def generate_ai_content(prompt: str) -> str:
    """Generate content using OpenAI GPT model."""
    openai.api_key = os.getenv("OPENAI_API_KEY")

    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[{"role": "system", "content": "Generate high-quality, engaging content."},
                  {"role": "user", "content": prompt}]
    )
    
    return response["choices"][0]["message"]["content"].strip()

def analyze_text_sentiment(text: str) -> str:
    """Perform sentiment analysis using spaCy."""
    doc = nlp(text)
    sentiment_score = doc._.polarity  # Using custom sentiment extension
    return "Positive" if sentiment_score > 0 else "Negative" if sentiment_score < 0 else "Neutral"

def search_content(query: str):
    """Optimized content search using Elasticsearch."""
    body = {"query": {"match": {"text": query}}}
    res = es.search(index="cms_content", body=body, size=5)  # Limit to 5 results
    return [hit["_source"] for hit in res["hits"]["hits"]]
