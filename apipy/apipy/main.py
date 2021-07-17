from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from .routers import items, user

app = FastAPI()

# set routers
app.include_router(items.router)
app.include_router(user.router)

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
    the_items = items.fake_items
    the_items.append(items.Item(item_id=4, name="paco"))
    return {
        'title': 'Welcome to Quizzos with FastApi'
    }