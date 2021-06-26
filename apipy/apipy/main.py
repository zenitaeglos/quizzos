from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# cors descriptions
origins = [
    'http://localhost',
    'http://localhost:8104',
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get('/')
async def main_page():
    return {
        'title': 'Welcome to Quizzos'
    }