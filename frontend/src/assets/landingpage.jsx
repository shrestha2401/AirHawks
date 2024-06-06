// src/LandingPage.jsx
import React from 'react';
import { Box, Button, Container, Flex, Heading, Spacer } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <Box bg="gray.50" minH="100vh">
      <Flex as="nav" bg="white" py={4} px={8} boxShadow="sm" align="center">
        <Heading size="lg">AirHawks</Heading>
        <Spacer />
        <Button colorScheme="blue" mr={4} onClick={() => navigate('/login')}>Login</Button>
        <Button colorScheme="green" onClick={() => navigate('/signup')}>Sign Up</Button>
      </Flex>
      <Container centerContent mt={24}>
        <Heading as="h1" size="2xl" mb={4}>
          Welcome to AirHawks
        </Heading>
        <Heading as="h2" size="lg" color="gray.600">
          Your Ultimate Flight Booking Solution
        </Heading>
      </Container>
    </Box>
  );
};

export default LandingPage;
