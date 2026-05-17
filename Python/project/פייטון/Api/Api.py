from fastapi import FastAPI, HTTPException, Query
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware # ייבוא התוסף לתיקון השגיאה
from Recipe import Recipe

import uvicorn
from gemeni import *
import sys
import os

# מוסיף את תיקיית האב 'פייטון' לנתיבי החיפוש
current_dir = os.path.dirname(os.path.abspath(__file__))
parent_dir = os.path.dirname(current_dir)
sys.path.append(parent_dir)

from Connection.Connection import *
app = FastAPI(title="Recipes API")

app.mount(
    "/images",
    StaticFiles(directory="images"),
    name="images"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # מאפשר לכל מקור (כולל קבצים מקומיים) לגשת לשרת
    allow_credentials=True,
    allow_methods=["*"], # מאפשר את כל סוגי הבקשות (GET, POST, וכו')
    allow_headers=["*"], # מאפשר את כל סוגי הכותרות
)

 #קבלת כל שמות המוצרים
@app.get('/recipes')
def all_recipes():
    try:
        return get_all_recipes_names()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch recipes: {e}")


#קבלת פרטי מתכון מסויים
@app.get('/recipes/{recipe_code}')
def recipe_by_recipe_code(recipe_code:int):
    try:
        recipe = get_all_recipes_details(recipe_code)
        if recipe:
            return recipe
        raise HTTPException(status_code=404, detail="Recipe not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving recipe: {e}")


#קבלת  כל המתכונים השייכים לקטגוריה
@app.get('/recipes/category/{category_code}')

def recipes_by_category(category_code:int):
    try:
        return get_by_categoryCode(category_code)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving recipes by category: {e}")


#הוספת מתכון
@app.post("/recipes")
def create_new_recipe(recipe: Recipe):
    add_recipe(
        recipe.Name,
        recipe.ImageUrl,
        recipe.ingredients,
        recipe.instructions,
        recipe.CategoryCode
    )
    return {"message": "Recipe added successfully"}
#עדכון מתכון
@app.put("/recipes/{recipe_code}")
def edit_recipe(recipe_code: int, recipe: Recipe):
    try:
        update_recipe(recipe_code, recipe.Name, recipe.ingredients, recipe.instructions, recipe.CategoryCode)
        return {"message": "Recipe update successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error updating recipe: {e}")


#מחיקת מתכון
@app.delete("/recipes/{recipe_code}")
def remove_recipe(recipe_code: int):
    try:
        delete_recipe(recipe_code)
        return {"message": "Recipe deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error deleting recipe: {e}")



@app.get("/ask")
def ask(question: str = Query(..., description="שאלה בענייני אפייה")):
    """
    מקבל שאלה מהמשתמש ומחזיר תשובה מ-Gemini.
    """
    return {"question": question, "answer": ask_gemini_baking(question)}


if __name__ == '__main__':

    uvicorn.run(app,host='127.0.0.1', port=8002)