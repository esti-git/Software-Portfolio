# Flight Sales Management System (SQL)

## 📌 Project Overview
This project focuses on the design, implementation, and management of a relational database for a **Flight Sales Management System**. The system tracks flights, destinations, ticket sellers, customers, sales transactions, and ticket pricing. 

The primary goal of this database is to streamline the sales operations of a flight agency, allowing management to monitor sales performance, track seller commissions, and analyze flight data.

## 🛠️ Tech Stack & Language
* **Database Management System:** Microsoft SQL Server (T-SQL)
* **Language:** SQL
* **Collation:** `hebrew_100_ci_as` (Supports Hebrew data indexing and case-insensitive queries)

## 📊 Database Schema & Structure
The database consists of the following core tables structured to reduce redundancy and maintain data integrity:

1. **`customers`**: Stores client personal details (`customer_id`, `tz`, `first_name`, `last_name`, `phone`).
2. **`ticketSellers`**: Contains agent information, hourly salary, and commissions (`seller_id`, `tz`, `first_name`, `last_name`, `phone`, `hourly_salary`, `commission_amount`).
3. **`airlines`**: Holds information regarding operating airlines and their country of origin (`airline_id`, `airline_name`, `country_of_origin`).
4. **`destination`**: List of travel destinations (`destination_id`, `destination_name`).
5. **`flights`**: Manages scheduled flight records, linked to airlines and destinations (`flight_id`, `flight_date`, `destination_id`, `flight_time`, `airline_id`).
6. **`prices`**: Tracks historical or current pricing structures mapped to specific destinations (`price_id`, `destination_id`, `price`).
7. **`Sales`**: The central transactional bridge table connecting customers, ticket sellers, and flights (`Sale_id`, `Sale_date`, `flight_id`, `customer_id`, `seller_id`).

## 🚀 Getting Started & Installation

To replicate this database on your local environment, follow these steps:

1. Clone or download the repository scripts.
2. Open **SQL Server Management Studio (SSMS)**.
3. Open the main script containing the schema definition.
4. Execute the script to initialize the database:

```sql
-- Creates and sets up the FlightSales database
CREATE DATABASE FlightSales COLLATE hebrew_100_ci_as;
GO
USE FlightSales;
GO