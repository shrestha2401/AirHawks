import React, { useState } from 'react';
import { 
  Box, Button, Container, FormControl, FormLabel, Heading, Input, Stack, Switch, useDisclosure, useToast, 
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, HStack 
} from '@chakra-ui/react';
import { AddIcon, CloseIcon, DeleteIcon } from '@chakra-ui/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Logout = (navigate) => {
  localStorage.removeItem('adminToken');
  localStorage.removeItem('name');
  localStorage.removeItem('email');
  sessionStorage.clear();
  navigate('/');
};

const AdminPortal = () => {
  const navigate = useNavigate();
  const { isOpen: isFlightOpen, onOpen: onFlightOpen, onClose: onFlightClose } = useDisclosure();
  const { isOpen: isUserOpen, onOpen: onUserOpen, onClose: onUserClose } = useDisclosure();
  const toast = useToast();

  const [airline, setAirline] = useState('');
  const [flightNumber, setFlightNumber] = useState('');
  const [locationName, setLocationName] = useState('');
  const [locationCode, setLocationCode] = useState('');
  const [destinationName, setDestinationName] = useState('');
  const [destinationCode, setDestinationCode] = useState('');
  const [date, setDate] = useState('');
  const [price, setPrice] = useState('');
  const [number_of_seats, setSeats] = useState('');
  const [nonStop, setNonStop] = useState(false);
  const [email, setEmail] = useState('');

  const handleCreateFlight = () => {
    axios.post('http://localhost:3000/create-flight', {
      airLine: airline,
      flightNumber: flightNumber,
      locationName: locationName,
      locationCode: locationCode,
      destinationName: destinationName,
      destinationCode: destinationCode,
      date: date,
      price_in_inr: price,
      non_stop: nonStop,
      seats_available: number_of_seats,
    }).then(response => {
      if (response.data.message === "Flight created successfully") {
        toast({
          title: 'Flight created.',
          description: 'The new flight has been created successfully.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        onFlightClose();
      }
    }).catch(error => {
      console.error('Error ', error);
      toast({
        title: 'Error creating flight.',
        description: 'An error occurred while creating the flight.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    });
  };

  const handleDeleteUser = () => {
    axios.post('http://localhost:3000/delete-user', {
      email: email,
    }).then(response => {
      if (response.data.message === "User deleted successfully") {
        toast({
          title: 'User deleted.',
          description: 'The user has been deleted successfully.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        onUserClose();
      } else {
        toast({
          title: 'User not found.',
          description: 'The user with the given email does not exist.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    }).catch(error => {
      console.error('Error ', error);
      toast({
        title: 'Error deleting user.',
        description: 'An error occurred while deleting the user.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    });
  };

  const handleLogout = () => {
    Logout(navigate);
  };

  return (
    <Container centerContent>
      <Box w="100%" maxW="md" mt={8} p={8} borderWidth={1} borderRadius="lg" boxShadow="lg">
        <Heading mb={6} textAlign="center">Admin Portal</Heading>
        <HStack spacing={4} wrap="wrap">
          <Button leftIcon={<AddIcon />} colorScheme="blue" onClick={onFlightOpen} minW="150px" p={4}>
            Create Flight
          </Button>
          <Button leftIcon={<DeleteIcon />} colorScheme="orange" onClick={onUserOpen} minW="150px" p={4}>
            Delete User
          </Button>
          <Button leftIcon={<CloseIcon />} colorScheme="red" onClick={handleLogout} minW="150px" p={4}>
            Logout
          </Button>
        </HStack>

        {/* Create Flight Modal */}
        <Modal isOpen={isFlightOpen} onClose={onFlightClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Create Flight</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Stack spacing={4}>
                <FormControl>
                  <FormLabel>Airline</FormLabel>
                  <Input value={airline} onChange={(e) => setAirline(e.target.value)} />
                </FormControl>
                <FormControl>
                  <FormLabel>Flight Number</FormLabel>
                  <Input value={flightNumber} onChange={(e) => setFlightNumber(e.target.value)} />
                </FormControl>
                <FormControl>
                  <FormLabel>Location Name</FormLabel>
                  <Input value={locationName} onChange={(e) => setLocationName(e.target.value)} />
                </FormControl>
                <FormControl>
                  <FormLabel>Location Code</FormLabel>
                  <Input value={locationCode} onChange={(e) => setLocationCode(e.target.value)} />
                </FormControl>
                <FormControl>
                  <FormLabel>Destination Name</FormLabel>
                  <Input value={destinationName} onChange={(e) => setDestinationName(e.target.value)} />
                </FormControl>
                <FormControl>
                  <FormLabel>Destination Code</FormLabel>
                  <Input value={destinationCode} onChange={(e) => setDestinationCode(e.target.value)} />
                </FormControl>
                <FormControl>
                  <FormLabel>Number of Seats</FormLabel>
                  <Input value={number_of_seats} onChange={(e) => setSeats(e.target.value)} />
                </FormControl>
                <FormControl>
                  <FormLabel>Date</FormLabel>
                  <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                </FormControl>
                <FormControl>
                  <FormLabel>Price</FormLabel>
                  <Input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
                </FormControl>
                <FormControl display="flex" alignItems="center">
                  <FormLabel htmlFor="non-stop" mb="0">
                    Non-Stop
                  </FormLabel>
                  <Switch id="non-stop" isChecked={nonStop} onChange={(e) => setNonStop(e.target.checked)} />
                </FormControl>
              </Stack>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={handleCreateFlight}>
                Create
              </Button>
              <Button variant="ghost" onClick={onFlightClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        {/* Delete User Modal */}
        <Modal isOpen={isUserOpen} onClose={onUserClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Delete User</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Stack spacing={4}>
                <FormControl>
                  <FormLabel>Email</FormLabel>
                  <Input value={email} onChange={(e) => setEmail(e.target.value)} />
                </FormControl>
              </Stack>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="orange" mr={3} onClick={handleDeleteUser}>
                Delete
              </Button>
              <Button variant="ghost" onClick={onUserClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </Container>
  );
};

export default AdminPortal;
