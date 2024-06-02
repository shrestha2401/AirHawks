import React from 'react';
import { Box, Heading, Text, Button, VStack } from "@chakra-ui/react";
import { useSearchParams } from 'react-router-dom';
const ThankYou = () => {
    const searchQuery = useSearchParams()[0];
    const paymentid = searchQuery.get("reference");
    console.log(paymentid);
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
                    <Button 
                        colorScheme="teal" 
                        size="lg" 
                        onClick={() => window.location.href = '/dashboard'}
                    >
                        Go to Homepage
                    </Button>
                </VStack>
            </Box>
        </Box>
    );
};

export default ThankYou;