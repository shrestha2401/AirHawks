import React, { useState, useContext, useEffect } from 'react';
import { Box, Badge, Image, Text, Button, Flex, Divider, IconButton, Stack } from '@chakra-ui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import placeholderImage from './placeholder.jpg';
import Popup from "./Popup.jsx";
import { UserContext } from './Usercontext';
import axios from 'axios';
const FlightCard = ({ flight }) => {
  const { name } = useContext(UserContext);
  const [showPopup, setShowPopup] = useState(false);
  const [rating, setRating] = useState(0); 
  const [comment, setComment] = useState(''); 
  const [showReview, setShowReview] = useState(false); 
  const [reviews, setReviews] = useState([]); 
  const { addFlightDetail } = useContext(UserContext);
  useEffect(() => {
    if (showReview) {
      axios.post('http://localhost:3000/fetchratings', {
        flight_location: flight.location.code,
        flight_destination: flight.destination.code,
        flight_name: flight.airline
      }).then(response => {
        setReviews(response.data.flightreviews);
      }).catch(error => {
        console.error('Error fetching reviews:', error);
      });
    }
  }, [showReview]);
  const handleBookNow = () => {
    setShowPopup(true);
    addFlightDetail(flight);
  };
  const handleRatingChange = (value) => {
    setRating(value);
  };
  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };
  const handleSubmitReview = () => {
    axios.post('http://localhost:3000/add-review', {
      name: name,
      flight_location: flight.location.code,
      flight_destination: flight.destination.code,
      flight_name: flight.airline,
      starrating: rating,
      comment: comment
    }).then(response => {
      console.log(response.data); 
      alert('Review added successfully');
    }).catch(error => {
      console.error('Error adding review:', error); 
    });
  };
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" mb={5}>
      <Image src={flight.image || placeholderImage} alt={`${flight.airline} plane`} width="100%" height="200px" objectFit="cover" />
      <Box p="6">
        <Flex alignItems="center" mb={2}>
          <Badge borderRadius="full" px="2" colorScheme="teal">
            {flight.airline}
          </Badge>
        </Flex>
        <Flex alignItems="center" justifyContent="space-between">
          <Box fontWeight="bold" as="h4" lineHeight="tight" isTruncated>
            {flight.location.code}
          </Box>
          <Divider orientation="vertical" borderColor="gray.500" height="20px" />
          <Text fontWeight="semibold" as="span">
            {new Date(flight.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </Text>
          <Divider orientation="vertical" borderColor="gray.500" height="20px" />
          <Box fontWeight="bold" as="h4" lineHeight="tight" isTruncated>
            {flight.destination.code}
          </Box>
        </Flex>
        <Box mt="2">
          <Text fontWeight="semibold">Flight Number:</Text>
          {flight.flightNumber || 'Not specified'}
        </Box>
        <Box mt="2">
          <Text fontWeight="semibold">Departure:</Text>
          {new Date(flight.date).toDateString()}
        </Box>
        <Box mt="2">
          <Text fontWeight="semibold">Seats left:</Text>
          {flight.seats_available}
        </Box>
        <Box mt="2">
          <Text fontWeight="semibold">Duration:</Text>
          {flight.duration || '2.5 hours'}
        </Box>
        <Box mt="2">
          <Text fontWeight="semibold">Price:</Text>
          ₹{flight.price_in_inr}
        </Box>
        <Box mt="2">
          <Text fontWeight="semibold">Non-stop:</Text>
          {flight.non_stop ? 'Yes' : 'No'}
        </Box>
        <Flex justify="center">
          <Button colorScheme='teal' size='md' mb={5} onClick={handleBookNow}>Book Now</Button>
          {showPopup && 
            <Popup 
              baseFare={flight.price_in_inr} 
              onClose={() => setShowPopup(false)} 
              flight={flight} 
            />
          }
        </Flex>
        {!showPopup && (
          <>
            <Flex alignItems="center" justifyContent="space-between">
              <Text fontWeight="semibold">Ratings</Text>
              <IconButton
                icon={showReview ? <ChevronUpIcon /> : <ChevronDownIcon />}
                variant="ghost"
                onClick={() => setShowReview(!showReview)}
              />
            </Flex>
            {showReview && (
              <>
                <Box mt="2">
                  {reviews.length > 0 ? (
                    <Stack spacing={4}>
                      {reviews.map((review) => (
                        <Box key={review._id} p="4" borderWidth="1px" borderRadius="lg" boxShadow="sm">
                          <Flex justifyContent="space-between">
                            <Text fontWeight="bold">{review.name}</Text>
                            <Text fontWeight="semibold">{review.rating} ★</Text>
                          </Flex>
                          <Text mt="2">{review.comment}</Text>
                        </Box>
                      ))}
                    </Stack>
                  ) : (
                    <Text>No reviews yet.</Text>
                  )}
                </Box>
                <Box mt="4">
                  <Text fontWeight="semibold">Rate this flight:</Text>
                  {[...Array(5)].map((_, index) => (
                    <Button
                      key={index}
                      colorScheme={index < rating ? 'teal' : 'gray'}
                      size="sm"
                      onClick={() => handleRatingChange(index + 1)}
                      mr={2}
                    >
                      ★
                    </Button>
                  ))}
                </Box>
                <Box mt="4">
                  <Text fontWeight="semibold">Leave a comment:</Text>
                  <textarea
                    rows="4"
                    cols="50"
                    value={comment}
                    onChange={handleCommentChange}
                    placeholder="Write your comment here..."
                    style={{ width: '100%', padding: '8px', borderRadius: '4px', borderColor: 'gray.200', marginTop: '4px' }}
                  />
                </Box>
                <Button colorScheme="teal" mt={4} onClick={handleSubmitReview}>
                  Submit Review
                </Button>
              </>
            )}
          </>
        )}
      </Box>
    </Box>  
  );
};
export default FlightCard;
