from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from search_preprocessor import preprocess_search
from response_body_parser import parse_recommendations


'''
This is the Backend Entry Point
1. Contains HTTP Methods for each of the frontend calls
2. Do not store anything other than what the HTTP methods need
'''

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request Bodies
class Query(BaseModel):
    user_id: str
    query: str
    genre: str | None = None
    mood_keywords: str | None = None
    previous_titles: str | None = None
    platforms: list[str] | None = None

# HTTP Methods
@app.get("/")
def read_root():
    return {"message": "Hello, World!"}

@app.post("/user_query")
async def user_query(query: Query) -> list[dict]:
    user_query = query.query

    if not user_query.strip():
        raise HTTPException(status_code=400, detail="Query cannot be empty")

    user_data = {
        "user_id": query.user_id,
        "query": query.query,
        "genre": query.genre or "",
        "mood_keywords": query.mood_keywords or "",
        "previous_titles": query.previous_titles or "",
        "platforms": query.platforms or []
    }
    res = preprocess_search(user_data)
    res = parse_recommendations(res)

    return res