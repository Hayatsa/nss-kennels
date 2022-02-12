import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { addCustomer } from '../../modules/CustomerManager';
import './CustomerForm.css'

export const CustomerForm = () => {
	const [customer, setCustomer] = useState({
		name: "",
		address: ""
	});

	const [isLoading, setIsLoading] = useState(false);

	const navigate = useNavigate();

	const handleControlledInputChange = (event) => {
		/* When changing a state object or array,
		always create a copy, make changes, and then set state.*/
		const newCustomer = { ...customer }
		let selectedVal = event.target.value
		// forms always provide values as strings. But we want to save the ids as numbers.
		if (event.target.id.includes("Id")) {
			selectedVal = parseInt(selectedVal)
		}
		/* Animal is an object with properties.
		Set the property to the new value
		using object bracket notation. */
		newCustomer[event.target.id] = selectedVal
		// update state
		setCustomer(newCustomer)
	}

	const handleClickSaveCustomer = (event) => {
		event.preventDefault() //Prevents the browser from submitting the form

        addCustomer(customer).then(() => navigate("/customers"))
    }

	return (
		<form className="customerForm">
			<h2 className="customerForm__title">New Owner</h2>
			<fieldset>
				<div className="form-group">
					<label htmlFor="name">Owner name:</label>
					<input type="text" id="name" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Customer name" value={customer.name} />
				</div>
			</fieldset>
			<fieldset>
				<div className="form-group">
					<label htmlFor="address">Owner address:</label>
					<input type="text" id="address" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Customer address" value={customer.address} />
				</div>
			</fieldset>
				<button className="btn btn-primary"
				onClick={handleClickSaveCustomer}>
				Save Owner
          </button>
		</form>
	)
};