import React, { useState, useEffect } from 'react';
//import the components we will need
import { CustomerCard } from './CustomerCard';
import { getAllCustomers, deleteCustomer } from '../../modules/CustomerManager';
import { useNavigate } from 'react-router-dom';

export const CustomerList = () => {
    // The initial state is an empty array
    const [customers, setCustomers] = useState([]);
  
    const getCustomers = () => {
      // After the data comes back from the API, we
      //  use the setCustomers function to update state
      return getAllCustomers().then(customersFromAPI => {
        setCustomers(customersFromAPI)
      });
    };

    const handleDeleteCustomer = id => {
      deleteCustomer(id)
      .then(() => getAllCustomers().then(setCustomers));
  };

  const navigate = useNavigate();
  
    // got the customers from the API on the component's first render
    useEffect(() => {
      getCustomers();
    }, []);
  
    // Finally we use .map() to "loop over" the customers array to show a list of customer cards
    return (
      <>
        <section className="section-content">
          <button type="button" className="btn" onClick={() => {navigate("/customers/create")}}>Add Owner</button>
        </section>
        <div className="container-cards">
          {customers.map(customer => <CustomerCard key={customer.id} customer={customer} handleDeleteCustomer={handleDeleteCustomer} />)}
        </div>
      </>
    );
  };