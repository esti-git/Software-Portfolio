
from pydantic import BaseModel
class Recipe(BaseModel):

    Name: str
    ImageUrl: str
    ingredients: str
    instructions: str
    CategoryCode: int