import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  // State
  const [tasks, setTasks] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [loading, setLoading] = useState(true);

  const API_URL = "http://127.0.0.1:8000/tasks";

  // Fetch tasks from backend
  const fetchTasks = async () => {
    try {
      const resp = await fetch(API_URL);
      const data = await resp.json();
      setTasks(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch tasks:", err);
    } finally {
      setLoading(false);
    }
  };

  // Load tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  // Create new task
  const createTask = async () => {
    if (!newTitle.trim()) return;

    const taskToSend = { title: newTitle };

    try {
      const resp = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(taskToSend),
      });

      if (resp.ok) {
        const createdTask = await resp.json();
        setTasks([createdTask, ...tasks]); // add new task on top
        setNewTitle(""); // clear input
      } else {
        console.error("Failed to create task", resp.status);
      }
    } catch (err) {
      console.error("Error creating task:", err);
    }
  };

  // Delete task
  const deleteTask = async (id) => {
    try {
      const resp = await fetch(`${API_URL}/${id}`, { method: "DELETE" });

      if (resp.ok) {
        setTasks(tasks.filter((task) => task.id !== id));
      } else {
        console.error("Failed to delete task", resp.status);
      }
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  // Toggle completed status
  const updateTask = async (task) => {
    try {
      const resp = await fetch(`${API_URL}/${task.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !task.completed }),
      });

      if (resp.ok) {
        const updated = await resp.json();
        setTasks(tasks.map((t) => (t.id === task.id ? updated : t)));
      } else {
        console.error("Failed to update task", resp.status);
      }
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  return (
    <div className="app-container">
      <h1>STUDENT TASK MANAGER</h1>
      <p className="subtitle">
        Organize your daily tasks and track your progress easily
      </p>

      {/* Input Section */}
      <div className="input-section">
        <input
          type="text"
          placeholder="Enter new task"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <button onClick={createTask}>Add Task</button>
      </div>

      {/* Task List */}
      {loading ? (
        <p>Loading tasks...</p>
      ) : tasks.length === 0 ? (
        <p>No tasks yet! Add your first task above.</p>
      ) : (
        <ol className="task-list">
          {tasks.map((task, index) => (
            <li key={task.id} className="task-item">
              <span className={task.completed ? "done" : "pending"}>
                {index + 1}. {task.title} - {task.completed ? "Done" : "Pending"}
              </span>
              <div className="task-actions">
                <button onClick={() => updateTask(task)}>
                  {task.completed ? "Undo" : "Done"}
                </button>
                <button className="delete-btn" onClick={() => deleteTask(task.id)}>
                  X
                </button>
              </div>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

export default App;
