// src/pages/FlightSearch.js
import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Select, Stack } from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import FlightCard from './FlightCard';

const FlightSearch = () => {
  const [boardingCity, setBoardingCity] = useState('');
  const [destinationCity, setDestinationCity] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [flights, setFlights] = useState([]);

  const handleSearch = () => {
    // Mock data, replace this with actual API call
    const mockFlights = [
      {
        airline: 'Indigo',
        flightNumber: '6E-123',
        origin: boardingCity,
        destination: destinationCity,
        departureTime: '10:00 AM',
        departureDate: selectedDate.toDateString(),
        arrivalTime: '1:00 PM',
        arrivalDate: selectedDate.toDateString(),
        duration: '3h',
        image: 'https://via.placeholder.com/400'
      },
      // Add more mock flights as needed
    ];
    setFlights(mockFlights);
  };

  return (
    <Box maxW="md" mx="auto" mt={10} p={4} borderWidth={1} borderRadius="lg">
      <FormControl mb={4}>
        <FormLabel>Boarding City</FormLabel>
        <Select value={boardingCity} onChange={(e) => setBoardingCity(e.target.value)} placeholder="Select Boarding City">
          <option value="NY">New York</option>
          <option value="LA">Los Angeles</option>
          <option value="CHI">Chicago</option>
        </Select>
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>Destination City</FormLabel>
        <Select value={destinationCity} onChange={(e) => setDestinationCity(e.target.value)} placeholder="Select Destination City">
          <option value="LDN">London</option>
          <option value="PRS">Paris</option>
          <option value="TKY">Tokyo</option>
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
