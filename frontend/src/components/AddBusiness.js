import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BusinessDataService from "../services/BusinessService";



const AddBusiness = () => {
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
  const [business, setBusiness] = useState(initialBusinessState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setBusiness({ ...business, [name]: value });
  };

  const saveBusiness = () => {
    var data = {
      name: business.name,
      image: business.image,
      email: business.email,
      phone_number: business.phone_number,
      sales: business.sales,
      customers: business.customers,
      conversion_rate: business.conversion_rate,
    };

    BusinessDataService.create(data)
      .then(response => {
        setBusiness({
          id: response.data.id,
          name: response.data.name,
          image: response.data.image,
          email: response.data.email,
          phone_number: response.data.phone_number,
          sales: response.data.sales,
          customers: response.data.customers,
          conversion_rate: response.data.conversion_rate,
        });
        setSubmitted(true);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newBusiness = () => {
    setBusiness(initialBusinessState);
    setSubmitted(false);
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
    setBusiness({ ...business, [name]: value });
  };
};

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-warning mr-2" onClick={goBack}>
            Back
          </button>
          <button className="btn btn-success" onClick={newBusiness}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={business.name}
              onChange={handleInputChange}
              name="name"
              required
            />
          </div>

          <div className="form-group">
              <label htmlFor="image">Image</label>
              <img src={"data:{{image/png;base64," + business.image} alt="" width={300} />
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
              value={business.email}
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
              value={business.phone_number}
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
              value={business.sales}
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
              value={business.customers}
              onChange={handleInputChange}
              name="customers"
              required
            />
          </div>

          <button className="btn btn-warning mr-2" onClick={goBack}>
            Back
          </button>
          <button onClick={saveBusiness} className="btn btn-success">
            Submit
          </button>

        </div>
      )}
    </div>
  );
};

export default AddBusiness;
