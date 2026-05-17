use master
go


drop database FlightSalesDB
create database FlightSales collate hebrew_100_ci_as
use FlightSales
go
--טבלה מרכזית
create table customers(
customer_id int identity not null,
tz varchar (9),
first_name varchar(50),
last_name varchar(50),
phone varchar(10)
)
alter table customers
add constraint PK_customer#customer_id primary key(customer_id)
--טבלה מרכזית
create table ticketSellers(
seller_id int identity not null,
tz varchar (9),
first_name varchar(50),
last_name varchar(50),
phone varchar(10),
hourly_salary int,--משכורת לפי שעה
commission_amount int--סכום עמלה תוספת למשכורת
)
alter table ticketSellers
add constraint PK_ticketSellers#seller_id  primary key(seller_id )

--drop table ticketSellers

create table flights(
flight_id int identity,
flight_date date,
destination_id varchar(50),
flight_time datetime,
airline_id int
constraint PK_flights#flight_id primary key(flight_id)
)


alter table flights
alter column destination_id int
--drop table flights

create table destination(
destination_id int identity,
destination_name varchar(50),
constraint PK_destination#destination_id primary key(destination_id)
)
alter table flights
add constraint FK_flights_destination foreign key (destination_id)
references destination (destination_id)

create table airlines(
airline_id int identity,
airline_name varchar(50),
country_of_origin varchar(50),
constraint PK_airlines#airline_id primary key(airline_id)
)

alter table flights
add constraint FK_flights_airlines foreign key (airline_id)
references airlines (airline_id)
--טבלה מרכזית
create table Sales(
Sale_id int identity,
Sale_date datetime,
flight_id int,
customer_id int,
seller_id int,
constraint PK_Sales#Sale_id primary key(Sale_id)
)
alter table Sales
add constraint FK_Sales_flights foreign key (flight_id)
references flights (flight_id)

alter table Sales
add constraint FK_Sales_ticketSellers foreign key (seller_id)
references ticketSellers (seller_id)

alter table Sales
add constraint FK_Sales_customers foreign key (customer_id)
references customers (customer_id)

create table prices(
price_id int identity,
destination_id int,
price int,
constraint PK_prices#price_id primary key(price_id),
constraint FK_prices_destination foreign key (destination_id)
references destination (destination_id)
)

INSERT INTO customers (tz, first_name, last_name, phone) VALUES
('123456789', 'יוסי', 'כהן', '0501234567'),
('234567890', 'מיכל', 'לוי', '0522345678'),
('345678901', 'דני', 'מנחם', '0533456789'),
('456789012', 'שרה', 'אפרתי', '0544567890');

INSERT INTO ticketSellers (tz, first_name, last_name, phone, hourly_salary, commission_amount) VALUES
('987654321', 'אורן', 'גולן', '0507654321', 50, 0),
('876543210', 'נעמי', 'ברק', '0528765432', 60, 0),
('765432109', 'אלי', 'דרור', '0539876543', 70, 0),
('654321098', 'הדס', 'בן-חורין', '0541987654', 55, 0);

INSERT INTO flights (flight_date, destination_id, flight_time, airline_id) VALUES
('2025-03-15', 1, '2025-03-15 10:30:00', 1),
('2025-03-16', 2, '2025-03-16 14:45:00', 2),
('2025-03-17', 3, '2025-03-17 08:00:00', 3),
('2025-03-18', 1, '2025-03-18 16:30:00', 1);

INSERT INTO destination (destination_name) VALUES
('תל אביב'),
('ברצלונה'),
('ניו יורק'),
('לונדון');

INSERT INTO airlines (airline_name, country_of_origin) VALUES
('אל-על', 'ישראל'),
('איזיגט', 'בריטניה'),
('טורקיש איירליינס', 'טורקיה'),
('ריאן אייר', 'אירלנד');

INSERT INTO Sales (Sale_date, flight_id, customer_id, seller_id) VALUES
('2025-03-16 14:30:00', 2, 2, 2),
('2025-03-17 07:45:00', 3, 3, 3),
('2025-03-18 16:15:00', 4, 4, 4);

INSERT INTO prices (destination_id, price) VALUES
(1, 500),
(2, 1500),
(3, 2500),
(4, 1000);

select*from flights
select*from[dbo].[airlines]
select*from[dbo].[customers]
select*from[dbo].[destination]
select*from[dbo].[prices]
select*from[dbo].[Sales]
select*from[dbo].[ticketSellers]

delete from flights
DBCC CHECKIDENT ('flights', RESEED, 0);--המספור היה מ4 אז הייתי צריכה לאפס את המונה

