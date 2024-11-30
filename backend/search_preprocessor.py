from langchain_google_genai import ChatGoogleGenerativeAI as gemini
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
from mediaDash_backend import LLMRecommendations
from supabase import create_client
import pandas as pd
import os
import re
import json
from dotenv import load_dotenv


def generate_search_queries(user_preferences):
    """
    Generate multiple search queries based on user preferences using Gemini AI.
    """
    llm = gemini(model="gemini-pro", temperature=0.7)

    prompt = PromptTemplate.from_template("""
    Based on the user's preferences, generate 4 different search queries that would help find relevant media content.
    Consider different aspects and combinations of their preferences.

    User preferences:
    Genre: {genre}
    Mood keywords: {mood_keywords}
    Previously enjoyed titles: {previous_titles}
    Subscriptions: {subscriptions}

    Return the queries as a JSON array of strings, each query optimized for finding relevant content.
    Focus on variety while maintaining relevance to the user's interests.
    """)

    chain = LLMChain(llm=llm, prompt=prompt)
    response = chain.invoke(user_preferences)

    try:
        queries = json.loads(response['text'].strip('```json').strip('```'))
        return queries if isinstance(queries, list) else []
    except json.JSONDecodeError:
        return []

def process_search_results(queries_results, previous_titles=[]):
    """
    Process and combine results from multiple search queries.
    """
    llm = gemini(model="gemini-pro", temperature=0.7)

    prompt = PromptTemplate.from_template("""
    Analyze and combine the results from multiple search queries to provide a refined set of recommendations.
    Remove duplicates and rank the results based on relevance.

    Search Results from Multiple Queries:
    {queries_results}

    Previous Recommendations to Exclude:
    {previous_titles}

    Provide a consolidated list of the most relevant unique recommendations, excluding previously watched titles.
    Explain why each recommendation was selected and how it matches the user's preferences.
    """)

    chain = LLMChain(llm=llm, prompt=prompt)
    response = chain.invoke({"queries_results": str(queries_results), "previous_titles": str(previous_titles)})
    return response['text']
def preprocess_search(user_data):
    """
    Main function to preprocess search using multiple AI-generated queries.
    """


    # generate multiple search queries w Gemini
    search_queries = generate_search_queries(user_data)
    res = []

    for query in search_queries:
        query_data = pd.DataFrame([{
            "search_query": query,
            "genre": user_data["genre"],
            "mood_keywords": user_data["mood_keywords"],
            "previous_titles": user_data["previous_titles"],
            "subscriptions": user_data.get("subscriptions", "")
        }])

        temp_csv_path = "temp_query.csv"
        query_data.to_csv(temp_csv_path, index=False)
        tempRec = LLMRecommendations(temp_csv_path)
        res.append({"query": query, "results": tempRec})
        os.remove(temp_csv_path)

    finalrec = process_search_results(res, user_data["previous_titles"])
    print(send_recommendations_to_supabase(user_id, finalrec))

    return finalrec

def extract_titles(recommendation_text):
    # This regex pattern assumes titles are in quotes or after a colon
    pattern = r'"([^"]*)"|\d+\.\s*([^:]+):'
    matches = re.findall(pattern, recommendation_text)
    titles = [match[0] or match[1] for match in matches if match[0] or match[1]]
    return titles

def send_recommendations_to_supabase(user_id, recommendation_text):
    # Extract titles from the recommendation
    titles = extract_titles(recommendation_text)

    # Prepare data for Supabase
    data = {
        "user_id": user_id,
        "previous_titles": titles
    }

    # Initialize Supabase client
    url = "YOUR_SUPABASE_URL"
    key = "YOUR_SUPABASE_KEY"
    supabase = create_client(url, key)

    # Insert data into Supabase
    response = supabase.table("mediaDash_user_data").insert(data).execute()

    return response


if __name__ == "__main__":
    load_dotenv()
    user_data = {
        "genre": "Action",
        "mood_keywords": "exciting",
        "previous_titles": "Mad Max",
        "subscriptions": ["Netflix", "Hulu"]
    }

    user_id = "12345"
    preprocess_search(user_data)