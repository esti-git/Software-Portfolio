
use flightsales
go

select*from flights
select*from[dbo].[airlines]
select*from[dbo].[customers]
select*from[dbo].[destination]
select*from[dbo].[prices]
select*from[dbo].[Sales]
select*from[dbo].[ticketSellers]



--במקרה שהתז לא נמצאת תעשה את הפעולה הבאה
if not EXISTS (
select tz from customers
where tz='329424063')
begin
insert into customers(tz,first_name,last_name,phone)values
('32924063','מירי','כרמי','0548443471')
end

--פרוצדורה שבודקת האם לקוח קיים ואם לא מכניסה אותו למערכת
alter procedure PR_insert_customer @tz varchar(9),@first_name varchar(50), @last_name varchar(50)
,@phone varchar(10)
as 
begin
if not EXISTS (
select tz from customers
where tz='@tz')
begin
insert into customers(tz,first_name,last_name,phone)values
(@tz,@first_name,@last_name,@phone)
end
else
begin
select 'הלקוח נמצא'
end
end
go

exec PR_insert_customer @tz='329424063',@first_name='אילה', @last_name='אלפסי',@phone='054844371'
select*from customers

delete from customers--מחיקת נתונים שלא נכנסו כראוי
where customer_id=6

--פונקציה שבודקת האם האורך של התז תקין
create function dbo.FN_check_tz (@tz varchar(15))
returns varchar(10)
as 
begin
declare @check varchar(10)

if len(@tz)=9
set @check='תקין'
else
set @check='לא תקין'

return @check
end
go

select dbo.FN_check_tz ('329420623')

--שליפה עם פונקציה
select*,dbo.FN_check_tz (tz) from customers

--נמצאה שורה עם תז לא תקינה
update customers
set tz='329424063'
where customer_id=5

select*from ticketSellers

--קישור טבלאות למציאת מחיר טיסה
select*from Sales s
left join flights f on s.flight_id=f.flight_id
left join destination d on f.destination_id=d.destination_id
left join prices p on d.destination_id=p.destination_id

select*from ticketSellers
select*from Sales

delete from Sales 
where Sale_id=8

--פרוצדורה שמביאה את היעד הכי פופולרי
create procedure PR_check_populary
as 
begin
select top 1 d.destination_name,count(*)as total_sales from Sales s
join flights f on s.flight_id=f.flight_id
join destination d on f.destination_id=d.destination_id
group by destination_name
order by total_sales desc
end
go

exec PR_check_populary 

--  יצירת טבלה שמקשרת בין הטבלאות למציאת מחיר הכרטיס 
alter VIEW SalesPrice 
AS

select s.Sale_id,s.Sale_date,s.customer_id,s.seller_id, d.destination_id,p.price from Sales s
left join flights f on s.flight_id=f.flight_id
left join destination d on f.destination_id=d.destination_id
left join prices p on d.destination_id=p.destination_id

go


--select sum(price)*0.02 from SalesPrice
--where Sale_date between '2025-03-01' and '2025-03-15' and seller_id=1

exec PR_check_populary
--פונקציה שמזמנת פרוצדורה שבודקת מה סכום העמלה של העובד בין טווח תאריכים 
create function dbo.FN_Income_amount (@id_seller int,@begin_date varchar(50),@end_date varchar(50))
returns int
as 
begin
declare @sum_s int

set @sum_s =(

select sum(price)*0.02 from SalesPrice
where Sale_date between @begin_date and @end_date and seller_id=@id_seller
)

return @sum_s
end
go

select dbo.FN_Income_amount  (1,'2025-03-01','2025-03-15')


alter procedure PR_Income_amount(@id int,@begin_date varchar(50),@end_date varchar(50))
as 
begin
declare @sum_seller int
set @sum_seller=( dbo.FN_Income_amount  (@id,@begin_date,@end_date))
print (@sum_seller)
end
go


exec PR_Income_amount @id=1,@begin_date='2025-03-01',@end_date='2025-03-15'


select (count(Sale_id)/count(distinct customer_id)) from Sales 
where MONTH(sale_date)=3
go

--פרוצדורה שמקבלת מספר חודש שולחת לפרוצדורה שעושה את הממוצע טיסות לחודש זה
--ומציגה את כל הלקוחות שטסו את הכמות הממוצעת 

create or alter procedure PR_get_avg_1 (@month int,@avg_flight int output)
as 
begin
set @avg_flight=(select (count(Sale_id)/count(distinct customer_id)) from Sales 
             where MONTH(sale_date)=@month)

end

create or alter procedure PR_people_same_avg (@month int)
as 
begin
declare @avg_flight int

begin try
exec PR_get_avg_1 @month,@avg_flight output 


select customer_id from(
select count(c.customer_id)as count_tikets,c.first_name,c.last_name,c.customer_id from customers c
right join Sales s on c.customer_id=s.customer_id
group by c.customer_id,c.first_name,c.last_name)as count_f
where count_tikets=@avg_flight
end try

begin catch
select 'אין טיסות החודש'
return
end catch
end
go
exec PR_people_same_avg @month=3


--יצרתי כמה פרוצדורות שגויות ורציתי לראות את כל הרשימה כדי לדעת מה למחוק
SELECT name 
FROM sys.procedures
--מחיקת הפרוצדורות הלא שימושיות
drop procedure PR_get_avg
drop procedure PR_avg_3
drop procedure PR_avg_monthly

--טרנזקציה
--אין לעובדים אפשרות לשנות את מחירי הטיסות רק למנהל
create or alter trigger TR_no_update
on prices 
for update 
as

if suser_name()<>'LAPTOP-4JFKRQTM\T0556'
begin 
--כדי שלא תהיה שגיאה במהלך הטריגר הדפסתי את השגיאה הבאה וסימתי את הטריגר ברגע שמי שלא מורשה ניסה לשנות
        THROW 50000, 'אין לך אפשרות לשנות את מחירי הטיסות', 1;
		return
		end
print 'הפעולה נעשתה בהצלחה'

--עידכון טבלת המחירים לבדיקה שהטרנזקציה עובדת
select*from prices
update prices
set price=1100
where price_id=4

--שינתי את המורשים לפעולה כדי לבדוק שהפעולה לא תעבוד לי ברגע שאנסה לעשות שינוי
update prices
set price=1100
where price_id=4

--מחיקת טריגר לא תקין
drop trigger TR_no_insert_new_seller

--טרנזקציה שלא מאפשרת להכניס עובד חדש למערכת אם אתה לא המנהל
select*from ticketSellers

create or alter procedure PR_inser_new_seller 
(@tz varchar(9),@first_name varchar(50),@last_name varchar(50),@hourly_salary int)
as 
begin
begin transaction
if suser_name()<>'LAPTOP-4JFKRQTM\T0556'
begin 
rollback
select 'רק למנהל יש אפשרות להכניס עובד חדש למערכת'
return;
		end
insert into ticketSellers (tz,first_name,last_name,hourly_salary)values
(@tz,@first_name,@last_name ,@hourly_salary)
commit

select 'הפעולה נעשתה בהצלחה'

end
--בדיקה האם הטרנזקציה עובדת
exec PR_inser_new_seller @tz='336255551',@first_name='אבי',@last_name='ועקנין',@hourly_salary=65

--פרוצדורה שמביאה את כל האנשים שקיימים במערכת וליד כל אחד כותבת האם הוא לקוח או מוכר
create or alter procedure PR_all_people 
as 
begin
select c.customer_id, c.tz,c.first_name,c.last_name,c.phone,'לקוח'as status from customers c
union
select t.seller_id,t.tz,t.first_name,t.last_name,t.phone,'מוכר' from ticketSellers t
end

--פרוצדורה שבודקת האם יש עובדים שהם גם לקוחות
create or alter procedure PR_Seller_customer
as 
begin
;with Seller_customer as(
select c.customer_id, c.tz,c.first_name,c.last_name,c.phone from customers c
intersect
select t.seller_id,t.tz,t.first_name,t.last_name,t.phone from ticketSellers t) 

select
case when not exists(select*from Seller_customer)then 'אין עובד שהוא גם לקוח'
else 'יש עובדים שהם גם לקוחות'
end as result
end

--פונקציה שמחזירה את כמות הטיסות שהיו עד ליום זה
create function dbo.FN_count_flights ()
returns int
as 
begin
declare @c int
set @c=0
while (@c<(select count(*) from flights))
set @c=@c+1

return @c
end
go

select 'כמות הטיסות שהיו עד להיום הוא:  '+ convert(nvarchar,dbo.FN_count_flights ())

--עדכון מתוך JOIN 
--פרוצדורה שמקבלת מחיר ויעד ומעדכנת את המחיר לפי היעד
create or alter procedure PR_set_price(@price int,@destination varchar(50))
as
begin
update p
set p.price=@price
from prices p
join destination d on p.destination_id=d.destination_id
where d.destination_name in(@destination)
end 


exec PR_set_price @price=550,@destination='תל אביב'

select*from prices

--פרוצדורה שמביאה את מחיר הטיסה לכל יעד
create or alter procedure PR_price_all_destination
as
begin
select*from destination d
outer apply(select*from prices p
where d.destination_id=p.destination_id)a
end 

exec PR_price_all_destination
--truncate
select*
into #destination2
from destination
truncate table #destination2

select*from #destination2

--פרוצדורה שמביאה את הטיסות ביחד עם שמות היעדים
create or alter procedure PR_flights_names
as
begin
select*from flights f
cross apply(select*from destination d
where f.destination_id=d.destination_id)a
end 

exec PR_flights_names 

--sql דינאמי
select 'select*from '+t.name,*from sys.tables t

select*from customers
select*from ticketSellers
select*from flights
select*from destination
select*from airlines
select*from Sales
select*from prices

--מציאת המוכרים שלא מכרו כרטיסים לברצלונה
select*from ticketSellers t
left join Sales s on t.seller_id=s.Sale_id
and flight_id=2
where Sale_id is null


--שליפת שם היעד עם מחיר הטיסה לטיסות שמחירם 1000 שח
select*from destination d
join prices p  on p.destination_id=d.destination_id
and p.price=1000

--SQL דינאמי
--מביא את הטיסות לפי יעד קוד שדה תעופה
create or alter procedure PR_sqlDinamic(@id int)
as
begin
declare @s nvarchar (max)
set @s=(
'select*from flights
where airline_id='+cast(@id as nvarchar))
   EXEC sp_executesql @s--לוקח את המחרוזת ומריץ אותה
end 

exec PR_sqlDinamic @id=2

--יצירת טבלה חדשה של טיסות שעברו
create table archived_flights(
flight_id int identity,
flight_date date,
destination_id varchar(50),
flight_time datetime,
airline_id int
constraint PK_archived_flights#flight_id primary key(flight_id)
)

--לא היה ניתן להכניס נתונים של IDENTITY
--ולכן הדלקתי את האפשרות ולאחר מכן כיבתי אותה בחזרה
SET IDENTITY_INSERT archived_flights ON

--הכנסת נתונים של הטיסות שעברו
insert into archived_flights(flight_id,flight_date,destination_id,flight_time,airline_id)
select flight_id,flight_date,destination_id,flight_time,airline_id from flights
where flight_date<GETDATE() 

SET IDENTITY_INSERT archived_flights OFF


--הפיכת כל הסכומים ל0 כדי שנוכל להוסיף כל פעם סכום לעמלה
update ticketSellers
set commission_amount=0
where commission_amount is null

--מחיקת עובד כפול
delete from ticketSellers
where seller_id=13

update ticketSellers
set commission_amount= commission_amount+200
where tz=987654321

--drop trigger TR_commission_amount_1
--טריגר שבכל רכישה חדשה של כרטיס מוסיף עמלה לעובד שמכר את אותו כרטיס
create or alter trigger TR_upd_commission_amount
on sales
for insert
as
begin

update ticketSellers
set commission_amount=commission_amount+(
select price*0.02 from Sales s
left join flights f on s.flight_id=f.flight_id
left join destination d on f.destination_id=d.destination_id
left join prices p on d.destination_id=p.destination_id
where Sale_id=(select sale_id from inserted)
)
where seller_id=(select seller_id from inserted)

select 'טבלת עובדים עודכנה'
end
go

--הכנסת נתונים חדשים כדי לבדוק אם הטריגר עובד
insert into Sales(Sale_date,flight_id,customer_id,seller_id)
values( GETDATE() ,2,2,10)

insert into Sales(Sale_date,flight_id,customer_id,seller_id)
values( GETDATE() ,1,3,4)

select*from ticketSellers
