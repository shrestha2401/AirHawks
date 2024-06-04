import React from 'react'
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import { Box, Text, Stack, Image, Heading, StackDivider, Divider, ButtonGroup, Flex, Link, Button, Menu, MenuButton, MenuList, MenuItem,} from '@chakra-ui/react';
export default function ContactUs() {
  return (
    <Card>
  <CardHeader>
    <Heading size='xl'>Contact Us</Heading>
  </CardHeader>

  <CardBody>
    <Stack direction={['row']} align='center' divider={<StackDivider />} spacing='4'>
      <Box>
        <Heading size='xs' textTransform='uppercase'>
          Name 1
        </Heading>
        <Text pt='2' fontSize='sm'>
          Contact: +91-79232983293
        </Text>
        <Text fontSize='sm'>
          E-mail: a@gmail.com
        </Text>
      </Box>
      <Box>
        <Heading size='xs' textTransform='uppercase'>
          Name 2
        </Heading>
        <Text pt='2' fontSize='sm'>
          Contact: +91-79232983293
        </Text>
        <Text  fontSize='sm'>
          E-mail: a@gmail.com
        </Text>
      </Box>
    </Stack>
  </CardBody>
</Card>
  )
}
