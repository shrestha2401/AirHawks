import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { UserContext } from './Usercontext';
import { Box, Text, Stack, Divider, Button, FormControl, FormLabel, FormHelperText, Flex, Spacer, Image, Center } from '@chakra-ui/react';
import placeholderImage from './placeholder.jpg';

const ManageFlights = () => {
  const { email } = useContext(UserContext);
  const [flights, setFlights] = useState([]);
  const [error, setError] = useState(null);
  const [noFlightsMessage, setNoFlightsMessage] = useState('');

  useEffect(() => {
    const fetchFlightDetails = async () => {
      console.log(email);
      if (!email) return;
      try {
        const response = await axios.post('http://localhost:3000/manage-flights', { email });
        const fetchedFlights = response.data.flights_details || [];
        setFlights(fetchedFlights);
        if (fetchedFlights.length === 0) {
          setNoFlightsMessage('No flights found for this email.');
        } else {
          setNoFlightsMessage('');
        }
      } catch (error) {
        setError(error);
        console.error('Error fetching flights:', error);
      }
    };

    fetchFlightDetails();
  }, [email]);

  const handleCancelTicket = async (paymentId) => {
    try {
      const response = await axios.post('http://localhost:3000/cancel-ticket', { email, paymentId });
      alert(response.data.message); 
      window.location.reload();
    } catch (error) {
      console.error('Error cancelling ticket:', error);
    }
  };

  if (error) {
    return <div>Error fetching flights: {error.message}</div>;
  }

  return (
    <Center>
      <Box p={4}>
        <Box mb={4}>
          <Text fontSize="xl" fontWeight="bold">Flight Details</Text>
          <Divider my={2} />
        </Box>

        {noFlightsMessage && <Text mt={4} color="red">{noFlightsMessage}</Text>}

        {flights.map((flight, index) => (
          <Center key={index}>
            <Box borderWidth="1px" borderRadius="lg" overflow="hidden" mt={4} maxW="sm">
              <Image src={placeholderImage} alt="Flight Image" />
              <Stack spacing={3} p={4}>
                <Text fontSize="lg" fontWeight="bold">Flight {index + 1}</Text>
                <Divider />
                <Text>
                  From: {flight.location.name} ({flight.location.code})
                </Text>
                <Text>
                  To: {flight.destination.name} ({flight.destination.code})
                </Text>
                <Text>Date: {new Date(flight.date).toLocaleDateString()}</Text>
                <Text>Price: ₹{flight.price_in_inr.toFixed(2)}</Text>
                <Text>Passengers: {flight.no_of_passengers}</Text>
                <Text>Non-Stop: {flight.non_stop ? 'Yes' : 'No'}</Text>
                <Text>PaymentId: {flight.payment_receipt}</Text>
                <Button colorScheme="red" onClick={() => handleCancelTicket(flight.payment_receipt)}>Cancel Ticket</Button>
              </Stack>
            </Box>
          </Center>
        ))}
      </Box>
    </Center>
  );
};

export default ManageFlights;
