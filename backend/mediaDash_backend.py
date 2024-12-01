import google.generativeai as genai
import pandas as pd
import os
import tmdbsimple as tmdb
from dotenv import load_dotenv
from imdb import IMDb
import time

# Configure the API
load_dotenv()
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))
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
    st = time.time()
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
    et = time.time()
    print(f"Time taken to process TMDb data: {et-st}")
    return tmdb_results

def get_imdb_results(keywords):
    return ["" for _ in range(50)]
    st = time.time()
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
    et = time.time()
    print(f"Time taken to process IMDb data: {et-st}")
    return imdb_results

def process_local_gzip_tsv(file_path):
    if not os.path.exists(file_path):
        raise FileNotFoundError(f"The file {file_path} does not exist. Please download the IMDb datasets first.")

    with gzip.open(file_path, 'rb') as gz_file:
        with TextIOWrapper(gz_file, encoding='utf-8') as text_file:
            reader = csv.reader(text_file, delimiter='\t')
            next(reader)  # Skip header
            return list(reader)

def generate_recommendations(genre, mood_keywords, search_query, previous_titles, tmdb_results, imdb_results):
    model = genai.GenerativeModel('gemini-pro')

    prompt = f"""
    You are a movie recommendation assistant. Your task is to analyze the provided data and generate recommendations.
    
    INPUT DATA:
    - Genre: {genre}
    - Mood keywords: {mood_keywords}
    - Search query: {search_query}
    - Previously enjoyed titles: {previous_titles}
    - TMDb results: {tmdb_results}
    - IMDb results: {imdb_results}

    REQUIREMENTS:
    1. Provide EXACTLY 5 recommendations from the given results
    2. Each recommendation MUST include ALL of the following fields:
       - Title (exact match from TMDb/IMDb results)
       - Creator/Director (research required)
       - Streaming Platform (ONLY include if available on streaming)
       - Ratings (numerical value)
       - Detailed explanation of recommendation

    STRICT FORMAT:
    For each recommendation, use this exact format:
    ## Title: <movie_title>
    ## Creator: <director_name>
    ## Platform: <platform_name>
    ## Ratings: <rating>
    ## Recommendation: <explanation>

    IMPORTANT RULES:
    - DO NOT recommend any titles listed in previously enjoyed titles
    - ONLY include movies available on streaming platforms
    - MUST include creator/director information
    - Each explanation should reference user preferences
    - Use TMDb results as primary source
    """

    response = model.generate_content(prompt)
    return response.text

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