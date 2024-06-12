import React from 'react'
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import { Box, Text, Stack, Heading, Flex, Icon, Link } from '@chakra-ui/react';
import { PhoneIcon, EmailIcon } from '@chakra-ui/icons';

export default function ContactUs() {
  return (
    <Flex justify="center" align="center" height="100vh" bg="gray.50" p={5}>
      <Card maxW="2xl" boxShadow="lg" borderRadius="md">
        <CardHeader bg="teal.500" color="white" borderTopRadius="md">
          <Heading size='xl' textAlign="center">Contact Us</Heading>
        </CardHeader>
        
        <CardBody>
          <Stack spacing={5}>
            <Box p={4} borderWidth="1px" borderRadius="md" borderColor="gray.200">
              <Heading size='md' textTransform='uppercase' color="teal.600">
                Shrestha Pandey
              </Heading>
              <Flex align="center" pt='2'>
                <Icon as={PhoneIcon} color="teal.500" mr={2} />
                <Text fontSize='md'>
                  +91-9140XXXXXX
                </Text>
              </Flex>
              <Flex align="center">
                <Icon as={EmailIcon} color="teal.500" mr={2} />
                <Link href="mailto:shresthapandey69@gmail.com" fontSize='md'>
                  shresthapandey69@gmail.com
                </Link>
              </Flex>
            </Box>
            
            <Box p={4} borderWidth="1px" borderRadius="md" borderColor="gray.200">
              <Heading size='md' textTransform='uppercase' color="teal.600">
                Krishna Agarwal
              </Heading>
              <Flex align="center" pt='2'>
                <Icon as={PhoneIcon} color="teal.500" mr={2} />
                <Text fontSize='md'>
                  +91-7049XXXXX
                </Text>
              </Flex>
              <Flex align="center">
                <Icon as={EmailIcon} color="teal.500" mr={2} />
                <Link href="mailto:helloworlditsmekrisz@gmail.com" fontSize='md'>
                  helloworlditsmekrisz@gmail.com
                </Link>
              </Flex>
            </Box>
          </Stack>
        </CardBody>
      </Card>
    </Flex>
  )
}
