import React, { useState, useEffect } from "react";
import TaskDataService from "../services/TaskService";
import "./AddTask.css"

const AddTask = () => {
  const initialTaskState = {
    id: null,
    name: "",
    user_id: "",
    project_id: "",
    stage_id: "",
    kanban_state: "",
    description: ""
  };
  const [project, setProject] = useState([]);
  const [task, setTask] = useState(initialTaskState);
  const [submitted, setSubmitted] = useState(false);
  const [users, setUsers] = useState([]);
  const [stages, setStages] = useState([]);
  // const [status, setStatus] = useState([]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setTask({ ...task, [name]: value });
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

  const saveTask = () => {
    var data = {
      name: task.name,
      user_id: task.user_id,
      project_id: task.project_id,
      stage_id: task.stage_id,
      kanban_state: task.kanban_state,
      description: task.description
    };
    console.log(data);
    TaskDataService.create(data)
      .then(response => {
        setTask({
          name: response.data.name,
          user_id: response.data.user_id,
          project_id: response.data.project_id,
          stage_id: response.data.stage_id,
          kanban_state: response.data.kanban_state,
          description: response.data.description
        });
        setSubmitted(true);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newTask = () => {
    setTask(initialTaskState);
    setSubmitted(false);
  };

  useEffect(() => {
    getProjects();
    getUsers();
    getStages();
  }, []);

return (
  <div className="submit-form">
    {submitted ? (
      <div className="submitted-container">
        <h4 className="submitted-title">You submitted successfully!</h4>
        <button className="btn btn-success" onClick={newTask}>
          Add Another Task
        </button>
      </div>
    ) : (
      <form className="form-container" onSubmit={saveTask}>
        <h2 className="form-title">Add a Task</h2>
        
        <div className="form-group">
          <label htmlFor="name" className="form-label">Task Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            required
            value={task.name}
            onChange={handleInputChange}
            name="name"
            placeholder="Enter a name for the task"
          />
        </div>

        <div className="form-group">
          <label htmlFor="user" className="form-label">Assigned User</label>
          <select
            className="form-control"
            name="user_id"
            type="text"
            onChange={handleInputChange}
            required
            defaultValue=""
          >
            <option value="" disabled>Select a user</option>
            {users &&
              users.map((user, index) => (
                <option value={user.id} key={index}>{user.email}</option>
              ))
            }
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="project" className="form-label">Project</label>
          <select
            className="form-control"
            name="project_id"
            type="text"
            onChange={handleInputChange}
            required
            defaultValue=""
          >
            <option value="" disabled>Select a project</option>
            {project &&
              project.map((project, index) => (
                <option value={project.id} key={index} >{project.name}</option>
              ))
            }
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="stage" className="form-label">Stage</label>
          <select
            className="form-control"
            name="stage_id"
            type="text"
            onChange={handleInputChange}
            required
            defaultValue=""
          >
            <option value="" disabled>Select a stage</option>
            {stages &&
              stages.map((stage, index) => (
                <option value={stage.id} key={index}>{stage.name}</option>
              ))
            }
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="status" className="form-label">Status</label>
          <select
            className="form-control"
            name="kanban_state"
            type="text"
            onChange={handleInputChange}
            required
            defaultValue=""
          >
            <option value="" disabled>Select a status</option>
            <option value="unassigned">Unassigned</option>
            <option value="normal">In Progress</option>
            <option value="done">Ready</option>
            <option value="delayed">Delayed</option>
            <option value="blocked">Blocked</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="description" className="form-label">Task Description</label>
          <textarea
            className="form-control"
            id="description"
            required
            value={task.description}
            onChange={handleInputChange}
            name="description"
            placeholder="Enter a description for the task"
          />
        </div>
  
          <button onClick={saveTask} className="btn btn-success">
            Submit
          </button>
        </form>
      )}
    </div>
  );
  
};

export default AddTask;
