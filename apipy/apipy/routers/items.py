from fastapi import APIRouter
from pydantic import BaseModel


router = APIRouter(
    prefix="/quizzes",
    tags=["quizzes"],
)


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


question_one = Question(name="question one", question="what color?", answer="blue")
question_two = Question(name="question two", question="Reallz?", answer="green")
fake_question_list = [question_one, question_two]
fake_question_list_two = [question_one, Question(name="asdas", question="tu the", answer="I dont know")]

fake_list_of_quizzes = {"name": "first_quiz", "quiz_questions": fake_question_list}
fake_list_of_quizzes_two = {"name": "second_quiz", "quiz_questions": fake_question_list_two}


@router.get("/")
async def read_items() -> []:
    return {
        "name": "name",
        "quiz_list": [fake_list_of_quizzes, fake_list_of_quizzes_two]
    }


@router.get("/{item_id}")
async def read_item(item_id: int):
    return fake_items[item_id]
