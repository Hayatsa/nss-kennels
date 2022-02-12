import React, { useState, useEffect } from 'react';
//import the components we will need
import { LocationCard } from './LocationCard';
import { getAllLocations, deleteLocation } from '../../modules/LocationManager';
import { useNavigate } from 'react-router-dom';

export const LocationList = () => {
    // The initial state is an empty array
    const [locations, setLocations] = useState([]);
  
    const getLocations = () => {
      // After the data comes back from the API, we
      //  use the setCustomers function to update state
      return getAllLocations().then(locationsFromAPI => {
        setLocations(locationsFromAPI)
      });
    };

    const handleDeleteLocation = id => {
      deleteLocation(id)
      .then(() => getAllLocations().then(setLocations));
  };
  
    // got the customers from the API on the component's first render
    useEffect(() => {
       getLocations();
     }, []);

    const navigate = useNavigate();
  
  // Finally we use .map() to "loop over" the customers array to show a list of customer cards
    return (
      <>
        <section className="section-content">
          <button type="button" className="btn" onClick={() => {navigate("/locations/create")}}>Add Location</button>
        </section>
        <div className="container-cards">
          {locations.map(location => <LocationCard key={location.id} location={location} handleDeleteLocation={handleDeleteLocation} />)}
        </div>
      </>
    );
  };