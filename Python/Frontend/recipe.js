const apiBase = "http://127.0.0.1:8002";

function showSection(id) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.querySelectorAll('.view').forEach(v => v.classList.add('hidden'));
    document.querySelectorAll('.menu button').forEach(b => b.classList.remove('active'));

    document.getElementById(`${id}-section`).classList.remove('hidden');
    const navBtn = document.getElementById(`nav-${id}`);
    if (navBtn) navBtn.classList.add('active');

    if (id === 'recipes') loadAllRecipes();
}

async function loadAllRecipes(categoryCode = "") {
    const list = document.getElementById("recipes-list");
    list.innerHTML = "<p style='padding:40px'>טוען יצירות קולינריות...</p>";

    try {
        let url = categoryCode ? `${apiBase}/recipes/category/${categoryCode}` : `${apiBase}/recipes`;
        const res = await fetch(url);
        const data = await res.json();
        list.innerHTML = "";

        if (!data || data.length === 0) {
            list.innerHTML = "<p style='padding:40px'>לא נמצאו מתכונים בקטגוריה זו</p>";
            return;
        }

        data.forEach(r => {
            const div = document.createElement("div");
            div.className = "recipe-item";
            const imgPath = r.ImageUrl.startsWith('http') ? r.ImageUrl : `${apiBase}${r.ImageUrl}`;
            
            div.innerHTML = `
                <div class="recipe-img"><img src="${imgPath}" alt="${r.Name}"></div>
                <div class="recipe-info">
                    <p>#RECIPE_${r.RecipesCode}</p>
                    <h3>${r.Name}</h3>
                    <p>לחץ לצפייה</p>
                </div>`;
            div.onclick = () => loadDetails(r.RecipesCode);
            list.appendChild(div);
        });
    } catch {
        list.innerHTML = "שגיאה בחיבור לשרת";
    }
}

async function loadDetails(id) {
    const res = await fetch(`${apiBase}/recipes/${id}`);
    const d = await res.json();
    const imgPath = d.ImageUrl.startsWith('http') ? d.ImageUrl : `${apiBase}${d.ImageUrl}`;

    document.getElementById("recipe-content").innerHTML = `
        <img class="detail-image" src="${imgPath}">
        <h1 class="detail-title">${d.Name}</h1>
        <div class="recipe-actions">
            <button class="btn-edit" onclick="openEdit(${id})">ערוך</button>
            <button class="btn-delete" onclick="deleteRecipe(${id})">מחק</button>
        </div>
        <div class="detail-grid">
            <div><h4>מרכיבים</h4><p>${d.ingredients}</p></div>
            <div><h4>הוראות</h4><p>${d.instructions}</p></div>
        </div>`;
    showSection('details');
}

// הוספה מתוקנת עם קובץ תמונה
document.getElementById("add-recipe-form").onsubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const recipe = Object.fromEntries(formData.entries());
    
    // שליפת שם הקובץ שנבחר
    const fileInput = document.getElementById("image-upload");
    if (fileInput.files.length > 0) {
        recipe.ImageUrl = "/images/" + fileInput.files[0].name;
    } else {
        recipe.ImageUrl = "/images/default.jpg"; 
    }

    await fetch(`${apiBase}/recipes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(recipe)
    });
    
    e.target.reset(); // ניקוי הטופס
    showSection('recipes');
};

// יתר הפונקציות (עריכה, מחיקה, AI) נשארות כפי שהיו
async function openEdit(id) {
    const res = await fetch(`${apiBase}/recipes/${id}`);
    const d = await res.json();
    document.getElementById("edit-id").value = id;
    document.getElementById("edit-name").value = d.Name;
    document.getElementById("edit-ingredients").value = d.ingredients;
    document.getElementById("edit-instructions").value = d.instructions;
    document.getElementById("edit-category").value = d.CategoryCode;
    showSection('update');
}

document.getElementById("update-recipe-form").onsubmit = async (e) => {
    e.preventDefault();
    const id = document.getElementById("edit-id").value;
    const recipe = {
        Name: document.getElementById("edit-name").value,
        ingredients: document.getElementById("edit-ingredients").value,
        instructions: document.getElementById("edit-instructions").value,
        CategoryCode: document.getElementById("edit-category").value,
        ImageUrl: "/images/default.jpg"
    };

    await fetch(`${apiBase}/recipes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(recipe)
    });
    showSection('recipes');
};

async function deleteRecipe(id) {
    if (!confirm("למחוק?")) return;
    await fetch(`${apiBase}/recipes/${id}`, { method: 'DELETE' });
    showSection('recipes');
}

async function askBakingChef() {
    const q = document.getElementById("ai-question").value;
    const ansDiv = document.getElementById("ai-answer");
    
    if (!q) return;

    ansDiv.classList.remove("hidden");
    ansDiv.innerHTML = "השף מנסח תשובה...";

    try {
        const res = await fetch(`${apiBase}/ask?question=${encodeURIComponent(q)}`);
        const data = await res.json();
        
        // --- התיקון כאן ---
        // אנחנו לוקחים את התשובה ומנקים ממנה כוכביות (*) וסולמיות (#)
        // משתמשים ב-innerText כדי שהטקסט יוצג כטקסט נקי וברור
        let cleanAnswer = data.answer.replace(/\*/g, '').replace(/#/g, '').trim();
        
        ansDiv.innerText = cleanAnswer;
        ansDiv.style.whiteSpace = "pre-wrap"; // שומר על ירידות שורה בצורה יפה
        ansDiv.style.textAlign = "right";     // מוודא שהכתב מיושר לימין
    } catch (error) {
        ansDiv.innerHTML = "מצטער, חלה שגיאה בקבלת תשובה מהשף.";
    }
}

loadAllRecipes();