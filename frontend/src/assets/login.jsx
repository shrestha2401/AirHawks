// src/Login.jsx
import React, { useContext, useState } from 'react';
import axios from 'axios';
import { Box, Button, Container, Flex, FormControl, FormLabel, Heading, Image, Input, Stack, useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './Usercontext.jsx';
import email_icon from './email.png';
import password_icon from './password.png';

const Login = () => {
  const navigate = useNavigate();
  const { setname, setEmail, setPassword } = useContext(UserContext);
  const [email, updateEmail] = useState('');
  const [password, updatePassword] = useState('');
  const toast = useToast();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3000/Login', {
        email,
        password,
      });

      toast({
        title: response.data.message,
        status: response.data.message === "Login successful" ? "success" : "error",
        duration: 5000,
        isClosable: true,
      });

      if (response.data.message === "Login successful") {
        localStorage.setItem('token', response.data.token); // Save token to localStorage
        const userResponse = await axios.get('http://localhost:3000/user', {
          headers: { Authorization: `Bearer ${response.data.token}` },
        });
        setname(userResponse.data.name); // Set the user's name in context
        setEmail(email);
        setPassword(password);
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
        <Heading mb={6} textAlign="center">Login to AirHawks</Heading>
        <Stack spacing={4}>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Flex align="center">
              <Image src={email_icon} alt="email icon" boxSize="6" mr={2} />
              <Input placeholder='E-mail' type="email" value={email} onChange={(e) => updateEmail(e.target.value)} />
            </Flex>
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Flex align="center">
              <Image src={password_icon} alt="password icon" boxSize="6" mr={2} />
              <Input placeholder='Password' type="password" value={password} onChange={(e) => updatePassword(e.target.value)} />
            </Flex>
          </FormControl>
          <Button colorScheme="green" onClick={handleLogin}>Login</Button>
        </Stack>
      </Box>
    </Container>
  );
};

export default Login;
