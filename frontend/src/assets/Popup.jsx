
import React, { useContext, useState } from 'react';
import { Box, Text, Button, Flex } from "@chakra-ui/react";
import { UserContext } from './Usercontext.jsx';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const Popup = ({ baseFare, onClose }) => {
    const [passengerCount, setPassengerCount] = useState(1);
    const { username } = useContext(UserContext);
    const navigate = useNavigate();
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

    const handlePay = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/order', {
                name: username,
                amount: Math.round(finalPrice * 100), // Razorpay expects the amount in paise
                currency: "INR",
                receipt: uuidv4(),
            });

            const order = response.data;
            console.log(order);

            const options = {
                key: import.meta.env.RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
                amount: order.amount, // Amount is in currency subunits. Default currency is INR.
                currency: order.currency,
                name: "AirHawks", // your business name
                description: "Test Transaction",
                order_id: order.id, // This is a sample Order ID. Pass the `id` obtained in the response of Step 1
                handler: async function (response) {
                    const body = {
                        ...response,
                    };

                    const validateRes = await axios.post(
                        "http://localhost:3000/order/validate",
                        body,
                        {
                            headers: {
                                "Content-Type": "application/json",
                            },
                        }
                    );
                    const jsonRes = validateRes.data;
                    console.log(jsonRes);
                    if (jsonRes.msg === 'success') {
                        alert('Payment successful!');
                        navigate('/dashboard'); // Navigate to the dashboard or appropriate page on success
                    } else {
                        alert('Payment validation failed. Please try again.');
                    }
                },
                prefill: {
                    name: username, // your customer's name
                    email: "webdevmatrix@example.com",
                    contact: "9000000000", // Provide the customer's phone number for better conversion rates
                },
                notes: {
                    address: "Razorpay Corporate Office",
                },
                theme: {
                    color: "#3399cc",
                },
            };
            var rzp1 = new window.Razorpay(options);
            rzp1.on("payment.failed", function (response) {
                console.log(response.error.code);
                console.log(response.error.description);
                alert(response.error.description);
                console.log(response.error.source);
                console.log(response.error.step);
                console.log(response.error.reason);
                console.log(response.error.metadata.order_id);
                console.log(response.error.metadata.payment_id);
            });
            rzp1.open();
        } catch (error) {
            if (error.response && error.response.data) {
                alert("Some issue occurred: " + error.response.data.message);
            } else {
                console.error('Error:', error);
                alert('An error occurred. Please try again.');
            }
        }
    };

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
                    <Text>Passenger Name: {username}</Text>
                    <Text>Base Fare: INR {baseFare.toFixed(2)}</Text>
                    <Text>Tax Rate: {taxRate * 100}%</Text>
                    <Text>Final Price: INR {finalPrice.toFixed(2)}</Text>
                </Box>
                <Button colorScheme="teal" width="100%" onClick={handlePay}>
                    Pay Now
                </Button>
            </Box>
        </Flex>
    );
};

export default Popup;
