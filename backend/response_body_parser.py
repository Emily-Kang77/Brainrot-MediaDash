import os
import json
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
from pydantic import BaseModel

def parse_recommendations(recommendation_text: str) -> dict:
    assert "GOOGLE_API_KEY" in os.environ, "Google API key not found in environment variables."
    llm = ChatGoogleGenerativeAI(
        model="gemini-1.5-pro",
        temperature=0.2,
        max_tokens=None,
        timeout=None,
        max_retries=2,
    )

    prompt_template = ChatPromptTemplate.from_messages(
        [
            (
                "system",
                "You are an expert who parses recommendations into the requested JSON format. Respond in the following JSON format:",
            ),
            (
                "human",
                """
                ### Task:
                Parse the given raw text into a JSON array of movie recommendations. Use the following JSON format for reference:
                Make sure you find the respective JSON keys for each movie recommendation.
                The JSON keys are: Title, Reason, Creator, Platform - All of which exist in the given raw text.

                The key "Reason" has its description in the "Recommendation" or "Explanation" section of the raw text.
                [
                    {{
                        "Title": "Justice League Action",
                        "Reason": "This animated series aligns with the user's preference for action movies with thrilling car chases and explosions, showcasing exciting adventures with iconic DC superheroes.",
                        "Creator": "Sam Register",
                        'Platform': "Amazon Prime Video",
                        "Ratings": null
                    }},
                    {{
                        "Title": "Missing in Action",
                        "Reason": "This classic action film meets the user's desire for adrenaline-pumping action thrillers with intense fight scenes, featuring a former POW on a mission to rescue American prisoners of war.",
                        "Creator": "Joseph Zito",
                        'Platform': "HBO Max",
                        "Ratings": null
                    }}
                ]

                ### Input:
                {user_query}

                ### Output:
                Respond only in a JSON array. Keep to very strict JSON formating.
                """
            ),
        ]
    )

    chain = prompt_template | llm
    result = chain.invoke(
        {
            "user_query": recommendation_text
        }
    )
    print(result.content)
    result = (
        result.content.strip("'```json\\n")  # Remove leading markdown formatting
        .strip("\\n```\\n")  # Remove trailing markdown formatting
        .replace("\\n", "\n")  # Replace escaped newlines with actual newlines
        .replace("\\\"", "\"")  # Replace escaped quotes with proper double quotes
        .replace("\\'", "'")  # Fix single-quote escape issues
        .replace("\\", "")  # Remove redundant backslashes
    )
    result = json.loads(result)

    return result


