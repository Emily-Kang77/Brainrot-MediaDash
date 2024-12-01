import google.generativeai as genai
from mediaDash_backend import LLMRecommendations
import pandas as pd
import os
import re
import json
from dotenv import load_dotenv
from response_body_parser import parse_recommendations


def generate_search_queries(user_preferences):
    """
    Generate multiple search queries based on user preferences using Gemini AI.
    """
    genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))
    model = genai.GenerativeModel('gemini-pro')

    prompt = f"""
    You are a search query generator. Your task is to create optimized search queries based on user preferences.

    INPUT DATA:
    - Genre: {user_preferences['genre']}
    - Mood keywords: {user_preferences['mood_keywords']}
    - Previously enjoyed titles: {user_preferences['previous_titles']}
    - subscriptions: {user_preferences['subscriptions']}

    REQUIREMENTS:
    1. Generate EXACTLY 4 unique search queries
    2. Each query should focus on different aspects of user preferences
    3. Queries should be optimized for media content search

    RESPONSE FORMAT:
    You MUST respond in valid JSON format as follows:
    ```json
    [
        "query1",
        "query2",
        "query3",
        "query4"
    ]
    ```

    IMPORTANT:
    - Return ONLY the JSON array
    - Each query must be a string
    - Do not include explanations or additional text
    """

    response = model.generate_content(prompt)

    try:
        queries = json.loads(response.text.strip('```json').strip('```'))
        return queries if isinstance(queries, list) else []
    except json.JSONDecodeError:
        return []

def process_search_results(queries_results, previous_titles=[]):
    """
    Process and combine results from multiple search queries.
    """
    genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))
    model = genai.GenerativeModel('gemini-pro')

    prompt = f"""
    You are a recommendation analyzer. Your task is to combine and refine multiple search results.

    INPUT DATA:
    - Search Results: {queries_results}
    - Previous Titles to Exclude: {previous_titles}

    REQUIREMENTS:
    1. Analyze all search results
    2. Remove duplicate recommendations
    3. Exclude all previously watched titles
    4. Rank by relevance to user preferences

    RESPONSE FORMAT:
    You MUST format each recommendation as follows:
    ## Title: <movie_title>
    ## Creator: <director_name>
    ## Platform: <platform_name>
    ## Ratings: <rating>
    ## Recommendation: <explanation>
    ## Poster Path: <poster_path>

    IMPORTANT:
    - Each recommendation must include ALL required fields
    - Explanations must reference user preferences
    - Only include available streaming content
    """

    response = model.generate_content(prompt)
    return response.text

def preprocess_search(user_data):
    """
    Main function to preprocess search using multiple AI-generated queries.
    """


    # generate multiple search queries w Gemini
    # Temporaryly commented
    # search_queries = generate_search_queries(user_data)
    search_queries = [user_data['query']]
    res = []

    for query in search_queries:
        # query_data = pd.DataFrame([{
        #     "search_query": query,
        #     "genre": user_data["genre"],
        #     "mood_keywords": user_data["mood_keywords"],
        #     "previous_titles": user_data["previous_titles"],
        #     "subscriptions": user_data.get("subscriptions", "")
        # }])


        query_data = {
            "search_query": query,
            "genre": user_data["genre"],
            "mood_keywords": user_data["mood_keywords"],
            "previous_titles": user_data["previous_titles"],
            "subscriptions": user_data.get("subscriptions", "")
        }



        # query_data.to_csv(temp_csv_path, index=False)
        tempRec = LLMRecommendations(query_data)
        res.append({"query": query, "results": tempRec})
        # os.remove(temp_csv_path)

    finalrec = process_search_results(res, user_data["previous_titles"])
    # print(send_recommendations_to_supabase(user_id, finalrec))

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
        "query": "Funny movie with Liam neeson",
        "genre": "Action",
        "mood_keywords": "exciting",
        "previous_titles": "Mad Max",
        "subscriptions": ["Netflix", "Hulu"]
    }

    user_id = "12345"
    res = preprocess_search(user_data)
    res = parse_recommendations(res)
    print(res)