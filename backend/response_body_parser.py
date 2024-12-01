import os
import json
from dotenv import load_dotenv
import google.generativeai as genai

def parse_recommendations(recommendation_text: str) -> dict:
    assert "GOOGLE_API_KEY" in os.environ, "Google API key not found in environment variables."
    
    # Configure the API
    genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))
    model = genai.GenerativeModel('gemini-1.5-pro')

    prompt = """
    You are a JSON parser assistant. Your task is to convert recommendation text into structured JSON.

    STRICT JSON SCHEMA:
    {
        "type": "array",
        "items": {
            "type": "object",
            "required": ["Title", "Reason", "Creator", "Platform", "Ratings"],
            "properties": {
                "Title": {"type": "string"},
                "Reason": {"type": "string"},
                "Creator": {"type": "string"},
                "Platform": {"type": "string"},
                "Ratings": {"type": "number", "nullable": true}
            }
        }
    }

    REQUIREMENTS:
    1. Parse the input text into a JSON array
    2. Each recommendation MUST include ALL required fields
    3. Follow the exact property names and types
    4. Return ONLY valid JSON

    EXAMPLE OUTPUT:
    [
        {
            "Title": "Movie Name",
            "Reason": "Detailed explanation why this movie matches preferences",
            "Creator": "Director Name",
            "Platform": "Streaming Service",
            "Ratings": 8.5
        }
    ]

    INPUT TEXT TO PARSE:
    """ + recommendation_text + """

    IMPORTANT RULES:
    - Respond ONLY with valid JSON
    - Include ALL required fields
    - Maintain exact property names
    - No additional text or explanations
    """

    response = model.generate_content(
        prompt,
        generation_config={"temperature": 0.2}
    )

    result = response.text.strip()
    # Clean up the response if it contains markdown formatting
    result = (
        result.strip("```json")
        .strip("```")
        .strip()
    )
    
    return json.loads(result)

