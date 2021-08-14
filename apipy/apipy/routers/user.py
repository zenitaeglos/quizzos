from fastapi import APIRouter, Depends
from fastapi.security import OAuth2PasswordRequestForm

router = APIRouter(
    prefix='/user',
    tags=["user"]
)

fake_db_user = {
    'first_user': {
        'username': 'john',
        'full_name': 'John Doe',
        'email': '123@mail.com',
        'hashed_password': 'fakesecret',
        'disabled': False
    }
}


@router.post('/token')
async def logino(form_data: OAuth2PasswordRequestForm = Depends()):
    print(form_data)
    print(form_data.username)
    if form_data.username == 'first_user':
        return {
            'access_token': 'que pasa paco'
        }
    return {
        'access_token': 'nothing',
        'token_type': 'bearer'
    }


@router.post('/login')
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    print(form_data)
    print("calling login")
    print(form_data.username)
    print(form_data.password)
    if form_data.username == "duck" and form_data.password == "dock":
        return {
            'token': '123',
            'login': 'succesfull'
        }
    return {
        'token': '123',
        'as': 'asd'
    }