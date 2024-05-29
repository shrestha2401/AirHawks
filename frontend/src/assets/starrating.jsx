// StarRating.js
import React, { useState } from 'react';
import Rating from 'react-rating-stars-component';
import { Box, Button, FormControl, FormLabel, Select, Stack } from '@chakra-ui/react';

const StarRating = ({ onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleSubmit = () => {
    onSubmit({ rating, review });
    setRating(0);
    setReview('');
  };

  return (
    <Box>
      <h2>Add a Review</h2>
      <Rating
        count={5}
        value={rating}
        onChange={handleRatingChange}
        size={24}
        activeColor="#ffd700"
      />
      <textarea
        value={review}
        onChange={(e) => setReview(e.target.value)}
        placeholder="Write your review here..."
        rows="4"
        cols="50"
      />
      <Button colorScheme='teal' onClick={handleSubmit}>Submit Review</Button>
    </Box>
  );
};

export default StarRating;
