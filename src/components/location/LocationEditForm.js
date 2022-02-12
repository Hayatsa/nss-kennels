import React, { useState, useEffect } from "react"
import {useNavigate, useParams} from "react-router-dom";
import {getLocationById, updateLocation} from "../../modules/LocationManager"
import "./LocationForm.css"

export const LocationEditForm = () => {
  const [location, setLocation] = useState({ name: "", address: "", email: "" });
  const [isLoading, setIsLoading] = useState(false);

  const {locationId} = useParams();
  const navigate = useNavigate();

  const handleFieldChange = evt => {
    const stateToChange = { ...location };
    stateToChange[evt.target.id] = evt.target.value;
    setLocation(stateToChange);
  };

  const updateExistingLocation = evt => {
    evt.preventDefault()
    setIsLoading(true);

    // This is an edit, so we need the id
    const editedLocation = {
      id: locationId,
      name: location.name,
      address: location.address,
      email: location.email
    };

  updateLocation(editedLocation)
    .then(() => navigate("/locations")
    )
  }

  useEffect(() => {
    getLocationById(locationId)
      .then(location => {
        setLocation(location);
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
              value={location.name}
            />
            <label htmlFor="name">Location name</label>

            <input
              type="text"
              required
              className="form-control"
              onChange={handleFieldChange}
              id="address"
              value={location.address}
            />
            <label htmlFor="address">Address</label>
          </div>
          <div className="alignRight">
            <button
              type="button" disabled={isLoading}
              onClick={updateExistingLocation}
              className="btn btn-primary"
            >Submit</button>
          </div>
        </fieldset>
      </form>
    </>
  );
}