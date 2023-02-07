import React, { useEffect } from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddBusiness from "./components/AddBusiness";
import Business from "./components/Business";
import BusinessesList from "./components/BusinessesList";

import BusinessService from "./services/BusinessService";

function App() {

  useEffect(() => {
    let session_id = localStorage.getItem("session_id");
    if (!session_id) {
      BusinessService.initSession().then(response => {
        localStorage.setItem("session_id", response.data.result.session_id.toString())
      })
      return
    }
  }, []);

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/app/businesses" className="navbar-brand">
          <div className="business-logo" >
            <img src="/app/business-logo.png" alt="Business Logo" />
          </div>
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/app/businesses"} className="nav-link">
              Businesses
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/app/add"} className="nav-link">
              Add
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route path="/app" element={<BusinessesList />} />
          <Route path="/app/businesses" element={<BusinessesList />} />
          <Route path="/app/add" element={<AddBusiness />} />
          <Route path="/app/businesses/:id" element={<Business />} />
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
