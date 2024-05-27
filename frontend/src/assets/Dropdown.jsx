// src/pages/FlightSearch.js
import React, { useState, useEffect } from 'react';
import { Box, Button, FormControl, FormLabel, Select, Stack } from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import FlightCard from './FlightCard';

const FlightSearch = () => {
  const [boardingCity, setBoardingCity] = useState('');
  const [destinationCity, setDestinationCity] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [boardingCities, setBoardingCities] = useState([]);
  const [destinationCities, setDestinationCities] = useState([]);
  const [flights, setFlights] = useState([]);
  const [allFlights, setAllFlights] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/flights')
      .then(response => response.json())
      .then(data => {
        setAllFlights(data);
        const uniqueBoardingCities = Array.from(new Set(data.map(flight => flight.location.name)));
        setBoardingCities(uniqueBoardingCities);
        const uniqueDestinationCities = Array.from(new Set(data.map(flight => flight.destination.name)));
        setDestinationCities(uniqueDestinationCities);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleSearch = () => {
    if (boardingCity && destinationCity && selectedDate) {
      const filteredFlights = allFlights.filter(flight =>
        flight.location.name === boardingCity &&
        flight.destination.name === destinationCity &&
        new Date(flight.date).toDateString() === selectedDate.toDateString()
      );
      setFlights(filteredFlights);
    } else {
      alert('Please fill in all fields.');
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={10} p={4} borderWidth={1} borderRadius="lg">
      <FormControl mb={4}>
        <FormLabel>Boarding City</FormLabel>
        <Select value={boardingCity} onChange={(e) => setBoardingCity(e.target.value)} placeholder="Select Boarding City">
          {boardingCities.map((city, index) => (
            <option key={index} value={city}>{city}</option>
          ))}
        </Select>
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>Destination City</FormLabel>
        <Select value={destinationCity} onChange={(e) => setDestinationCity(e.target.value)} placeholder="Select Destination City">
          {destinationCities.map((city, index) => (
            <option key={index} value={city}>{city}</option>
          ))}
        </Select>
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>Select the Date</FormLabel>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          className="form-control"
          dateFormat="yyyy-MM-dd"
          minDate={new Date()}
        />
      </FormControl>

      <Button colorScheme="blue" onClick={handleSearch}>
        Search
      </Button>

      <Stack spacing={5} mt={10}>
        {flights.map((flight, index) => (
          <FlightCard key={index} flight={flight} />
        ))}
      </Stack>
    </Box>
  );
};

export default FlightSearch;