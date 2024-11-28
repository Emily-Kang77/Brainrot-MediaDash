from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

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


@app.get("/")
def read_root():
    return {"message": "Hello, World!"}