from fastapi import APIRouter
from pydantic import BaseModel


# list of fake items
class Item(BaseModel):
    item_id: int
    name: str


item_one = Item(item_id=0, name="ones")
item_two = Item(item_id=1, name="twow")
item_three = Item(item_id=2, name="threes")
item_four = Item(item_id=3, name="foursasd")
fake_items = [item_one, item_two, item_three, item_four]


class Question(BaseModel):
    name: str
    question: str
    answer: str


router = APIRouter(
    prefix="/items",
    tags=["items"],
)


@router.get("/")
async def read_items() -> []:
    return {
        "item_list": fake_items
    }


@router.get("/{item_id}")
async def read_item(item_id: int):
    return fake_items[item_id]
