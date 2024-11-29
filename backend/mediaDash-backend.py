import sys
import requests
import os
from langchain_google_genai import ChatGoogleGenerativeAI as gemini
from langchain.prompts import PromptTemplate
import pandas as pd
from langchain.chains.llm import LLMChain
from requests.exceptions import RequestException
import tmdbsimple as tmdb
from imdb import IMDb


print("Executing script:", sys.argv)
print("Number arguments: ", len(sys.argv))

os.environ["GOOGLE_API_KEY"] = "AIzaSyCVH3pu8GLqkVWVCC0yIhgY9nFZq5zn2pA"
tmdb.API_KEY = "a3e67ba311db7f67fe03dd5fa48f61bc"


def parse_csv(csv_file_path):
    df = pd.read_csv(csv_file_path)
    user_data = df.iloc[0].to_dict()
    return user_data

def get_scraping_instructions():
    user_input = input("Enter keywords for movie recommendations (comma-separated): ")
    keywords = user_input.strip()

    search = tmdb.Search()
    ia = IMDb()

    tmdb_results = []
    imdb_results = []
    #api_count = 0

    try:
        # TMDb search
        response = search.movie(query=keywords)
        print(f"TMDb API call made for: '{keywords}'")
        #api_count += 1
        #print(f"API calls: {api_count}")

        for movie in search.results:
            tmdb_results.append({
                "title": movie.get("title", "No title available"),
                "id": movie.get("id", "No ID available"),
                "release_date": movie.get("release_date", "No release date available"),
                "overview": movie.get("overview", "No overview available"),
                "popularity": movie.get("popularity", 0)
            })

        # IMDb search
        imdb_movies = ia.search_movie(keywords)
        print(f"IMDb API call made for: '{keywords}'")
        #api_count += 1
        #print(f"API calls: {api_count}")

        for movie in imdb_movies:
            imdb_movie = ia.get_movie(movie.movieID)
            imdb_results.append({
                "title": imdb_movie.get('title', "No title available"),
                "id": imdb_movie.get('imdbID', "No ID available"),
                "release_date": imdb_movie.get('year', "No release date available"),
                "overview": imdb_movie.get('plot outline', "No overview available"),
                "popularity": imdb_movie.get('rating', 0)
            })

    except Exception as e:
        print(f"Error searching for keyword '{keywords}': {str(e)}")

    # Sort results by popularity for each source
    tmdb_results.sort(key=lambda x: x.get("popularity", 0), reverse=True)
    imdb_results.sort(key=lambda x: x.get("popularity", 0), reverse=True)

    return tmdb_results[:50], imdb_results[:50]  # Return top 2 results from each source


# llm call to pass the scraped data and make a recommendation
def generate_recommendations(user_data, tmdb_results, imdb_results):
    llm = gemini(model="gemini-pro", temperature=0.7)

    prompt = PromptTemplate.from_template(
        """
    Based on the user's preferences and the scraped data, provide personalized media recommendations:
    
    User preferences:
    Keywords: {keywords}
    
    TMDb results:
    {tmdb_results}
    
    IMDb results:
    {imdb_results}
    
    Provide 3-5 recommendations from the given results, explaining why each is suitable based on the user's keywords. 
    Consider both TMDb and IMDb results when making recommendations.
    For each recommendation, include the title, release date, and a brief explanation of why it's recommended.
    """
    )

    chain = LLMChain(llm=llm, prompt=prompt)
    response = chain.invoke({
        "keywords": user_data,
        "tmdb_results": str(tmdb_results),
        "imdb_results": str(imdb_results)
    })
    return response["text"]

def main():
    print("Starting MediaDash recommendation system...")
    while True:
        user_input = input("Enter keywords on your current mood: ")
        tmdb_recommendations, imdb_recommendations = get_scraping_instructions()
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
    if not tmdb.API_KEY:
        print("Error: TMDB_API_KEY environment variable is not set.")
        exit(1)

    main()
