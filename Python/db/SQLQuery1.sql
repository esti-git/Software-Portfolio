use master
go
create database Recipes collate hebrew_100_ci_as
USE Recipes;

CREATE TABLE categories (
    CategoryCode INT IDENTITY(1,1) NOT NULL,
Name VARCHAR(40) NOT NULL,
CONSTRAINT PK_Category PRIMARY KEY(CategoryCode)
);

select Name from recipes
CREATE TABLE recipes (
    RecipesCode INT IDENTITY(1,1) NOT NULL,
   Name VARCHAR(50) NOT NULL,
    ingredients TEXT NOT NULL,
    instructions TEXT NOT NULL,
    CategoryCode int NOT NULL,
    FOREIGN KEY (CategoryCode) REFERENCES categories(CategoryCode)
);
select*from categories
select*from Recipes
UPDATE recipes SET ImageUrl = '/images/טבעוני/190811648b5c92aabdd2ebf8655f2540.jpg' WHERE RecipesCode = 14;
UPDATE recipes SET ImageUrl = '/images/אוכל/fa74a1051787c3d9ce707215be6eedd8.jpg' WHERE RecipesCode = 6;
UPDATE recipes SET ImageUrl = '/images/אוכל/6e74eab1b1621000ba685d99d1b71967.jpg' WHERE RecipesCode = 5;
UPDATE recipes SET ImageUrl = '/images/חלבי/3416c331029871750487603183cf1b7a.jpg' WHERE RecipesCode = 2;
UPDATE recipes SET ImageUrl = '/images/טבעוני/ad545fd3d7d355dca79b8e97116bb1cc.jpg' WHERE RecipesCode = 12;
UPDATE recipes SET ImageUrl = '/images/טבעוני/e6970e5ea5ef4a97022b76edfc1f029f.jpg' WHERE RecipesCode = 13;
UPDATE recipes SET ImageUrl = '/images/desert/desert (26).jpg' WHERE RecipesCode = 15;

UPDATE recipes SET ImageUrl = '/images/אוכל/6e74eab1b1621000ba685d99d1b71967.jpg' WHERE RecipesCode = 1;
UPDATE recipes SET ImageUrl = '/images/טבעוני/52a15dbd93597ab21d8c4fb1880c4df4.jpg' WHERE RecipesCode = 3;
UPDATE recipes SET ImageUrl = '/images/טבעוני/04d95b88a658fedc24fcd60d112dbc0c.jpg' WHERE RecipesCode = 4;
UPDATE recipes SET ImageUrl = '/images/desert/desert (27).jpg' WHERE RecipesCode = 7;
UPDATE recipes SET ImageUrl = '/images/fish/fish (9).jpg' WHERE RecipesCode = 18;
UPDATE recipes SET ImageUrl = '/images/fish/fish (4).jpg' WHERE RecipesCode = 19;
ALTER TABLE Recipes
ADD ImageUrl NVARCHAR(255);
drop table categories
select*from categories
INSERT INTO categories (Name)
VALUES
-- מנות פתיחה
(N'מנות ראשונות'),
(N'מרקים'),
-- מנות עיקריות
(N'מנות עיקריות – בשר'),
(N'מנות עיקריות – עוף'),
(N'מנות עיקריות – דגים'),
(N'מנות עיקריות – צמחוני'),
(N'מנות עיקריות – טבעוני'),
(N'תוספות חמות'),
(N'תוספות קרות'),
(N'קינוחים חלביים'),
(N'קינוחים פרווה'),
(N'עוגות שוקולד');


drop table recipes
select*from recipes 
-- סלטים קרים
INSERT INTO recipes (Name, ingredients, instructions, CategoryCode)
VALUES
(N'סלט טבולה', 
 N'בולגרי - 100 גרם, עגבניות - 2 יחידות, מלפפון - 1 יחידה, בצל ירוק - 2 גבעולים, פטרוזיליה קצוצה - חופן, מיץ לימון - 2 כפות, שמן זית - 3 כפות, מלח - לפי הטעם', 
 N'מבשלים את הבולגרי לפי ההוראות. חותכים ירקות ומערבבים עם הבולגרי. מוסיפים שמן זית ומיץ לימון ומגישים.', 
 2), 

(N'סלט ירקות ישראלי', 
 N'עגבניות - 3 יחידות, מלפפונים - 2 יחידות, פלפל אדום - 1 יחידה, בצל סגול - 1 יחידה, פטרוזיליה קצוצה - חופן, שמן זית - 2 כפות, מיץ לימון - 2 כפות, מלח ופלפל - לפי הטעם', 
 N'חותכים את כל הירקות לקוביות. מערבבים בקערה גדולה עם שמן זית ומיץ לימון. מתבלים במלח ופלפל.', 
 2);

-- מרקים
INSERT INTO recipes (Name, ingredients, instructions, CategoryCode)
VALUES
(N'מרק ירקות קיץ', 
 N'גזר - 2 יחידות, קישוא - 2 יחידות, קולרבי - 1 יחידה, בצל - 1 יחידה, שמן זית - 2 כפות, מים - 1.5 ליטר, מלח ופלפל - לפי הטעם', 
 N'קולפים וחותכים את כל הירקות. מחממים שמן בסיר, מוסיפים בצל וטגנים קלות. מוסיפים את יתר הירקות והמים. מבשלים עד לריכוך.', 
 4),

(N'מרק עדשים כתומות', 
 N'עדשים כתומות - 200 גרם, גזר - 2 יחידות, בצל - 1 יחידה, שמן זית - 2 כפות, מים - 1.5 ליטר, מלח, כמון ופלפל שחור - לפי הטעם', 
 N'טגנים בצל ושום בשמן. מוסיפים את יתר החומרים ומבשלים עד שהעדשים רכות. טוחנים אם רוצים מרקם חלק.', 
 4);

-- מנות עיקריות – בשר
INSERT INTO recipes (Name, ingredients, instructions, CategoryCode)
VALUES
(N'סטייק בקר עם רוטב פטריות', 
 N'סטייק בקר - 2 יחידות, שמן זית - 2 כפות, חמאה - 1 כף, פטריות - 200 גרם, שמנת מתוקה - 100 מ"ל, מלח ופלפל - לפי הטעם', 
 N'מטגנים סטייק במחבת חמה עם שמן וחמאה 3-4 דקות לכל צד. מוציאים ומוסיפים פטריות למחבת, מטגנים 5 דקות, מוסיפים שמנת ומבשלים עד רוטב סמיך. מגישים עם הסטייק.', 
 5);

-- מנות עיקריות – עוף
INSERT INTO recipes (Name, ingredients, instructions, CategoryCode)
VALUES
(N'עוף בתנור עם ירקות', 
 N'עוף - 1 ק"ג, גזר - 2 יחידות, קישוא - 1 יחידה, תפוח אדמה - 3 יחידות, שמן זית - 3 כפות, מלח, פלפל, רוזמרין - לפי הטעם', 
 N'חותכים ירקות ומסדרים בתבנית. מניחים את העוף מעל, מתבלים במלח, פלפל ורוזמרין. אופים 45 דקות ב-180 מעלות.', 
 6);

-- קינוחים
INSERT INTO recipes (Name, ingredients, instructions, CategoryCode)
VALUES
(N'עוגת גבינה אפויה', 
 N'גבינת שמנת - 400 גרם, ביצים - 3 יחידות, סוכר - 150 גרם, שמנת מתוקה - 200 מ"ל, קמח - 2 כפות, תמצית וניל - 1 כפית, בסיס ביסקוויטים - 200 גרם', 
 N'מערבבים את כל החומרים בקערה גדולה. יוצקים על בסיס הביסקוויטים בתבנית. אופים 50 דקות ב-170 מעלות. מצננים לפני ההגשה.', 
 17);

-- עוגות שוקולד
INSERT INTO recipes (Name, ingredients, instructions, CategoryCode)
VALUES
(N'בראוניז שוקולד', 
 N'שוקולד מריר - 200 גרם, חמאה - 150 גרם, ביצים - 3 יחידות, סוכר - 200 גרם, קמח - 100 גרם, אגוזי מלך - חופן', 
 N'ממיסים שוקולד וחמאה, מערבבים עם ביצים וסוכר. מוסיפים קמח ואגוזים. אופים 25 דקות ב-180 מעלות.', 
 18);
 INSERT INTO recipes (Name, ingredients, instructions, CategoryCode)
VALUES
(N'סלט קפרזה', 
 N'עגבניות - 3 יחידות, מוצרלה טרייה - 200 גרם, בזיליקום - חופן, שמן זית - 2 כפות, מלח - לפי הטעם, פלפל שחור - לפי הטעם', 
 N'פורסים את העגבניות והמוצרלה לפרוסות. מסדרים על צלחת לסירוגין, מפזרים בזיליקום ומטפטפים שמן זית. מתבלים במלח ופלפל.', 
 2),  -- סלטים קרים

(N'מרק עוף עם ירקות', 
 N'עוף - 1 ק"ג, מים - 3 ליטר, גזר - 3 יחידות, תפוח אדמה - 2 יחידות, סלרי - 1 גבעול, בצל - 1 יחידה, מלח - לפי הטעם, פפריקה - חצי כפית', 
 N'מבשלים את העוף במים עד לרתיחה. מוסיפים את הירקות חתוכים ומבשלים עד שהירקות רכים. מתבלים לפי הטעם.', 
 4),  -- מרקים

(N'עוגת שוקולד בסיסית', 
 N'קמח - 200 גרם, סוכר - 180 גרם, ביצים - 3 יחידות, חמאה - 100 גרם, שוקולד מריר - 150 גרם, אבקת קקאו - 2 כפות, שמן - 50 מ"ל, חלב - 100 מ"ל, אבקת אפייה - 1 כפית', 
 N'מחממים תנור ל-180 מעלות. ממיסים את השוקולד והחמאה. בקערה מערבבים ביצים וסוכר. מוסיפים את השוקולד המומס ושאר המרכיבים, מערבבים היטב. אופים בתבנית משומנת כ-35 דקות.', 
 18);  -- עוגות שוקולד

 INSERT INTO recipes (Name, ingredients, instructions, CategoryCode)
VALUES
(N'סלט קפרזה', 
 N'עגבניות - 3 יחידות, מוצרלה טרייה - 200 גרם, בזיליקום - חופן, שמן זית - 2 כפות, מלח - לפי הטעם, פלפל שחור - לפי הטעם', 
 N'פורסים את העגבניות והמוצרלה לפרוסות. מסדרים על צלחת לסירוגין, מפזרים בזיליקום ומטפטפים שמן זית. מתבלים במלח ופלפל.', 
 2);  -- סלטים קרים

