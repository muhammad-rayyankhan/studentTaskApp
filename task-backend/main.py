from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Optional
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Student Task API", description="A simple task manager API")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # React frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# In-memory storage
tasks: list = []  # stores task objects
task_id_counter = 1  # backend auto-increment ID


# Models
class Task(BaseModel):
    id: int
    title: str
    completed: Optional[bool] = None

class TaskCreate(BaseModel):
    title: str
    completed: Optional[bool] = None

class TaskUpdate(BaseModel):
    title: Optional[str] = None
    completed: Optional[bool] = None

# Endpoints
@app.get("/")
def home():
    """Home endpoint to check API status"""
    return {"message": "Student Task API is running"}

@app.get("/tasks")
def get_tasks():
    """Return all tasks"""
    return tasks

@app.post("/tasks")
def create_task(task: TaskCreate):
    """Create a new task with backend-assigned ID"""
    global task_id_counter
    new_task = Task(
        id=task_id_counter, 
        title=task.title, 
        completed=task.completed if task.completed is not None else False)
    task_id_counter += 1
    tasks.append(new_task)
    return new_task

@app.delete("/tasks/{task_id}")
def delete_task(task_id: int):
    """Delete a task by ID"""
    for i, task in enumerate(tasks):
        if task.id == task_id:
            tasks.pop(i)
            return {"message": "Task deleted successfully"}
    raise HTTPException(status_code=404, detail={"error": "Task not found"})

@app.put("/tasks/{task_id}")
def update_task(task_id: int, updated_task: TaskUpdate):
    """Update a task partially (title or completed status)"""
    for task in tasks:
        if task.id == task_id:
            if updated_task.title is not None:
                task.title = updated_task.title
            if updated_task.completed is not None:
                task.completed = updated_task.completed
            return task
    raise HTTPException(status_code=404, detail={"error": "Task not found"})