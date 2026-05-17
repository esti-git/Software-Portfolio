CREATE DATABASE EventStore;
USE EventStore;



--טבלת קטגוריות
CREATE TABLE Categories (
    category_id INT IDENTITY(1,1) PRIMARY KEY,
    category_name VARCHAR(50) NOT NULL UNIQUE
);

--טבלת חברות
CREATE TABLE Companies (
    company_id INT IDENTITY(1,1) PRIMARY KEY,
    company_name VARCHAR(100) NOT NULL UNIQUE,
    contact_email VARCHAR(100),
    phone VARCHAR(20)
);

--טבלת אירועים
CREATE TABLE Events (
    product_id INT IDENTITY(1,1) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    event_date DATETIME NOT NULL,
    location VARCHAR(100) NOT NULL,
    age_min INT,
    category_id INT,
    company_id INT,
    price DECIMAL(10, 2) NOT NULL,
    created_at DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (category_id) REFERENCES Categories(category_id),
    FOREIGN KEY (company_id) REFERENCES Companies(company_id)
);

-- טבלת לקוחות
CREATE TABLE Customers (
    customer_id INT IDENTITY(1,1) PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT GETDATE()
);

-- טבלת קניות
CREATE TABLE Purchases (
    purchase_id INT IDENTITY(1,1) PRIMARY KEY,
    customer_id INT,
    purchase_date DATETIME DEFAULT GETDATE(),
    total_amount DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES Customers(customer_id)
);

-- טבלת פרטי קנייה
CREATE TABLE PurchaseDetails (
    detail_id INT IDENTITY(1,1) PRIMARY KEY,
    purchase_id INT,
    product_id INT,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (purchase_id) REFERENCES Purchases(purchase_id),
    FOREIGN KEY (product_id) REFERENCES Events(product_id)
);

INSERT INTO Categories (category_name) VALUES
('Concert'), ('Theatre'), ('Workshop'), ('Sport'), ('Festival'),
('Comedy'), ('Seminar'), ('Exhibition'), ('Dance'), ('Musical');

INSERT INTO Companies (company_name, contact_email, phone) VALUES
('Live Nation', 'info@livenation.com', '123-456-7890'),
('Ticketmaster', 'support@ticketmaster.com', '123-456-7891'),
('Eventbrite', 'help@eventbrite.com', '123-456-7892'),
('AEG Presents', 'contact@aegpresents.com', '123-456-7893'),
('Madison Square Garden', 'info@msg.com', '123-456-7894'),
('Ballet Theater', 'info@ballettheater.org', '123-456-7895'),
('Sports Events Inc.', 'info@sportsevents.com', '123-456-7896'),
('City Festivals', 'contact@cityfestivals.com', '123-456-7897'),
('Art Exhibit Co.', 'info@artexhibit.com', '123-456-7898'),
('Comedy Night Productions', 'info@comedynight.com', '123-456-7899');

INSERT INTO Events (name, description, event_date, location, age_min, category_id, company_id, price) VALUES
('Rock Concert', 'An electric night of rock music.', '2023-10-30 20:00', 'Stadium A', 12, 1, 1, 50.00),
('Shakespeare Play', 'A magical performance of Shakespeare’s work.', '2023-11-05 19:00', 'Theatre B', 16, 2, 2, 30.00),
('Photography Workshop', 'Capture the world through your lens.', '2023-11-12 10:00', 'Community Hall', 10, 3, 3, 20.00),
('Football Match', 'Local teams battle it out on the pitch.', '2023-11-15 18:00', 'Stadium B', 6, 4, 6, 25.00),
('Food Festival', 'Taste the best food around.', '2023-11-20 11:00', 'City Park', 0, 5, 8, 15.00),
('Stand-up Comedy Night', 'A hilarious night with stand-up comedians.', '2023-11-25 22:00', 'Comedy Club', 18, 6, 10, 40.00),
('Business Seminar', 'Learn from top industry leaders.', '2023-12-05 09:00', 'Convention Center', 18, 7, 4, 60.00),
('Art Exhibition', 'Explore contemporary art.', '2023-12-10 17:00', 'Art Gallery', 0, 8, 9, 10.00),
('Ballet Performance', 'A captivating ballet show.', '2023-12-15 20:00', 'Theatre C', 5, 9, 5, 50.00),
('Musical Show', 'Extraordinary musical talent.', '2023-12-20 19:30', 'Broadway', 12, 10, 3, 70.00);

INSERT INTO Customers (username, email, password) VALUES
('customer1', 'customer1@example.com', 'hashed_password1'),
('customer2', 'customer2@example.com', 'hashed_password2'),
('customer3', 'customer3@example.com', 'hashed_password3'),
('customer4', 'customer4@example.com', 'hashed_password4'),
('customer5', 'customer5@example.com', 'hashed_password5'),
('customer6', 'customer6@example.com', 'hashed_password6'),
('customer7', 'customer7@example.com', 'hashed_password7'),
('customer8', 'customer8@example.com', 'hashed_password8'),
('customer9', 'customer9@example.com', 'hashed_password9'),
('customer10', 'customer10@example.com', 'hashed_password10');

INSERT INTO Purchases (customer_id, total_amount) VALUES
(1, 100.00), (2, 60.00), (3, 80.00), (4, 50.00), (5, 30.00),
(6, 120.00), (7, 150.00), (8, 90.00), (9, 110.00), (10, 70.00);

INSERT INTO PurchaseDetails (purchase_id, product_id, quantity, price) VALUES
(1, 1, 2, 100.00),
(2, 3, 1, 20.00),
(3, 2, 3, 90.00),
(4, 5, 1, 15.00),
(5, 6, 1, 40.00),
(6, 4, 4, 100.00),
(7, 7, 2, 120.00),
(8, 9, 1, 50.00),
(9, 10, 1, 70.00),
(10, 8, 2, 20.00);






select*from Categories
select*from Companies
select*from Events
select*from Customers
select*from Purchases
select*from PurchaseDetails


-- לדוגמה, מעדכנים משתמש מסוים
UPDATE Customers
SET created_at = DATEADD(MONTH, -2, GETDATE()) -- 2 חודשים אחורה
WHERE Email = 'esti@gmail.com';



ALTER TABLE Events
ADD ImageUrl NVARCHAR(500) NULL;


-- שימו לב: יש להפעיל את הפקודות בתוך הקונטקסט של מסד הנתונים EventStore

-- עדכון אירוע 1 (Rock Concert)
UPDATE Events
SET ImageUrl = '/1.jpg' 
WHERE product_id = 1;

-- עדכון אירוע 2 (Shakespeare Play)
UPDATE Events
SET ImageUrl = '/2.jpg' 
WHERE product_id = 2;

-- עדכון אירוע 3 (Photography Workshop)
UPDATE Events
SET ImageUrl = '/3.jpg' 
WHERE product_id = 3;

-- עדכון אירוע 4 (Football Match)
UPDATE Events
SET ImageUrl = '/4.jpg' 
WHERE product_id = 4;

-- עדכון אירוע 5 (Food Festival)
UPDATE Events
SET ImageUrl = '/5.jpg' 
WHERE product_id = 5;

-- עדכון אירוע 6 (Stand-up Comedy Night)
UPDATE Events
SET ImageUrl = '/6.jpg' 
WHERE product_id = 6;

-- עדכון אירוע 7 (Business Seminar)
UPDATE Events
SET ImageUrl = '/7.jpg' 
WHERE product_id = 7;

-- עדכון אירוע עם שם קובץ ארוך (יש לדעת לאיזה מוצר הוא מתאים)
-- אם נניח שהוא מתאים ל-product_id 8:
UPDATE Events
SET ImageUrl = '/0a6ac624d651ac41975500b0f65a04dd.jpg' 
WHERE product_id = 8;

-- עדכון אירוע עם שם קובץ ארוך אחר (אם נניח שהוא מתאים ל-product_id 9):
UPDATE Events
SET ImageUrl = '/1dc498b596dca0ebf31b96bf83524e13.0000000.jpg' 
WHERE product_id = 9;

-- עדכון אירוע אחרון עם שם קובץ ארוך (אם נניח שהוא מתאים ל-product_id 10):
UPDATE Events
SET ImageUrl = '/6d9fa9e73fc921f7314da9530578c14d.0000000.jpg' 
WHERE product_id = 10;



SELECT product_id, name, ImageUrl 
FROM Events 
WHERE ImageUrl IS NOT NULL;



