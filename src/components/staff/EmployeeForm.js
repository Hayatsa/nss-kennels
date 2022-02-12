import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { addEmployee } from '../../modules/EmployeeManager';
import './EmployeeForm.css'
import { getAllLocations } from '../../modules/LocationManager'

export const EmployeeForm = () => {
	const [employee, setEmployee] = useState({
		name: "",
		address: "",
        locationId: 0,
	});

	const [isLoading, setIsLoading] = useState(false);

    const [locations, setLocations] = useState([]);

	const navigate = useNavigate();

	const handleControlledInputChange = (event) => {
		/* When changing a state object or array,
		always create a copy, make changes, and then set state.*/
		const newEmployee = { ...employee }
		let selectedVal = event.target.value
		// forms always provide values as strings. But we want to save the ids as numbers.
		if (event.target.id.includes("Id")) {
			selectedVal = parseInt(selectedVal)
		}
		/* Animal is an object with properties.
		Set the property to the new value
		using object bracket notation. */
		newEmployee[event.target.id] = selectedVal
		// update state
		setEmployee(newEmployee)
	}

	useEffect(() => {
		getAllLocations().then(setLocations);
	}, []);

	const handleClickSaveEmployee = (event) => {
		event.preventDefault() //Prevents the browser from submitting the form

        const locationId = employee.locationId

        if (locationId === 0 ) {
			window.alert("Please select a location and a customer")
		} else {
            addEmployee(employee)
                .then(() => navigate("/employees"))
        }       
    }

	return (
		<form className="employeeForm">
			<h2 className="employeeForm__title">New Employee</h2>
			<fieldset>
				<div className="form-group">
					<label htmlFor="name">Employee name:</label>
					<input type="text" id="name" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Employee name" value={employee.name} />
				</div>
			</fieldset>
			<fieldset>
				<div className="form-group">
					<label htmlFor="address">Employee address:</label>
					<input type="text" id="address" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Employee address" value={employee.address} />
				</div>
			</fieldset>
            <fieldset>
				<div className="form-group">
					<label htmlFor="location">Assign to location: </label>
					<select value={employee.locationId} name="locationId" id="locationId" onChange={handleControlledInputChange} className="form-control" >
						<option value="0">Select a location</option>
						{locations.map(l => (
							<option key={l.id} value={l.id}>
								{l.name}
							</option>
						))}
					</select>
				</div>
			</fieldset>
				<button className="btn btn-primary"
				onClick={handleClickSaveEmployee}>
				Save Employee
          </button>
		</form>
	)
};