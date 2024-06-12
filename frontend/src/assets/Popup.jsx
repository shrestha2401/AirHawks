import React, { useContext, useState } from 'react';
import { Box, Text, Button, Flex } from "@chakra-ui/react";
import { UserContext } from './Usercontext.jsx';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';

const Popup = ({ baseFare, onClose, flight }) => {
    const [passengerCount, setPassengerCount] = useState(1);
    const { name, email, flights_attended } = useContext(UserContext);
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
                name: name,
                amount: Math.round(finalPrice * 100), 
                currency: "INR",
                receipt: uuidv4(),
            });

            const order = response.data;
            console.log(order);

            const options = {
                key: import.meta.env.RAZORPAY_KEY_ID,
                amount: order.amount, 
                currency: order.currency,
                name: "AirHawks", 
                description: "Test Transaction",
                order_id: order.id,
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
                    console.log(jsonRes.paymentId);
                    const flightd = {
                        paymentid: jsonRes.paymentId,
                        location_code: flight.location.code,
                        destination_code: flight.destination.code,
                        date : flight.date,
                        price : finalPrice
                    };
                 
                    const jsonString = JSON.stringify(flightd);

                    if (jsonRes.msg === 'success') {
                        await axios.post('http://localhost:3000/save-flight', {
                            email: email, 
                            flights_details: [
                                {
                                    location: {
                                        code: flight.location.code,
                                        name: flight.location.name,
                                    },
                                    no_of_passengers: passengerCount,
                                    destination: {
                                        code: flight.destination.code,
                                        name: flight.destination.name,
                                    },
                                    date: flight.date,
                                    price_in_inr: finalPrice,
                                    non_stop: flight.non_stop, 
                                    payment_receipt: jsonRes.paymentId,
                                },
                            ],
                        });
                        await axios.post('http://localhost:3000/update-flightcount' , {
                            email : email,
                        });
                        await axios.post('http://localhost:3000/seat-dec' , {
                            flightnumber : flight.flightNumber,
                        });
                        toast.success('Your Payment was successful');
                        navigate(`/thankyou?reference=${jsonString}`);
                       
                    } else {
                        alert('Payment validation failed. Please try again.');
                    }
                },
                prefill: {
                    name: name,
                    email: email,
                    contact: "9000000000", 
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
                toast.error('An error occurred. Please try again.');
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
                    <Text>Passenger Name: {name}</Text>
                    <Text>Boarding Point: {flight.location.code}</Text>
                    <Text>Landing Point: {flight.destination.code}</Text>
                    <Text>Time: {new Date(flight.date).toLocaleString()}</Text>
                    <Text>Duration: 2.5 hours</Text>
                    <Text>Seats Available: {flight.seats_available}</Text>
                    <Text>Base Fare: INR {baseFare.toFixed(2)}</Text>
                    <Text>Tax Rate: {taxRate * 100}%</Text>
                    <Text>Final Price: INR {finalPrice.toFixed(2)}</Text>
                </Box>
                <Button colorScheme="teal" width="100%" onClick={handlePay} isDisabled={flight.seats_available < 1}>
                    Pay Now
                </Button>
            </Box>
        </Flex>
    );
};

export default Popup;
