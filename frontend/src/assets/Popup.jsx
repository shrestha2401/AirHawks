import React, { useState } from "react";
import { Box, Text, Button, Flex } from "@chakra-ui/react";
// import PayNow from "./Payment-Gtw/PayNow";
// require('dotenv').config();

function Popup({ baseFare, onClose }) {
    const [passengerCount, setPassengerCount] = useState(1);
    const taxRate = 0.10;

    const incrementPassengers = () => {
        setPassengerCount(passengerCount + 1);
    };

    const decrementPassengers = () => {
        if (passengerCount > 1) {
            setPassengerCount(passengerCount - 1);
        }
    };

    const finalPrice = (baseFare * passengerCount) * (1 + taxRate);

    return (
        <Flex
            position="fixed"
            top="0"
            left="0"
            width="100%"
            height="100%"
            backgroundColor="rgba(0, 0, 0, 0.5)"
            justifyContent="center"
            alignItems="center"
        >
            <Box
                backgroundColor="white"
                p={5}
                borderRadius="md"
                boxShadow="md"
                width="300px"
                position="relative"
            >
                <Button
                    onClick={onClose}
                    position="absolute"
                    top="10px"
                    right="10px"
                    background="none"
                    border="none"
                    fontSize="20px"
                    cursor="pointer"
                >
                    &times;
                </Button>
                <Text as="h2" fontSize="xl" mb={4}>
                    Booking Summary
                </Text>
                <Flex alignItems="center" mb={4}>
                    <Text mr={2}>Number of Passengers:</Text>
                    <Button onClick={decrementPassengers} size="sm" mr={2}>
                        -
                    </Button>
                    <Text>{passengerCount}</Text>
                    <Button onClick={incrementPassengers} size="sm" ml={2}>
                        +
                    </Button>
                </Flex>
                <Box mb={4}>
                    <Text>Base Fare: INR- {baseFare.toFixed(2)}</Text>
                    <Text>Tax Rate:  {taxRate * 100}%</Text>
                    <Text>Final Price: INR- {finalPrice.toFixed(2)}</Text>
                </Box>
                <Button colorScheme="teal" width="100%" onClick={onClose}>
                    Pay Now
                </Button>
            </Box>
        </Flex>
    );
}

export default Popup;
