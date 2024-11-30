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

# HTTP Methods
@app.get("/")
def read_root():
    return {"message": "Hello, World!"}

@app.post("/user_query")
async def user_query(query: Query):
    user_query = query.query

    if not user_query.strip():
        raise HTTPException(status_code=400, detail="Query cannot be empty")

    user_data = {
        "query": user_query,
        "genre": "Action",
        "mood_keywords": "exciting",
        "previous_titles": "Mad Max",
        "subscriptions": ["Netflix", "Hulu"]
    }

    user_id = "12345"
    res = preprocess_search(user_data)
    res = parse_recommendations(res)

    return res