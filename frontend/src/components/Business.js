import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import BusinessDataService from "../services/BusinessService";

const Business = props => {
  const { id } = useParams();
  let navigate = useNavigate();

  const initialBusinessState = {
    id: null,
    name: "",
    image: "",
    email: "",
    phone_number: "",
    sales: "",
    customers: "",
    conversion_rate: "",
  };
  const [currentBusiness, setCurrentBusiness] = useState(initialBusinessState);
  const [message, setMessage] = useState("");

  const getBusiness = id => {
    BusinessDataService.get(id)
      .then(response => {
        setCurrentBusiness(response.data.result.response);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (id)
      getBusiness(id);
  }, [id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentBusiness({ ...currentBusiness, [name]: value });
  };

  const updateBusiness = () => {
    BusinessDataService.update(currentBusiness.id, currentBusiness)
      .then(response => {
        setMessage("The business was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteBusiness = () => {
    BusinessDataService.remove(currentBusiness.id)
      .then(response => {
        navigate("/app/businesses");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const goBack = () => {
    navigate("/app/businesses");
  };

  const handleInputChangeImage = event => {
    let { name, value } = event.target;
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      let base64Data = (reader.result).split(';');
      let base64 = base64Data[1].split(',')
      value = base64[1];
      setCurrentBusiness({ ...currentBusiness, [name]: value });
    };
  };

  return (
    <div>
      {currentBusiness ? (
        <div className="edit-form">
          <h4>Business</h4>
          <form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={currentBusiness.name}
                onChange={handleInputChange}
                name="name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="image">Image</label>
              <img src={"data:{{image/png;base64," + currentBusiness.image} alt="" width={300} />
              <input
                type="file"
                className="form-control"
                id="image"
                onChange={handleInputChangeImage}
                name="image"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                className="form-control"
                id="email"
                value={currentBusiness.email}
                onChange={handleInputChange}
                name="email"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone_number">Phone number</label>
              <input
                type="text"
                className="form-control"
                id="phone_number"
                value={currentBusiness.phone_number}
                onChange={handleInputChange}
                name="phone_number"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="sales">Sales</label>
              <input
                type="text"
                className="form-control"
                id="sales"
                value={currentBusiness.sales}
                onChange={handleInputChange}
                name="sales"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="customers">Customers</label>
              <input
                type="text"
                className="form-control"
                id="customers"
                value={currentBusiness.customers}
                onChange={handleInputChange}
                name="customers"
                required
              />
            </div>

          </form>

          <button className="badge badge-warning mr-2" onClick={goBack}>
            Back
          </button>
          <button className="badge badge-danger mr-2" onClick={deleteBusiness}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateBusiness}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Business...</p>
        </div>
      )}
    </div>
  );
};

export default Business;
