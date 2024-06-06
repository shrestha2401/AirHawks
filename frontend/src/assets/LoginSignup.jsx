// src/LoginSignup.jsx
import React, { useContext, useState } from 'react';
import axios from 'axios';
import { Box, Button, Container, Flex, FormControl, FormLabel, Heading, Image, Input, Stack, useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './Usercontext.jsx';
import user_icon from './person.png';
import email_icon from './email.png';
import password_icon from './password.png';

const LoginSignup = () => {
  const navigate = useNavigate();
  const { name, setname, email, setEmail, password, setPassword } = useContext(UserContext);
  const [action, setAction] = useState("Sign-Up");
  const toast = useToast();

  const handleAction = async (actionType) => {
    try {
      let response;
      if (actionType === "Sign-Up") {
        response = await axios.post('http://localhost:3000/Signup', {
          name: name,
          email: email,
          password: password
        });
      } else if (actionType === "Login") {
        response = await axios.post('http://localhost:3000/Login', {
          email: email,
          password: password
        });
      }
      toast({
        title: response.data.message,
        status: response.data.message === "Success" || response.data.message === "Login successful" ? "success" : "error",
        duration: 5000,
        isClosable: true,
      });
      if (response.data.message === "Success" || response.data.message === "Login successful") {
        localStorage.setItem('token', response.data.token); // Save token to localStorage
        navigate('/dashboard');
      }
    } catch (error) {
      const errorMessage = error.response && error.response.data ? error.response.data.message : 'An error occurred. Please try again.';
      toast({
        title: errorMessage,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Container centerContent>
      <Box bg="white" p={8} borderRadius="lg" boxShadow="lg" w="100%" maxW="md">
        <Heading mb={6} textAlign="center">Welcome to AirHawks</Heading>
        <Stack spacing={4}>
          {action === "Login" ? null : (
            <FormControl>
              <FormLabel>Username</FormLabel>
              <Flex align="center">
                <Image src={user_icon} alt="user icon" boxSize="6" mr={2} />
                <Input placeholder='Username' type="text" value={name} onChange={(e) => setname(e.target.value)} />
              </Flex>
            </FormControl>
          )}
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Flex align="center">
              <Image src={email_icon} alt="email icon" boxSize="6" mr={2} />
              <Input placeholder='E-mail' type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </Flex>
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Flex align="center">
              <Image src={password_icon} alt="password icon" boxSize="6" mr={2} />
              <Input placeholder='Password' type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </Flex>
          </FormControl>
          <Stack spacing={4} direction="row" justify="center">
            <Button colorScheme={action === "Login" ? "gray" : "blue"} onClick={() => handleAction("Sign-Up")}>Sign Up</Button>
            <Button colorScheme={action === "Sign-Up" ? "gray" : "green"} onClick={() => handleAction("Login")}>Login</Button>
          </Stack>
        </Stack>
      </Box>
    </Container>
  );
};

export default LoginSignup;
