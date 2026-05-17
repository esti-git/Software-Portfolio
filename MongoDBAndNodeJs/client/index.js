const API_URL = "http://localhost:8080/api";
let selectedRequestId = null;
let isGeneralReg = false;

// 1. טעינה ראשונית - כל הבקשות
document.addEventListener('DOMContentLoaded', () => {
    fetchRequests();
});

async function fetchRequests() {
    const city = document.getElementById('filterCity').value;
    const pId = document.getElementById('filterPriority').value;
    const sId = document.getElementById('filterStatus').value;

    let url = `${API_URL}/helpRequests?`;
    if(city) url += `city=${city}&`;
    if(pId) url += `priorityId=${pId}&`;
    if(sId) url += `statusId=${sId}&`;

    try {
        const res = await fetch(url);
        const data = await res.json();
        renderCards(data);
    } catch (err) {
        console.error("Error:", err);
        document.getElementById('requestsList').innerHTML = "<p>חיבור לשרת נכשל.</p>";
    }
}

function renderCards(requests) {
    const container = document.getElementById('requestsList');
    container.innerHTML = requests.map(req => `
        <div class="card-luxury" onclick="viewRequestDetails('${req._id}')">
            <div class="luxury-badge prio-${req.priorityId}">${translatePriority(req.priorityId)}</div>
            <h3>${req.description}</h3>
            <p>📍 ${req.location?.city || 'כל הארץ'}</p>
            <p>🕒 סטטוס: ${translateStatus(req.statusId)}</p>
        </div>
    `).join('');
}

// 2. פונקציית לחיצה על בקשה - תיקון המודל
async function viewRequestDetails(id) {
    try {
        const res = await fetch(`${API_URL}/helpRequests/${id}`);
        const req = await res.json();
        selectedRequestId = id;

        document.getElementById('modalTitle').innerText = req.description;
        document.getElementById('modalDetails').innerHTML = `
            <p><strong>מיקום:</strong> ${req.location.city}, ${req.location.street || ''}</p>
            <p><strong>אנשים לסיוע:</strong> ${req.peopleCount}</p>
            <p><strong>ליצירת קשר:</strong> ${req.contactPhone}</p>
        `;

        const actionArea = document.getElementById('volunteerActionArea');
        if (req.statusId == 1) {
            actionArea.innerHTML = `<button onclick="openAuthModal()" class="confirm-btn">אני רוצה לסייע</button>`;
        } else {
            actionArea.innerHTML = `<p style="color:var(--gold); text-align:center; font-weight:bold;">הבקשה כבר בטיפול</p>`;
        }

        document.getElementById('requestModal').style.display = 'block';
    } catch (err) {
        alert("שגיאה בטעינת הפרטים");
    }
}

// 3. לוגיקת אימות ושינוי סטטוס לפי ה-Route החדש
async function checkVolunteerExists() {
    const volId = document.getElementById('volunteerInputId').value.trim();
    if (!volId) return alert("אנא הזן קוד מתנדב");

    try {
        const res = await fetch(`${API_URL}/volunteers/${volId}`);
        if (res.ok) {
            // אם המתנדב נמצא, נשתמש ב-Route החדש שלך
            updateRequestToTreatment(volId);
        } else {
            document.getElementById('errorMsg').style.display = 'block';
        }
    } catch (err) {
        alert("שגיאה בשרת");
    }
}

async function updateRequestToTreatment(volId) {
    try {
        // שימוש ב-Route המבוקש: POST /:id/volunteer
        const res = await fetch(`${API_URL}/helpRequests/${selectedRequestId}/volunteer`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ volunteerId: volId })
        });

        if (res.ok) {
            alert("תודה! הבקשה עודכנה לטיפולך.");
            closeModal('authModal');
            closeModal('requestModal');
            fetchRequests();
        } else {
            alert("שגיאה בעדכון הבקשה.");
        }
    } catch (err) {
        alert("שגיאה בתקשורת.");
    }
}

// 4. רישום מתנדב חדש
function openRegisterOnly() {
    isGeneralReg = true;
    document.getElementById('loginView').style.display = 'none';
    document.getElementById('registerView').style.display = 'block';
    document.getElementById('authModal').style.display = 'block';
}

function openAuthModal() {
    isGeneralReg = false;
    document.getElementById('loginView').style.display = 'block';
    document.getElementById('registerView').style.display = 'none';
    document.getElementById('authModal').style.display = 'block';
}

function showRegisterView() {
    document.getElementById('loginView').style.display = 'none';
    document.getElementById('registerView').style.display = 'block';
}

async function processRegistration() {
    const volData = {
        identityCard: document.getElementById('regIdCard').value,
        firstName: document.getElementById('regFName').value,
        lastName: document.getElementById('regLName').value,
        phone: document.getElementById('regPhone').value
    };

    // יצירת מזהה רץ VOL...
    const newId = "VOL" + Math.floor(1000 + Math.random() * 9000);

    try {
        const res = await fetch(`${API_URL}/volunteers`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ _id: newId, ...volData })
        });

        if (res.ok) {
            alert("נרשמת! הקוד שלך הוא: " + newId);
            if (isGeneralReg) {
                closeModal('authModal');
                fetchRequests();
            } else {
                updateRequestToTreatment(newId);
            }
        }
    } catch (e) { alert("שגיאה ברישום"); }
}

// עזרים
function translateStatus(s) { return { 1: "ממתין", 2: "בטיפול", 3: "הסתיים" }[s] || "כללי"; }
function translatePriority(p) { return { 1: "שגרתי", 2: "בינוני", 3: "דחוף", 4: "קריטי" }[p] || "רגיל"; }
function closeModal(id) { document.getElementById(id).style.display = 'none'; }
window.onclick = (e) => { if(e.target.className === 'luxury-modal') e.target.style.display = 'none'; }