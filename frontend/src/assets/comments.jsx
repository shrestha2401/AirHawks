import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Select, Stack } from '@chakra-ui/react';
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
  } from '@chakra-ui/react'
  import StarRating from './starrating';


export default function Comments() {
  const [reviews, setReviews] = useState([]);

  const handleReviewSubmit = (review) => {
    // Here you would typically send the review to a server
    // For now, we'll just add it to the local state
    setReviews([...reviews, review]);
  };
  return (
    <div>
      <Accordion allowToggle>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box as='span' flex='1' textAlign='left'>
                  Rating & Reviews
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
            <StarRating onSubmit={handleReviewSubmit} />
            <ul>
        {reviews.map((review, index) => (
          <li key={index}>
            <div>Rating: {review.rating} stars</div>
            <div>Review: {review.review}</div>
          </li>
        ))}
      </ul>
            </AccordionPanel>
          </AccordionItem>

          
        </Accordion>
    </div>
  )
}

