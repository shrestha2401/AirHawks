import React, { useState, useEffect } from 'react';

function Dropdown() {
  const [boardingCity, setBoardingCity] = useState('');
  const [destinationCity, setDestinationCity] = useState('');
  const [selectedDate, setSelectedDate] = useState(''); // State for selected date
  const [boardingCities, setBoardingCities] = useState([]); // State for boarding cities
  const [destinationCities, setDestinationCities] = useState([]); // State for destination cities

  useEffect(() => {
    // Fetch flights data
    fetch('http://localhost:3000/flights')
      .then(response => response.json())
      .then(data => {
        // Extract unique boarding cities
        const uniqueBoardingCities = Array.from(new Set(data.map(flight => flight.location.name)));
        setBoardingCities(uniqueBoardingCities);

        // Extract unique destination cities
        const uniqueDestinationCities = Array.from(new Set(data.map(flight => flight.destination.name)));
        setDestinationCities(uniqueDestinationCities);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []); // Empty dependency array ensures useEffect runs only once
  const handleSearch = () => {
    // Check if all fields are filled
    if (boardingCity && destinationCity && selectedDate) {
      // Perform search action here
      alert("Searching");
    } else {
      // If any field is missing, show an alert
      alert("Please fill in all fields.");
    }
  };


  return (
    <div className="row mx-3 my-5">
      {/* Boarding city dropdown */}
      <div className="col-md-3">
        <label className="form-label mx-2">Boarding City</label>
        <select className="form-select mx-2" value={boardingCity} onChange={(e) => setBoardingCity(e.target.value)}>
          <option value="">Select Boarding City</option>
          {boardingCities.map((city, index) => (
            <option key={index} value={city}>{city}</option>
          ))}
        </select>
      </div>

      {/* Destination city dropdown */}
      <div className="col-md-3 mx-2">
        <label className="form-label mx-2">Destination City</label>
        <select className="form-select mx-2" value={destinationCity} onChange={(e) => setDestinationCity(e.target.value)}>
          <option value="">Select Destination City</option>
          {destinationCities.map((city, index) => (
            <option key={index} value={city}>{city}</option>
          ))}
        </select>
      </div>

      {/* Date picker */}
      <div className="col-md-2">
        <div className="d-flex flex-column">
          <label className="form-label mb-1">Select the Date</label>
          <input
            type="date"
            className="form-control"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>
      </div>

      {/* Search button */}
      <div className="col-md-3 mx-5 my-4">
        <button className="btn btn-primary"onClick={handleSearch}>Search</button>
      </div>
    </div>
  );
}

export default Dropdown;
