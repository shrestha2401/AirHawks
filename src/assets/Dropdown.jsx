import React, { useState } from 'react';

function Dropdown() {
  const [boardingCity, setBoardingCity] = useState('');
  const [destinationCity, setDestinationCity] = useState('');
  const [thirdCity, setThirdCity] = useState('');
  const [showDestinationDropdown, setShowDestinationDropdown] = useState(false);
  const [showThirdDropdown, setShowThirdDropdown] = useState(false);

  // Mock data for dropdown options
  const boardingCities = [
    { label: 'New York', value: 'NY' },
    { label: 'Los Angeles', value: 'LA' },
    { label: 'Chicago', value: 'CHI' },
    // Add more cities as needed
  ];

  const destinationCities = [
    { label: 'London', value: 'LDN' },
    { label: 'Paris', value: 'PRS' },
    { label: 'Tokyo', value: 'TKY' },
    // Add more cities as needed
  ];

  const thirdCities = [
    // Add options for the third dropdown
  ];

  const handleBoardingCityChange = (e) => {
    setBoardingCity(e.target.value);
    setShowDestinationDropdown(true); // Show the destination dropdown when a boarding city is selected
  };

  const handleDestinationCityChange = (e) => {
    setDestinationCity(e.target.value);
    setShowThirdDropdown(true); // Show the third dropdown when a destination city is selected
  };

  const handleThirdCityChange = (e) => {
    setThirdCity(e.target.value);
  };

  return (
    <div className="row">
      <div className="col-md-4">
        <label className="form-label">Boarding City</label>
        <select className="form-select" value={boardingCity} onChange={handleBoardingCityChange}>
          <option value="">Select Boarding City</option>
          {boardingCities.map((city) => (
            <option key={city.value} value={city.value}>{city.label}</option>
          ))}
        </select>
      </div>
      {showDestinationDropdown && (
        <div className="col-md-4">
          <label className="form-label">Destination City</label>
          <select className="form-select" value={destinationCity} onChange={handleDestinationCityChange}>
            <option value="">Select Destination City</option>
            {destinationCities.map((city) => (
              <option key={city.value} value={city.value}>{city.label}</option>
            ))}
          </select>
        </div>
      )}
      {showThirdDropdown && (
        <div className="col-md-4">
          <label className="form-label">Third City</label>
          <select className="form-select" value={thirdCity} onChange={handleThirdCityChange}>
            <option value="">Select Third City</option>
            {thirdCities.map((city) => (
              <option key={city.value} value={city.value}>{city.label}</option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}

export default Dropdown;
