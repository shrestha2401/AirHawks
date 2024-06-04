import React from 'react'
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import { Box, Text, Stack, Image, Heading, Divider, ButtonGroup, Flex, Link, Button, Menu, MenuButton, MenuList, MenuItem,} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';


export default function Manageflights() {
    const navigate= useNavigate();
    const NavContactUS = () => {
        navigate('/contactus');
    };
    
  return (
    <Card maxW='sm' mx='10' my='5'>
  <CardBody>
    <Image
      src='https://images.pexels.com/photos/62623/wing-plane-flying-airplane-62623.jpeg?cs=srgb&dl=pexels-pixabay-62623.jpg&fm=jpg'
      alt='Green double couch with wooden legs'
      borderRadius='lg'
    />
    <Stack mt='6' spacing='3'>
      <Heading size='md'>Manage Your Flight</Heading>
      <Text>
        Flight Number EA3D49
      </Text>
      <Text color='blue.600' fontSize='2xl'>
        12550 INR
      </Text>
    </Stack>
  </CardBody>
  
  <CardFooter>
    <ButtonGroup spacing='2'>
      <Button variant='solid' colorScheme='blue'>
        Cancel Ticket
      </Button>
      <Button variant='ghost' colorScheme='blue' onClick={NavContactUS}>
        Contact Support
      </Button>
    </ButtonGroup>
  </CardFooter>
</Card>
  )
}
