// src/components/FlightCard.js
import React from 'react';
import { Box, Badge, Image, Text } from '@chakra-ui/react';
import { Button, ButtonGroup } from '@chakra-ui/react'

const FlightCard = ({ flight }) => {
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" mb={5}>
      <Image src={flight.image} alt={`${flight.airline} plane`} width="100%" height="200px" objectFit="cover" />

      <Box p="6">
        <Box display="flex" alignItems="baseline">
          <Badge borderRadius="full" px="2" colorScheme="teal">
            {flight.airline}
          </Badge>
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            ml="2"
          >
            {flight.origin} &bull; {flight.destination}
          </Box>
        </Box>

        <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
          {flight.flightNumber}
        </Box>

        <Box>
          Departure: {flight.departureTime}
          <Box as="span" color="gray.600" fontSize="sm">
            / {flight.departureDate}
          </Box>
        </Box>

        <Box>
          Arrival: {flight.arrivalTime}
          <Box as="span" color="gray.600" fontSize="sm">
            / {flight.arrivalDate}
          </Box>
        </Box>

        <Box display="flex" mt="2" alignItems="center">
          <Text as="span" color="gray.600" fontSize="sm">
            Duration: {flight.duration}
          </Text>
        </Box>
      </Box>
      <Box display="flex" justifyContent="center"><Button colorScheme='teal'   size='md' mb={5}>Book Now</Button></Box>
    </Box>
  );
};

export default FlightCard;
