import React, { useState, useEffect } from 'react';
import { Box, Flex, Link, Button, Menu, MenuButton, MenuList, MenuItem, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import  { jwtDecode }  from 'jwt-decode'; // Library for decoding JWT tokens

const logout = (navigate) => {
  localStorage.removeItem('token');  // Remove the token from local storage
  sessionStorage.clear();
  navigate('/');  // Redirect to login or home page
};

export default function Navbar(props) {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');

  const handleLogout = () => {
    logout(navigate);  // Call the logout function
  };

  return (
    <Box bg="blue.500" px={4}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <Flex alignItems="center">
          {/* <Text mr={4}>Hi, {username}</Text> */}
          {/* <Link href="/Homepage" mr={4}>Home</Link> */}
          <Menu>
          <Button as={Button} mr = {4}>Home</Button>
            <MenuButton as={Button}>Info</MenuButton>
            <MenuList>
              <MenuItem href="#">Manage Your Flight</MenuItem>
              <MenuItem href="#">Flight Status</MenuItem>
              <MenuItem href="#">Contact Us</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
        <Button onClick={handleLogout}>Logout</Button>
      </Flex>
    </Box>
  );
}
