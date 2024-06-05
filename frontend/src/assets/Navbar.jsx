import React, { useState, useEffect } from 'react';
import { Box, Flex, Link, Button, Menu, MenuButton, MenuList, MenuItem, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
const Logout = (navigate) => {
  localStorage.removeItem('token'); 
  localStorage.removeItem('name');
  localStorage.removeItem('email');
  sessionStorage.clear();
  navigate('/'); 
};

export default function Navbar(props) {
  const navigate = useNavigate();
  // const [username, setUsername] = useState('');

  const handleLogout = () => {
    Logout(navigate); 
  };

  return (
    <Box bg="blue.500" px={4}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <Flex alignItems="center">
          <Menu>
            <MenuButton as={Button}>Info</MenuButton>
            <MenuList>
              <MenuItem as='a' href="/manage">Manage Your Flight</MenuItem>
              <MenuItem as='a' href="/contactus">Contact Us</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
        <Button onClick={handleLogout}>Logout</Button>
      </Flex>
    </Box>
  );
}
