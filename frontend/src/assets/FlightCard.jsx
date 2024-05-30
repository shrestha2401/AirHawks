import React, { useState } from 'react';
import { Box, Badge, Image, Text, Button, Flex, Divider } from '@chakra-ui/react';
import placeholderImage from './placeholder.jpg';
import Popup from "./Popup.jsx";
import Comments from './comments.jsx';

const FlightCard = ({ flight }) => {
  const [showPopup, setShowPopup] = useState(false);
  const baseFare = flight.price_in_inr;

  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" mb={5}>
      <Image src={flight.image || placeholderImage} alt={`${flight.airline} plane`} width="100%" height="200px" objectFit="cover" />

      <Box p="6">
        <Flex alignItems="center" mb={2}>
          <Badge borderRadius="full" px="2" colorScheme="teal">
            {flight.airline}
          </Badge>
        </Flex>

        <Flex alignItems="center" justifyContent="space-between">
          <Box fontWeight="bold" as="h4" lineHeight="tight" isTruncated>
            {flight.location.code}
          </Box>
          <Divider orientation="vertical" borderColor="gray.500" height="20px" />
          <Text fontWeight="semibold" as="span">
            {new Date(flight.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </Text>
          <Divider orientation="vertical" borderColor="gray.500" height="20px" />
          <Box fontWeight="bold" as="h4" lineHeight="tight" isTruncated>
            {flight.destination.code}
          </Box>
        </Flex>

        <Box mt="2">
          <Text fontWeight="semibold">Flight Number:</Text>
          {flight.flightNumber || 'Not specified'}
        </Box>

        <Box mt="2">
          <Text fontWeight="semibold">Departure:</Text>
          {new Date(flight.date).toDateString()}
        </Box>

        <Box mt="2">
          <Text fontWeight="semibold">Duration:</Text>
          {flight.duration || '2.5 hours'}
        </Box>

        <Box mt="2">
          <Text fontWeight="semibold">Price:</Text>
          ₹{flight.price_in_inr}
        </Box>

        <Box mt="2">
          <Text fontWeight="semibold">Non-stop:</Text>
          {flight.non_stop ? 'Yes' : 'No'}
        </Box>
      </Box>
      
      <Flex justify="center">
        <Button colorScheme='teal' size='md' mb={5} onClick={() => setShowPopup(true)} >Book Now</Button>
        {showPopup && 
          <Popup 
            baseFare={baseFare} 
            onClose={() => setShowPopup(false)} 
          />
        }
      </Flex>
      <Comments/>
      </Box>  
  );
};

export default FlightCard;
