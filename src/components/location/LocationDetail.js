import React, { useState, useEffect } from 'react';
import { getLocationById } from '../../modules/LocationManager';
import './LocationDetail.css';
import { useParams, useNavigate } from "react-router-dom"
import { deleteLocation } from '../../modules/LocationManager';

export const LocationDetail = () => {
  const [location, setLocation] = useState({ name: "", address: "" });
  const [isLoading, setIsLoading] = useState(true);

  const {locationId} = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("useEffect", locationId)
    getLocationById(locationId)
      .then(location => {
        setLocation(location);
        setIsLoading(false);
      });
  }, [locationId]);

  const handleDelete = () => {
    setIsLoading(true);
    deleteLocation(locationId).then(() =>
      navigate("/locations")
    );
  };

  return (
    <section className="location">
      <h3 className="location__name">{location.name}</h3>
      <div className="location__address">{location.address}</div>
      <button type="button" disabled={isLoading} onClick={handleDelete}>Close Location</button>
    </section>
  );
}

