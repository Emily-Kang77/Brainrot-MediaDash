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
                "You are a helpful assistant that provides recommendations. Respond in the following JSON format:",
            ),
            (
                "human",
                """
                [
                    {{
                        "Title": "Justice League Action",
                        "Reason": "This animated series aligns with the user's preference for action movies with thrilling car chases and explosions, showcasing exciting adventures with iconic DC superheroes."
                    }},
                    {{
                        "Title": "Missing in Action",
                        "Reason": "This classic action film meets the user's desire for adrenaline-pumping action thrillers with intense fight scenes, featuring a former POW on a mission to rescue American prisoners of war."
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

