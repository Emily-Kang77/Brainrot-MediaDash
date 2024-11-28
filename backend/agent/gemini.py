import os
from dotenv import load_dotenv
from agent import Agent
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate


class Gemini(Agent):
    def __init__(self) -> None:
        if "GOOGLE_API_KEY" not in os.environ:
            try:
                load_dotenv()
            except Exception as e:
                print(f"Error loading .env file: {e}")
                exit(-1)

        assert "GOOGLE_API_KEY" in os.environ, "Google API key not found in environment variables."

        self.llm = ChatGoogleGenerativeAI(
            model="gemini-1.5-flash",
            temperature=0,
            max_tokens=None,
            timeout=None,
            max_retries=2
        )

    def invoke(self,
                input_query: str,
                movie_titles: str,
                top_genre_results: str,
                user_features: str,
                context_history: str) -> str:
        prompt_template = ChatPromptTemplate.from_messages(
            [
                (
                    "system",
                    "You are an intelligent assistant that recommends movies and generates user-specific content feeds based on their preferences and search queries. Use all the provided information carefully to provide personalized results.",
                ),
                (
                    "human",
                    """Analyze the following inputs to generate a personalized movie recommendation list and feedback:

                1. **User Query:** {input_query}
                2. **Search Results for Titles:** {movie_titles}
                    (Include only the most relevant results.)
                3. **Top Results from Genres:** {top_genre_results}
                    (Can be empty if no genre preference is available.)
                4. **User Features from Database:** {user_features}
                    (Includes genres, sentiment, preferences, and search behavior.)
                5. **Context/Chat History:** {context_history}
                    (Include prior discussions or actions for consistency.)

                Respond with:
                - A ranked list of movies or content based on the inputs.
                - Additional recommendations based on trending/popular content (if inputs are insufficient).
                - A brief explanation of why these recommendations were chosen.

                Avoid irrelevant information and focus on delivering concise, helpful outputs tailored to the user."""
                ),
            ]
        )

        chain = prompt_template | self.llm
        result = chain.invoke(
            {
                "input_query": input_query,
                "movie_titles": movie_titles,
                "top_genre_results": top_genre_results,
                "user_features": user_features,
                "context_history": context_history,
            }
        )
        return result.content


if __name__ == "__main__":

    agent = Gemini()
    # Suppress logging warnings
    context = ""
    while True:
        query = input('Enter query: ')
        query = "What are the best movies to watch this weekend?" if query == "" else query
        res = agent.invoke(
            query,
            "The Shawshank Redemption, The Dark Knight, Inception",
            "None",
            "None",
            context
        )
        print(res)
        context += "\n" + query + "\n" + res
        breakpoint()
