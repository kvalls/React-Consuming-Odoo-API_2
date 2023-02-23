import React, { useEffect } from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddTask from "./components/AddTask";
import Task from "./components/Task";
import TasksList from "./components/TasksList";

import TaskService from "./services/TaskService";
import Projects from "./components/Projects";

function App() {

  useEffect(() => {
    let session_id = localStorage.getItem("session_id");
    if (!session_id) {
      TaskService.initSession().then(response => {
        localStorage.setItem("session_id", response.data.result.session_id.toString())
      })
      return
    }
  }, []);

  return (
    <div className="app-container">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link to={"/app"} className="navbar-brand">
            <div className="task-logo">
              <img src="/app/planning.png" alt="tasks"/>
            </div>
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link to={"/app/projects"} className="nav-link">
                  View Projects
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/app/add"} className="nav-link">
                  Add Tasks
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
  
      <div className="container mt-5">
        <Routes>
          <Route path="/app" element={<TasksList />} />
          <Route path="/app/projects" element={<Projects />} />
          <Route path="/app/add" element={<AddTask />} />
          <Route path="/app/tasks/:id" element={<Task />} />
          <Route path="/" element={<Navigate to="/app" />} />
          <Route path="*" element={
            <div>
              <h2>404 Page not found</h2>
            </div>
          }
          />
        </Routes>
      </div>
    </div>
  );
  
}

export default App;
