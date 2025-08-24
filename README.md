# 🏫 School Management API

A simple **Node.js + Express + MySQL** API to manage schools and search nearby schools using latitude & longitude.  

---

## 🚀 Features
- Add schools with **name, address, latitude, longitude**.  
- List schools sorted by proximity to a given latitude & longitude.  
- Input validation using **express-validator**.
- Data maintained in **MySQL**.

---

## ⚙️ Setup Guide

### 1. Clone the repository
```bash
git clone https://github.com/jatin-dua/school-management.git
cd school-management
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment

Create a .env file or copy .env.example to .env:
```bash
PORT=
DB_HOST=
DB_USER=
DB_PASSWORD=
DB_NAME=
```
### 4. Database Migration

Run the migration script to create the schools table:
```bash
npm run migrate
```
### 5. Start the server

Development:
```bash
npm run dev
```
Production:
```bash
npm start
```
---
## ⚙️ DB Schema
**Schools** Table
```bash
    id (Primary Key)
    name (VARCHAR)
    address (VARCHAR)
    latitude (DECIMAL)
    longitude (DECIMAL)
    geohash (VARCHAR)
```
---
## 📡 API Endpoints
### 1. Add School

POST /addSchool

Description: Add a new school with required details.

Request Body (JSON):
```json
{
  "name": "School_1",
  "address": "Laxmi Nagar, Delhi",
  "latitude": 28.6289,
  "longitude": 77.2773
}
```
Validation Rules:

    name: required, string, min chars: 1, max chars: 100.

    address: required, string, min chars: 1, max chars: 200.

    latitude: required, valid number between -90 and 90.

    longitude: required, valid number between -180 and 180.

Response:
```json
{
  "message": "School added",
  "id": 1
}
```
### 2. List Nearby Schools

GET /listSchools?lat=28.6289&lng=77.2773

Description: Get a list of schools sorted by proximity to provided coordinates.

Query Parameters:

    lat (required): User's latitude.

    lng (required): User's longitude.

Response:
```json
[
  {
    "id": 1,
    "name": "School_1",
    "address": "Laxmi Nagar, Delhi",
    "latitude": 28.6289,
    "longitude": 77.2773,
    "geohash": "ttngn0zsg",
    "distance_km": 0.0
  },
  {
    "id": 2,
    "name": "School_2",
    "address": "Preet Vihar, Delhi",
    "latitude": 28.6371,
    "longitude": 77.2856,
    "geohash": "ttngn0adv",
    "distance_km": 1.2
  }
]
```
