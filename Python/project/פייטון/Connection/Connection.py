import pyodbc
import os
from dotenv import load_dotenv

load_dotenv()
def get_connection():
    try:
        conn = pyodbc.connect(
            f'DRIVER={os.getenv("DRIVER")};'
            f'SERVER={os.getenv("SERVER")};'
            f'DATABASE={os.getenv("DB_DATABASE")};'
            'Trusted_Connection=yes;'
            'Encrypt=no;'
        )
        return conn
    except Exception :
        return {"success": False, "message": "חיבור למסד הנתונים נכשל. אנא נסי שוב מאוחר יותר."}


# קבלת כל שמות המתכונים
def get_all_recipes_names():
    try:
        conn = get_connection()
        if isinstance(conn, dict):
            return conn
#cursor הוא האובייקט שמבצע שאילתות SQL
        cursor = conn.cursor()
        cursor.execute("SELECT RecipesCode, Name, ImageUrl FROM recipes")

        recipes = [
            {
                "RecipesCode": row[0],
                "Name": row[1],
                "ImageUrl": row[2]
            }
            for row in cursor.fetchall()
        ]

        cursor.close()
        conn.close()
        return recipes
    except Exception:
        return {"success": False, "message": "שגיאה בשליפת רשימת המתכונים."}

# קבלת פרטי מתכון מסויים
def get_all_recipes_details(recipe_id):
    try:
        conn = get_connection()
        if isinstance(conn, dict):
            return conn

        cursor = conn.cursor()
        cursor.execute("""
            SELECT Name, ImageUrl, ingredients, instructions, CategoryCode
            FROM recipes
            WHERE RecipesCode=?
        """, (recipe_id,))

        row = cursor.fetchone()
        cursor.close()
        conn.close()

        if row:
            return {
                "Name": row[0],
                "ImageUrl": row[1],
                "ingredients": row[2],
                "instructions": row[3],
                "CategoryCode": row[4]
            }
        return None
    except Exception:
        return {"success": False, "message": "שגיאה בשליפת פרטי המתכון."}

# קבלת כל המתכונים השייכים לקטגוריה
def get_by_categoryCode(categoryCode):
    try:
        conn = get_connection()
        cursor = conn.cursor()

        cursor.execute("SELECT Name, ImageUrl, RecipesCode FROM recipes WHERE CategoryCode=?", (categoryCode,))

        recipes = [
            {
                "Name": row[0],
                "ImageUrl": row[1],
                "RecipesCode": row[2]
            }
            for row in cursor.fetchall()
        ]

        cursor.close()
        conn.close()
        return recipes
    except Exception as e:
        print(f"Error: {e}")
        return []

# הוספת מתכון
def add_recipe(name, imageUrl, ingredients, instructions, categoryCode):
    try:
        conn = get_connection()
        if isinstance(conn, dict):
            return conn

        cursor = conn.cursor()
        cursor.execute("""
            INSERT INTO recipes (Name, ImageUrl, ingredients, instructions, CategoryCode)
            VALUES (?, ?, ?, ?, ?)
        """, (name, imageUrl, ingredients, instructions, categoryCode))

        conn.commit()
        cursor.close()
        conn.close()
    except Exception:
        return {"success": False, "message": "שגיאה בהוספת המתכון."}

# עדכון מתכון
def update_recipe(recipesCode, name=None, ingredients=None, instructions=None, category_id=None):
    try:
        conn = get_connection()
        if isinstance(conn, dict):
            return conn
        cursor = conn.cursor()

        updates = []
        params = []

        if name is not None:
            updates.append("Name=?")
            params.append(name)
        if ingredients is not None:
            updates.append("ingredients=?")
            params.append(ingredients)
        if instructions is not None:
            updates.append("instructions=?")
            params.append(instructions)
        if category_id is not None:
            updates.append("CategoryCode=?")
            params.append(category_id)

        if not updates:
            cursor.close()
            conn.close()
            return {"success": False, "message": "אין מה לעדכן."}

        query = "UPDATE recipes SET " + ", ".join(updates) + " WHERE RecipesCode=?"
        params.append(recipesCode)

        cursor.execute(query, tuple(params))
        conn.commit()
        cursor.close()
        conn.close()
        return {"success": True, "message": "המתכון עודכן בהצלחה."}
    except Exception :
        return {"success": False, "message": "שגיאה בעדכון המתכון."}

# מחיקת מתכון
def delete_recipe(recipesCode):
    try:
        conn = get_connection()
        if isinstance(conn, dict):
            return conn
        cursor = conn.cursor()
        cursor.execute("DELETE FROM recipes WHERE RecipesCode=?", (recipesCode,))
        conn.commit()
        cursor.close()
        conn.close()
        return {"success": True, "message": "המתכון נמחק בהצלחה."}
    except Exception :
        return {"success": False, "message": "שגיאה במחיקת המתכון."}
