# Student Task Manager

A simple full-stack task management application built using **React** and **FastAPI**.  
This project helps students organize daily tasks and demonstrates real-world CRUD operations and frontend–backend integration.

---

## Features

- Create, update, and delete tasks
- Mark tasks as **Done** or **Pending**
- RESTful API using FastAPI
- Clean and responsive user interface
- Backend-generated unique task IDs

---

## Tech Stack

### Frontend
- React (Vite)
- JavaScript (ES6+)
- CSS

### Backend
- FastAPI
- Python
- Pydantic
- Uvicorn

---

## How to Run the Project Locally

### Backend Setup

``` bash
cd task-backend
uv venv
source .venv/Scripts/activate   # Windows
uv pip install -r requirements.txt
python -m uvicorn main:app --reload
```
Backend runs at:
[backend](http://127.0.0.1:8000)

API Documentation:
[API Documentation](http://127.0.0.1:8000/docs)

### Frontend Setup
``` bash
cd task-frontend
npm install
npm run dev
```
Frontend runs at:
[frontend](http://localhost:5173)

## API Endpoints

| Method | Endpoint      | Description       |
| ------ | ------------- | ----------------- |
| GET    | `/tasks`      | Get all tasks     |
| POST   | `/tasks`      | Create a new task |
| PUT    | `/tasks/{id}` | Update a task     |
| DELETE | `/tasks/{id}` | Delete a task     |

## Author
Muhammad Rayyan Khan
[Github](https://www.github.com/muhammad-rayyankhan)