import sys
import os
from langchain_google_genai import ChatGoogleGenerativeAI as gemini
from langchain.prompts import PromptTemplate
import pandas as pd
from langchain.chains.llm import LLMChain
import requests
import csv
from io import TextIOWrapper
import gzip
import tmdbsimple as tmdb
from dotenv import load_dotenv
from imdb import IMDb
from dotenv import load_dotenv

load_dotenv()

GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
TMDB_API_KEY = os.getenv("TMDB_API_KEY")
tmdb.API_KEY = TMDB_API_KEY
print(os.getcwd())

def parse_csv(csv_file_path):
    df = pd.read_csv(csv_file_path)
    user_data = df.iloc[0].to_dict()
    return user_data

def get_scraping_instructions(keywords):
    tmdb_results = get_tmdb_results(keywords)
    imdb_results = get_imdb_results(keywords)
    return tmdb_results[:50], imdb_results[:50]

def get_tmdb_results(keywords):
    search = tmdb.Search()
    tmdb_results = []

    try:
        response = search.movie(query=keywords)
        print(f"TMDb API call made for: '{keywords}'")

        for movie in search.results:
            tmdb_results.append({
                "title": movie.get("title", "No title available"),
                "id": movie.get("id", "No ID available"),
                "release_date": movie.get("release_date", "No release date available"),
                "overview": movie.get("overview", "No overview available"),
                "popularity": movie.get("popularity", 0)
            })
    except Exception as e:
        print(f"Error searching TMDb for keyword '{keywords}': {str(e)}")

    tmdb_results.sort(key=lambda x: x.get("popularity", 0), reverse=True)
    return tmdb_results

def get_imdb_results(keywords):
    imdb_results = []
    
    title_basics_path = "title.basics.tsv.gz"
    title_ratings_path = "title.ratings.tsv.gz"

    try:
        # Process title basics
        basics_data = process_local_gzip_tsv(title_basics_path)
        
        # Process title ratings
        ratings_data = process_local_gzip_tsv(title_ratings_path)
        
        # Create a dictionary of ratings
        ratings_dict = {row[0]: float(row[1]) for row in ratings_data if row[0] != 'tconst'}

        # Process the basics data and combine with ratings
        for row in basics_data:
            if keywords.lower() in row[2].lower():
                imdb_id = row[0]
                imdb_results.append({
                    "title": row[2],
                    "id": imdb_id,
                    "release_date": row[5],
                    "overview": row[7],
                    "popularity": ratings_dict.get(imdb_id, 0)
                })

        print(f"IMDb data processed for: '{keywords}'")
    except Exception as e:
        print(f"Error processing IMDb data for keyword '{keywords}': {str(e)}")

    imdb_results.sort(key=lambda x: x.get("popularity", 0), reverse=True)
    return imdb_results

def process_local_gzip_tsv(file_path):
    if not os.path.exists(file_path):
        raise FileNotFoundError(f"The file {file_path} does not exist. Please download the IMDb datasets first.")
    
    with gzip.open(file_path, 'rb') as gz_file:
        with TextIOWrapper(gz_file, encoding='utf-8') as text_file:
            reader = csv.reader(text_file, delimiter='\t')
            next(reader)  # Skip header
            return list(reader)

# llm call to pass the scraped data and make a recommendation
def generate_recommendations(genre, mood_keywords, search_query, previous_titles, tmdb_results, imdb_results):
    llm = gemini(model="gemini-pro", temperature=0.7)

    prompt = PromptTemplate.from_template(
    """
    Based on the search query, the user's mood, their desired genre, and the scraped data, provide personalized media recommendations:

    User preferences:
    Genre: {genre}
    Mood keywords: {mood_keywords}
    Search query: {search_query}
    Previously enjoyed titles: {previous_titles}

    TMDb results:
    {tmdb_results}

    IMDb results:
    {imdb_results}

    Provide 3-5 recommendations from the given results, explaining why each is suitable based on the user's preferences.
    Consider both TMDb and IMDb results when making recommendations.
    For each recommendation, include the title, release date, and a brief explanation of why it's recommended.
    Do NOT recommend any titles listed in the previously enjoyed titles, but you can use them to suggest similar content.
    """
    )

    chain = LLMChain(llm=llm, prompt=prompt)
    response = chain.invoke({
        "genre": genre,
        "mood_keywords": mood_keywords,
        "search_query": search_query,
        "previous_titles": previous_titles,
        "tmdb_results": str(tmdb_results),
        "imdb_results": str(imdb_results)
    })
    return response["text"]

def LLMRecommendations(temp_csv_path):
    user_data = parse_csv(temp_csv_path)

    #parse csv data
    genre = user_data.get("genre", "")
    mood_keywords = user_data.get("mood_keywords", "")
    search_query = user_data.get("search_query", "")
    previous_titles = user_data.get("previous_titles","")

    tmdb_results, imdb_results = get_scraping_instructions(genre)

    recommendations = generate_recommendations(
            genre,
            mood_keywords,
            search_query,
            previous_titles,
            tmdb_results,
            imdb_results
        )
    return recommendations

"""
def main():
    print("Starting MediaDash recommendation system...")
    while True:
        user_input = input("Enter keywords on your current mood: ")
        tmdb_recommendations, imdb_recommendations = get_scraping_instructions(user_input)
        '''
        print("TMDb Recommendations:")
        for movie in tmdb_recommendations:
            print(f"- {movie['title']} ({movie['release_date']})")

        print("\nIMDb Recommendations:")
        for movie in imdb_recommendations:
            print(f"- {movie['title']} ({movie['release_date']})")
        '''
        recommendations = generate_recommendations(user_input, tmdb_recommendations, imdb_recommendations)
        print("\nRecommendations based on your keywords:")
        print(recommendations)
        
        another = input(
            "\nWould you like to search for more movies? (yes/no): "
        ).lower()
        if another != "yes":
            break

    print("Thank you for using the Movie Recommendation System!")


if __name__ == "__main__":
    # Ensure the API key is set
    if not :
        print("Error: TMDB_API_KEY environment variable is not set.")
        exit(1)

    main()
"""