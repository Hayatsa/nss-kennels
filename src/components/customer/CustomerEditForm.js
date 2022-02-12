import React, { useState, useEffect } from "react"
import {useNavigate, useParams} from "react-router-dom";
import {getCustomerById, updateCustomer} from "../../modules/CustomerManager"
import "./CustomerForm.css"

export const CustomerEditForm = () => {
  const [customer, setCustomer] = useState({ name: "", address: "", email: "" });
  const [isLoading, setIsLoading] = useState(false);

  const {customerId} = useParams();
  const navigate = useNavigate();

  const handleFieldChange = evt => {
    const stateToChange = { ...customer };
    stateToChange[evt.target.id] = evt.target.value;
    setCustomer(stateToChange);
  };

  const updateExistingCustomer = evt => {
    evt.preventDefault()
    setIsLoading(true);

    // This is an edit, so we need the id
    const editedCustomer = {
      id: customerId,
      name: customer.name,
      address: customer.address,
      email: customer.email
    };

  updateCustomer(editedCustomer)
    .then(() => navigate("/customers")
    )
  }

  useEffect(() => {
    getCustomerById(customerId)
      .then(customer => {
        setCustomer(customer);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <form>
        <fieldset>
          <div className="formgrid">
            <input
              type="text"
              required
              className="form-control"
              onChange={handleFieldChange}
              id="name"
              value={customer.name}
            />
            <label htmlFor="name">Customer name</label>

            <input
              type="text"
              required
              className="form-control"
              onChange={handleFieldChange}
              id="address"
              value={customer.address}
            />
            <label htmlFor="address">Address</label>

            <input
              type="text"
              required
              className="form-control"
              onChange={handleFieldChange}
              id="email"
              value={customer.email}
            />
            <label htmlFor="email">Email</label>
          </div>
          <div className="alignRight">
            <button
              type="button" disabled={isLoading}
              onClick={updateExistingCustomer}
              className="btn btn-primary"
            >Submit</button>
          </div>
        </fieldset>
      </form>
    </>
  );
}