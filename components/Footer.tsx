import React from 'react';
import { Box, Flex, Link, Stack, Text } from '@chakra-ui/react';

const Footer = () => {
  return (
    <footer>
      <Box as='footer' role='contentinfo' mx='auto' py='4' px='24' bgColor='#262728' color='gray.200' fontSize='md'>
        <Stack fontSize='md'>
          <Text fontWeight='900' fontSize='2xl' mb='30px' mt='20px'>
            CONTACT US
          </Text>
          <Flex direction={{ sm: 'column', md: 'column', lg: 'row' }} align='center' justify={{ base: 'center', md: 'space-between' }}>
            <Box h='100px' w='270px'>
              <Text fontWeight='700' mb='20px'>
                Donor, Media &amp; General Enquiries
              </Text>
              <Link href='mailto:enquiries@foodbank.sg' textDecoration='none'>
                <Text>Email: enquiries@foodbank.sg</Text>
              </Link>
              <Link href='tel:+656336 3363' textDecoration='none'>
                <Text>Tel: +65 9855 4805</Text>
              </Link>
            </Box>
            <Box h='100px' w='270px'>
              <Text fontWeight='700' mb='20px'>
                Volunteers
              </Text>
              <Link href='mailto:volunteer@foodbank.sg' textDecoration='none'>
                <Text>Contact: volunteer@foodbank.sg</Text>
              </Link>
            </Box>
            <Box h='100px' w='270px'>
              <Text fontWeight='700' mb='20px'>
                We are located at:
              </Text>
              <Text>The Foodbank Singapore Pte Ltd</Text>
              <Text>218 Pandan Loop, XPACE</Text>
              <Text>Singapore 128408</Text>
            </Box>
            <Box h='100px' w='170px' display='flex' flexDirection='row' alignItems='center'>
              <Text fontWeight='700'>Follow Us</Text>
            </Box>
          </Flex>
          <Stack direction='column' spacing='-1' pt='45px'>
            <Text textAlign='center'>Copyright Foodbank 2022. All rights reserved.</Text>
            <Flex direction='row' align='center' justify='center'>
              <Link href='https://www.foodbank.sg/terms-of-service' isExternal textDecoration='none'>
                <Text textAlign='center' px='1'>
                  Terms of Service
                </Text>
              </Link>
              <Text>|</Text>
              <Link href='https://www.foodbank.sg/privacy-policy' isExternal textDecoration='none'>
                <Text textAlign='center' px='1'>
                  Privacy Policy
                </Text>
              </Link>
              <Text>|</Text>
              <Link href='https://www.foodbank.sg/board-policy' isExternal textDecoration='none'>
                <Text textAlign='center' px='1'>
                  Board Policy
                </Text>
              </Link>
            </Flex>
          </Stack>
        </Stack>
      </Box>
    </footer>
  );
};

export default Footer;
