import React, { useState, useEffect } from 'react';
import { getEmployeeById } from '../../modules/EmployeeManager';
import './EmployeeDetail.css';
import { useParams, useNavigate } from "react-router-dom"
import { deleteEmployee } from '../../modules/EmployeeManager';

export const EmployeeDetail = () => {
  const [employee, setEmployee] = useState({ name: "", address: "" });
  const [isLoading, setIsLoading] = useState(true);

  const {employeeId} = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    //getAnimalById(id) from AnimalManager and hang on to the data; put it into state
    console.log("useEffect", employeeId)
    getEmployeeById(employeeId)
      .then(employee => {
        setEmployee(employee);
        setIsLoading(false);
      });
  }, [employeeId]);

  const handleDelete = () => {
    //invoke the delete function in AnimalManger and re-direct to the animal list.
    setIsLoading(true);
    deleteEmployee(employeeId).then(() =>
      navigate("/employees")
    );
  };

  return (
    <section className="employee">
      <h3 className="employee__name">{employee.name}</h3>
      <div className="employee__address">Address: {employee.address}</div>
      {/* What's up with the question mark???? See below.*/}
      <div className="employee__location">Location: {employee.location?.name}</div>
      <button type="button" disabled={isLoading} onClick={handleDelete}>Delete Employee</button>
    </section>
  );
};

