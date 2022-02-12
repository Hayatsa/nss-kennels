import React, { useState, useEffect } from 'react';
//import the components we will need
import { EmployeeCard } from './EmployeeCard';
import { getAllEmployees, deleteEmployee } from '../../modules/EmployeeManager';
import { useNavigate } from 'react-router-dom';

export const EmployeeList = () => {
    // The initial state is an empty array
    const [employees, setEmployees] = useState([]);
  
    const getEmployees = () => {
      // After the data comes back from the API, we
      //  use the setCustomers function to update state
      return getAllEmployees().then(employeesFromAPI => {
        setEmployees(employeesFromAPI)
      });
    };

    const handleDeleteEmployee = id => {
      deleteEmployee(id)
      .then(() => getAllEmployees().then(setEmployees));
  };
  
    // got the customers from the API on the component's first render
    useEffect(() => {
      getEmployees();
    }, []);

    const navigate = useNavigate();

    // Finally we use .map() to "loop over" the customers array to show a list of customer cards
    return (
      <>
        <section className="section-content">
          <button type="button" className="btn" onClick={() => {navigate("/employees/create")}}>Add Employee</button>
        </section>
        <div className="container-cards">
          {employees.map(employee => <EmployeeCard key={employee.id} employee={employee} handleDeleteEmployee={handleDeleteEmployee} />)}
        </div>
      </>
    );
  };