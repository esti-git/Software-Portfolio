# file: api_gemini.py
from fastapi import FastAPI, HTTPException, Query
import requests
import urllib3
import os
from dotenv import load_dotenv
# מבטל אזהרות SSL
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

app = FastAPI()
load_dotenv()
API_KEY = os.getenv("GEMINI_API_KEY")
if not API_KEY:
    print("Error: API_KEY not found. Make sure .env file exists.")

GEMINI_URL = (
    "https://generativelanguage.googleapis.com/v1beta/models/"
    "gemini-2.5-flash:generateContent?key=" + API_KEY
)

def ask_gemini_baking(question: str) -> str:
    payload = {
        "contents": [
            {
                "role": "user",
                "parts": [{"text": question}]
            }
        ],
        "systemInstruction": {
            "parts": [
                {
                    "text": (
                        "אתה עוזר שמספק תשובות **רק** בענייני אפייה או בישול. "
                        "אם השאלה אינה קשורה לאפייה, ענה בנימוס: "
                        "'מצטער, אני יכול לענות רק על שאלות אפייה.'"
                    )
                }
            ]
        }
    }

    try:
        response = requests.post(
            GEMINI_URL,
            json=payload,
            verify=False,  # ⚠️ בסביבת פרודקשן עדיף True
            timeout=30
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"שגיאת חיבור ל-Gemini: {e}")

    if response.status_code != 200:
        raise HTTPException(status_code=500, detail=f"שגיאה מ-Gemini: {response.text}")

    try:
        data = response.json()
        return data["candidates"][0]["content"]["parts"][0]["text"]
    except (KeyError, IndexError):
        raise HTTPException(status_code=500, detail="שגיאה בקריאת הנתונים מה-API")