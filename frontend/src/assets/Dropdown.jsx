import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Import the styles

function Dropdown() {
  const [boardingCity, setBoardingCity] = useState('');
  const [destinationCity, setDestinationCity] = useState('');
  const [selectedDate, setSelectedDate] = useState(null); // State for selected date

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

  // Function to handle search button click
  const handleSearch = () => {
    // Perform search action here
    alert("Searching");
  };

  return (
    <div className="row mx-3 my-5">
      {/* Boarding city dropdown */}
      <div className="col-md-3">
        <label className="form-label mx-2">Boarding City</label>
        <select className="form-select mx-2" value={boardingCity} onChange={(e) => setBoardingCity(e.target.value)}>
          <option value="">Select Boarding City</option>
          {boardingCities.map((city) => (
            <option key={city.value} value={city.value}>{city.label}</option>
          ))}
        </select>
      </div>

      {/* Destination city dropdown */}
      <div className="col-md-3 mx-2">
        <label className="form-label mx-2">Destination City</label>
        <select className="form-select mx-2" value={destinationCity} onChange={(e) => setDestinationCity(e.target.value)}>
          <option value="">Select Destination City</option>
          {destinationCities.map((city) => (
            <option key={city.value} value={city.value}>{city.label}</option>
          ))}
        </select>
      </div>

      {/* Date picker */}
      <div className="col-md-2">
        <div className="d-flex flex-column">
          <label className="form-label mb-1">Select the Date</label>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            className="form-control"
            dateFormat="yyyy-MM-dd"
            minDate={new Date()} // Set minDate to today's date
          />
        </div>
      </div>

      {/* Search button */}
      <div className="col-md-3 mx-5 my-4">
        <button className="btn btn-primary" onClick={handleSearch}>Search</button>
      </div>
    </div>
  );
}

export default Dropdown;
