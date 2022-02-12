import React, { useState, useEffect } from "react"
import {useNavigate, useParams} from "react-router-dom";
import {getEmployeeById, updateEmployee} from "../../modules/EmployeeManager"
import "./EmployeeForm.css"

export const EmployeeEditForm = () => {
  const [employee, setEmployee] = useState({ name: "", address: "", email: "" });
  const [isLoading, setIsLoading] = useState(false);

  const {employeeId} = useParams();
  const navigate = useNavigate();

  const handleFieldChange = evt => {
    const stateToChange = { ...employee };
    stateToChange[evt.target.id] = evt.target.value;
    setEmployee(stateToChange);
  };

  const updateExistingEmployee = evt => {
    evt.preventDefault()
    setIsLoading(true);

    // This is an edit, so we need the id
    const editedEmployee = {
      id: employeeId,
      name: employee.name,
      address: employee.address,
      email: employee.email
    };

  updateEmployee(editedEmployee)
    .then(() => navigate("/employees")
    )
  }

  useEffect(() => {
    getEmployeeById(employeeId)
      .then(employee => {
        setEmployee(employee);
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
              value={employee.name}
            />
            <label htmlFor="name">Employee name</label>

            <input
              type="text"
              required
              className="form-control"
              onChange={handleFieldChange}
              id="address"
              value={employee.address}
            />
            <label htmlFor="address">Address</label>

            <input
              type="text"
              required
              className="form-control"
              onChange={handleFieldChange}
              id="email"
              value={employee.email}
            />
            <label htmlFor="email">Email</label>
          </div>
          <div className="alignRight">
            <button
              type="button" disabled={isLoading}
              onClick={updateExistingEmployee}
              className="btn btn-primary"
            >Submit</button>
          </div>
        </fieldset>
      </form>
    </>
  );
}