import React from 'react';
import { Box, Heading, Text, Button, VStack } from "@chakra-ui/react";
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

const ThankYou = () => {
    const [searchParams] = useSearchParams();
    const dataParam = searchParams.get("reference");
    const navigate = useNavigate();
    let data = {};
    if (dataParam) {
        data = JSON.parse(decodeURIComponent(dataParam));
    }

    const { paymentid, location_code, destination_code , date , price } = data;

    return (
        <Box 
            display="flex" 
            justifyContent="center" 
            alignItems="center" 
            minHeight="100vh" 
            bg="gray.50"
            p={4}
        >
            <Box 
                maxW="md" 
                p={8} 
                bg="white" 
                borderRadius="md" 
                boxShadow="xl"
                textAlign="center"
            >
                <VStack spacing={4}>
                    <Heading as="h1" size="2xl" color="teal.500">
                        Thank You!
                    </Heading>
                    <Text fontSize="lg" color="gray.600">
                        Your payment was successful.
                    </Text>
                    {paymentid && (
                        <Text fontSize="md" color="gray.500">
                            Your reference ID is: <strong>{paymentid}</strong>
                        </Text>
                    )}
                    {location_code && (
                        <Text fontSize="md" color="gray.500">
                            Location Code: <strong>{location_code}</strong>
                        </Text>
                    )}
                    {destination_code && (
                        <Text fontSize="md" color="gray.500">
                            Destination Code: <strong>{destination_code}</strong>
                        </Text>
                    )}
                    {date && (
                        <Text fontSize="md" color="gray.500">
                            Date: <strong>{date}</strong>
                        </Text>
                    )}
                    {price && (
                        <Text fontSize="md" color="gray.500">
                           Ticket Price: <strong>{price}</strong>
                        </Text>
                    )}
                    <Button 
                        colorScheme="teal" 
                        size="lg" 
                        onClick={() => navigate('/dashboard')}
                    >
                        Go to Homepage
                    </Button>
                </VStack>
            </Box>
        </Box>
    );
};

export default ThankYou;
