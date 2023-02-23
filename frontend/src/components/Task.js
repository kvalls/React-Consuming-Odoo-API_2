import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import TaskDataService from "../services/TaskService";

const Task = props => {
  const { id } = useParams();
  let navigate = useNavigate();

  const initialTaskState = {
    id: null,
    name: "",
    user_id: "",
    user: "",
    project_id: "",
    project: "",
    stage_id: "",
    stage: "",
    kanban_state: "",
    kanban_state_label: "",
    description: ""
  };

  const timeOut = useRef(null);
  const [users, setUsers] = useState([]);
  const [stages, setStages] = useState([]);
  const [project, setProject] = useState([]);
  const [currentTask, setCurrentTask] = useState(initialTaskState);
  const [message, setMessage] = useState("");

  const getTask = id => {
    TaskDataService.get(id)
      .then(response => {
        (response.data.result.response.description ? response.data.result.response.description
          = response.data.result.response.description.split('>')[1].split('<')[0] : response.data.result.response.description = "")
        setCurrentTask(response.data.result.response)
      })
      .catch(e => {
        console.log(e);
      });
  };

  const getUsers = () => {
    TaskDataService.getAllUsers().then(response => {
      setUsers(response.data.result.response)
    })
  }

  const getProjects = () => {
    TaskDataService.getAllProjects().then(response => {
      setProject(response.data.result.response)
    })
  }

  const getStages = () => {
    TaskDataService.getAllStages().then(response => {
      setStages(response.data.result.response)
    })
  }

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentTask({ ...currentTask, [name]: value });
  };

  useEffect(() => {
    getProjects();
    getUsers();
    getStages();
    if (id)
      getTask(id);
  }, [id]);

  const updateTask = () => {
    TaskDataService.update(currentTask.id, currentTask)
      .then(response => {
        setMessage("The task was updated successfully!");
        clearTimeout(timeOut.current);
        timeOut.current = setTimeout(() => {
          navigate("/app")
        }, 1000);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteTask = () => {
    TaskDataService.remove(currentTask.id)
      .then(response => {
        navigate("/app");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div className="container">
      <div className="row">
        {currentTask ? (
          <div className="col-md-6 mx-auto mt-4">
            <h4>Task</h4>
            <form>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  required
                  value={currentTask.name}
                  onChange={handleInputChange}
                  name="name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="user">User</label>
                <select className="form-control" name="user_id" type="text" onChange={handleInputChange} required>
                  <option value="2" selected>{currentTask.user}...</option>
                  {users &&
                    users.map((user, index) => (
                      <option value={user.id} key={index}>{user.email}</option>
                    ))
                  }
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="project">Project</label>
                <select className="form-control" name="project_id" type="text" onChange={handleInputChange} required>
                  <option value={currentTask.project_id} selected>{currentTask.project}...</option>
                  {project &&
                    project.map((project, index) => (
                      <option value={project.id} key={index} >{project.name}</option>
                    ))
                  }
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="project">Stage</label>
                <select className="form-control" name="stage_id" type="text" onChange={handleInputChange} required>
                  <option value={currentTask.stage_id} selected>{currentTask.stage}...</option>
                  {stages &&
                    stages.map((stages, index) => (
                      <option value={stages.id} key={index}>{stages.name}</option>
                    ))
                  }
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="status">Status</label>
                <select className="form-control" name="kanban_state" type="text" onChange={handleInputChange} required>
                  <option value={currentTask.kanban_state} selected>{currentTask.kanban_state_label}...</option>
                  <option value="unassigned">Unassigned</option>
                  <option value="normal">In progress</option>
                  <option value="done">Ready</option>
                  <option value="delayed">Delayed</option>
                  <option value="blocked">Blocked</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  required
                  value={currentTask.description}
                  onChange={handleInputChange}
                  name="description"
                />
              </div>

              <div className="d-flex justify-content-between">
                <button className="btn btn-danger" onClick={deleteTask}>
                  Delete
                </button>

                <button type="submit" className="btn btn-success" onClick={updateTask}>
                  Update
                </button>
              </div>

              <p>{message}</p>
            </form>
          </div>
        ) : (
          <div className="col-md-6 mx-auto mt-4">
            <p>Please click on a task...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Task;
