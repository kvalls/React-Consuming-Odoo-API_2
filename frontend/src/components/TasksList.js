import React, { useState, useEffect } from "react";
import TaskDataService from "../services/TaskService";
import { Link } from "react-router-dom";
import "./TaskList.css"

const TasksList = () => {
  const [Tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    retrieveTasks();
  }, []);

  const onChangeSearchName = e => {
    const searchName = e.target.value;
    setSearchName(searchName);
  };

  const retrieveTasks = () => {
    TaskDataService.getAll()
      .then(response => {
        setTasks(response.data.result.response);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveTasks();
    setCurrentTask(null);
    setCurrentIndex(-1);
  };

  const setActiveTask = (Task, index) => {
    setCurrentTask(Task);
    setCurrentIndex(index);
  };

  const findByTask = () => {

    if (searchName === '') {
      refreshList();
      return;
    }

    TaskDataService.findByTask(searchName)
      .then(response => {
        setTasks(response.data.result.response);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by Name"
              value={searchName}
              onChange={onChangeSearchName}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={findByTask}
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-7">
          <h4>Tasks List</h4>
          <ul className="list-group list-group-flush">
            {Tasks &&
              Tasks.map((Task, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  key={index}
                >
                  <div className="d-flex justify-content-between align-items-center">
                    <h2 className="card-title">{Task.name}</h2>
                    <button
                      className="btn btn-primary"
                      onClick={() => setActiveTask(Task, index)}
                    >
                      View Details
                    </button>
                  </div>
                </li>
              ))}
          </ul>
        </div>
        <div className="col-lg-5">
          {currentTask ? (
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Details</h4>
                <ul className="list-unstyled">
                  <li>
                    <strong>Name:</strong> {currentTask.name}
                  </li>
                  <li>
                    <strong>User:</strong> {currentTask.user}
                  </li>
                  <li>
                    <strong>Project:</strong> {currentTask.project}
                  </li>
                  <li>
                    <strong>Stage:</strong> {currentTask.stage}
                  </li>
                  <li>
                    <strong>Status:</strong> {currentTask.kanban_state_label}
                  </li>
                  <li>
                    <strong>Description:</strong>{" "}
                    {currentTask.description
                      ? currentTask.description.split(">")[1].split("<")[0]
                      : "No task description."}
                  </li>
                </ul>
                <Link
                  to={"/app/tasks/" + currentTask.id}
                  className="btn btn-warning"
                >
                  Edit
                </Link>
              </div>
            </div>
          ) : (
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Details</h4>
                <p>No task selected.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
  
};

export default TasksList;
