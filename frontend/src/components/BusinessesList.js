import React, { useState, useEffect } from "react";
import BusinessDataService from "../services/BusinessService";
import { Link } from "react-router-dom";

const BusinessesList = () => {
  const [businesses, setBusinesses] = useState([]);
  const [currentBusiness, setCurrentBusiness] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    retrieveBusinesses();
  }, []);

  const onChangeSearchName = e => {
    const searchName = e.target.value;
    setSearchName(searchName);
  };

  const retrieveBusinesses = () => {
    BusinessDataService.getAll()
      .then(response => {
        setBusinesses(response.data.result.response);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveBusinesses();
    setCurrentBusiness(null);
    setCurrentIndex(-1);
  };

  const setActiveBusiness = (business, index) => {
    setCurrentBusiness(business);
    setCurrentIndex(index);
  };

  const removeAllBusinesses = () => {
    BusinessDataService.removeAll()
      .then(response => {
        refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByName = () => {

    if(searchName === '') {
      refreshList();
      return;
    }

    BusinessDataService.findByName(searchName)
      .then(response => {
        setBusinesses(response.data.result.response);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name"
            value={searchName}
            onChange={onChangeSearchName}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByName}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Businesses List</h4>

        <ul className="list-group">
          {businesses &&
            businesses.map((business, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveBusiness(business, index)}
                key={index}
              >
                {<img className="mr-2" src={"data:{{image/png;base64," + business.image} alt="" width={50} />}
                {business.name}
                
              </li>
            ))}
        </ul>

        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllBusinesses}
        >
          Remove All
        </button>
      </div>
      <div className="col-md-6">
        {currentBusiness ? (
          <div>
            <h4>Business</h4>
            <div>
            {<img className="mr-3" src={"data:{{image/png;base64," + currentBusiness.image} alt="" width={300} />}
            </div>
            <div>
              <label>
                <strong>Name:</strong>
              </label>{" "}
              {currentBusiness.name}
            </div>
            <div>
              <label>
                <strong>Email:</strong>
              </label>{" "}
              {currentBusiness.email}
            </div>
            <div>
              <label>
                <strong>Phone number:</strong>
              </label>{" "}
              {currentBusiness.phone_number}
            </div>

            <Link
              to={"/app/businesses/" + currentBusiness.id}
              className="badge badge-warning"
            >
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Business...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BusinessesList;
