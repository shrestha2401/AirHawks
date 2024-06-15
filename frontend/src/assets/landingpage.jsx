import React from 'react';
import { Box, Button, Flex, Heading, Spacer } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import backgroundimage from './background.jpg';
const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <Box bg="gray.50" minH="100vh"
    h="100vh"
      // backgroundImage="url('https://images.unsplash.com/photo-1606768666853-403c90a981ad?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"
      backgroundImage={backgroundimage}
      backgroundSize="cover"
      backgroundPosition="center"
    
    >
      <Flex as="nav" bg="white" py={4} px={8} boxShadow="sm" align="center">
        <Heading size="lg">AirHawks</Heading>
        <Spacer />
        <Button colorScheme="blue" mr={4} onClick={() => navigate('/login')}>Login</Button>
        <Button colorScheme="green" onClick={() => navigate('/signup')}>Sign Up</Button>
        <Button colorScheme="red" ml={4} marginLeft={4} onClick={() => navigate('/admin-login')}>Admin Login</Button>
      </Flex>
      <Box p={9} mt="10">
      <Heading w="80%" mx="auto" textAlign="center" h="50%" size="2xl">
        Welcome to AirHawks
      </Heading>
      <Heading w="80%" mx="auto" textAlign="center" h="50%" size="md" color='tomato'>
        Your Ultimate Flight Booking Solution
      </Heading>
    </Box>
    </Box>
  );
};

export default LandingPage;
