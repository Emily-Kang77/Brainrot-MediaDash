import sys
import requests
from bs4 import BeautifulSoup as bsp
import os
from langchain_google_genai import ChatGoogleGenerativeAI as gemini
from langchain.prompts import PromptTemplate
import pandas as pd
from langchain.chains.llm import LLMChain
from requests.exceptions import RequestException


print("Executing script:", sys.argv)
print("Number arguments: ", len(sys.argv))

os.environ["GOOGLE_API_KEY"] = "AIzaSyCVH3pu8GLqkVWVCC0yIhgY9nFZq5zn2pA"


def parse_csv(csv_file_path):
    df = pd.read_csv(csv_file_path)
    user_data = df.iloc[0].to_dict()
    return user_data


# first llm call to get sites i should scrape
def get_scraping_instructions(input_data):
    llm = gemini(model="gemini-pro", temperature=0.7)

    if isinstance(input_data, dict):  # CSV input
        user_data = input_data
    else:  # Command-line input
        user_data = {
            "genre": input("Enter preferred genre: "),
            "mood_keywords": input("Enter mood keywords: "),
            "previous_titles": input(
                "Enter previously enjoyed titles (comma-separated): "
            ),
        }

    prompt = PromptTemplate.from_template(
        """
    Based on the following user preferences, suggest which sources to scrape for media recommendations:
    
    Genre: {genre}
    User's mood keywords: {mood_keywords}
    Previously enjoyed titles: {previous_titles}
    
    Provide your response as a list of websites to scrape (e.g., IMDb, MyAnimeList, Rotten Tomatoes).
    """
    )

    chain = LLMChain(llm=llm, prompt=prompt)
    response = chain.invoke(user_data)
    return response["text"]


"""
def scrape_sources(sources):
    scraped_data = {}
    
    if 'IMDb' in sources:
        imdb_url = 'https://www.imdb.com/search/title/?genres=drama&sort=user_rating,desc'
        response = requests.get(imdb_url)
        soup = bsp(response.text, 'html.parser')
        movies = soup.find_all('div', class_='lister-item-content')
        imdb_movies = []
        for movie in movies[:5]:
            title = movie.h3.a.text
            year = movie.h3.find('span', class_='lister-item-year').text.strip('()')
            rating = movie.find('div', class_='ratings-imdb-rating').strong.text
            imdb_movies.append({'title': title, 'year': year, 'rating': rating})
        scraped_data['IMDb'] = imdb_movies
    
    if 'MyAnimeList' in sources:
        mal_url = 'https://myanimelist.net/anime/genre/1'
        response = requests.get(mal_url)
        soup = bsp(response.text, 'html.parser')
        animes = soup.find_all('div', class_='seasonal-anime js-seasonal-anime')
        mal_animes = []
        for anime in animes[:5]:
            title = anime.find('h2', class_='h2_anime_title').text.strip()
            score = anime.find('span', class_='score').text.strip()
            mal_animes.append({'title': title, 'score': score})
        scraped_data['MyAnimeList'] = mal_animes

    return scraped_data
"""


def scrape_sources(sources):
    scraped_data = {}

    print(f"Attempting to scrape from sources: {sources}")

    if "IMDb" in sources:
        print("Scraping IMDb...")
        imdb_url = (
            "https://www.imdb.com/search/title/?genres=drama&sort=user_rating,desc"
        )
        try:
            response = requests.get(imdb_url, timeout=10)
            response.raise_for_status()
            soup = bsp(response.text, "html.parser")
            movies = soup.find_all("div", class_="lister-item-content")
            imdb_movies = []
            for movie in movies[:5]:
                title = movie.h3.a.text
                year = movie.h3.find("span", class_="lister-item-year").text.strip("()")
                rating = movie.find("div", class_="ratings-imdb-rating")
                rating = rating.strong.text if rating else "N/A"
                imdb_movies.append({"title": title, "year": year, "rating": rating})
            scraped_data["IMDb"] = imdb_movies
            print(f"Successfully scraped {len(imdb_movies)} movies from IMDb")
        except RequestException as e:
            print(f"Error scraping IMDb: {e}")
        except AttributeError as e:
            print(f"Error parsing IMDb data: {e}")

    if "MyAnimeList" in sources:
        print("Scraping MyAnimeList...")
        mal_url = "https://myanimelist.net/topanime.php"
        try:
            response = requests.get(mal_url, timeout=10)
            response.raise_for_status()
            soup = bsp(response.text, "html.parser")
            anime_items = soup.find_all("tr", class_="ranking-list")
            mal_animes = []
            for anime in anime_items[:5]:
                title = anime.find("h3", class_="fl-l fs14 fw-b anime_ranking_h3")
                score = anime.find("span", class_="score-label")
                if title and score:
                    mal_animes.append(
                        {"title": title.text.strip(), "score": score.text.strip()}
                    )
            scraped_data["MyAnimeList"] = mal_animes
            print(f"Successfully scraped {len(mal_animes)} animes from MyAnimeList")
        except RequestException as e:
            print(f"Error scraping MyAnimeList: {e}")
        except AttributeError as e:
            print(f"Error parsing MyAnimeList data: {e}")

    print("\nScraped data summary:")
    for source, data in scraped_data.items():
        print(f"{source}: {len(data)} items")

    print("\nDetailed scraped data:")
    for source, data in scraped_data.items():
        print(f"\n{source}:")
        for item in data:
            print(item)

    return scraped_data


# second llm call to pass the scraped data and make a recommendation
def generate_recommendations(user_data, scraped_data):
    llm = gemini(model="gemini-pro", temperature=0.7)

    prompt = PromptTemplate.from_template(
        """
    Based on the user's preferences and the scraped data, provide personalized media recommendations:
    
    User preferences:
    Genre: {genre}
    Mood keywords: {mood_keywords}
    Previously enjoyed titles: {previous_titles}
    
    Scraped data:
    {scraped_data}
    
    Provide 3-5 recommendations, explaining why each is suitable for the user's mood and preferences.
    Do not recommend titles listed in the previously enjoyed titles.
    """
    )

    chain = LLMChain(llm=llm, prompt=prompt)
    response = chain.invoke({**user_data, "scraped_data": str(scraped_data)})
    return response["text"]


def main():
    print("Starting MediaDash recommendation system...")

    if len(sys.argv) > 1 and sys.argv[1].endswith(".csv"):
        print(f"Using CSV file: {sys.argv[1]}")
        user_data = parse_csv(sys.argv[1])
    else:
        print("No CSV file provided. Please enter your preferences:")
        user_data = {
            "genre": input("Enter preferred genre: "),
            "mood_keywords": input("Enter mood keywords: "),
            "previous_titles": input(
                "Enter previously enjoyed titles (comma-separated): "
            ),
        }

    print("Getting scraping instructions...")
    scraping_instructions = get_scraping_instructions(user_data)
    print(f"Scraping instructions received: {scraping_instructions}")

    sources_to_scrape = scraping_instructions.split(", ")
    print(f"Scraping sources: {sources_to_scrape}")

    scraped_data = scrape_sources(sources_to_scrape)
    if not scraped_data:
        print("No data was scraped. Exiting.")
        return

    print("Generating recommendations...")
    recommendations = generate_recommendations(user_data, scraped_data)
    print("\nHere are your recommendations:")
    print(recommendations)


if __name__ == "__main__":
    main()
    input("Press Enter to exit...")
