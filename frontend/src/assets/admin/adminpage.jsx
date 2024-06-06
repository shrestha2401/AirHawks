
import React, { useState } from 'react';
import { Box,Button,Container,FormControl,FormLabel,Heading,Input,Stack,Switch,useDisclosure,useToast,Modal,ModalOverlay,ModalContent,ModalHeader,ModalFooter,ModalBody,ModalCloseButton,} from '@chakra-ui/react';
import { AddIcon , CloseIcon } from '@chakra-ui/icons';
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
  const { isOpen, onOpen, onClose } = useDisclosure();
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

  const handleCreateFlight = () => {
    axios.post('http://localhost:3000/create-flight' , {
      airLine: airline,
      flightNumber: flightNumber,
      locationName: locationName,
      locationCode: locationCode,
      destinationName: destinationName,
      destinationCode: destinationCode,
      date: date,
      price_in_inr: price,
      non_stop: nonStop,
      seats_available : number_of_seats,
    }).then(response=>{
      if(response.data.message=="Flight created successfully"){
        toast({
          title: 'Flight created.',
          description: 'The new flight has been created successfully.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        onClose(); 
      }
    }).catch(error => {
      console.error('Error ', error);
    });   
  };
  const handleLogout = () => {
    Logout(navigate); 
  };


  return (
    <Container centerContent>
      <Box w="100%" maxW="md" mt={8} p={8} borderWidth={1} borderRadius="lg" boxShadow="lg">
        <Heading mb={6} textAlign="center">Admin Portal</Heading>
        <Button leftIcon={<AddIcon />} colorScheme="blue" onClick={onOpen}>
          Create Flight
        </Button>
        <Button ml={4} leftIcon={<CloseIcon />} colorScheme="red" onClick={handleLogout}>
          Logout
        </Button>

        <Modal isOpen={isOpen} onClose={onClose}>
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
              <Button variant="ghost" onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </Container>
  );
};

export default AdminPortal;