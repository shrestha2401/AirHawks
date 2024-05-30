// src/FlightDetails.js
import React from 'react';
import { Box, Heading, Text, Stack, Button } from '@chakra-ui/react';

const FlightDetails = ({ booking }) => {
  return (
    <Box maxW="xl" mx="auto" p={5} borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Heading mb={4}>Flight Details</Heading>
      <Stack spacing={3}>
        <Text><strong>Booking ID:</strong> {booking.bookingId}</Text>
        <Text><strong>Passenger Name:</strong> {booking.passengerName}</Text>
        <Text><strong>Email:</strong> {booking.email}</Text>
        <Text><strong>Flight Number:</strong> {booking.flightNumber}</Text>
        <Text><strong>Departure:</strong> {booking.departure}</Text>
        <Text><strong>Arrival:</strong> {booking.arrival}</Text>
        <Text><strong>Date:</strong> {booking.date}</Text>
        <Text><strong>Seat:</strong> {booking.seat}</Text>
        <Button colorScheme="teal" onClick={() => window.print()}>Download Ticket</Button>
      </Stack>
    </Box>
  );
};

export default FlightDetails;
