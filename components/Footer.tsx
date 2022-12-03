import React from 'react';
import { Box, Flex, Link, Stack, Text } from '@chakra-ui/react';
import Image from 'next/image';

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
            <Box h='100px' w='170px' display='flex' flexDirection='column' justifyContent='center'>
              <Text fontWeight='700' mb='10px'>
                Follow Us
              </Text>
              <Stack direction='row' spacing='4' ml='15px'>
                <Link href='https://www.instagram.com/foodbanksingapore/' isExternal>
                  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512' width='18' height='18' fill='white'>
                    <path d='M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z' />
                  </svg>
                </Link>
                <Link href='https://www.facebook.com/foodbanksingapore' isExternal>
                  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 512' width='18' height='18' fill='white'>
                    <path d='M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z' />
                  </svg>
                </Link>
                <Link href='https://www.linkedin.com/company/foodbank-singapore/' isExternal>
                  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512' width='18' height='18' fill='white'>
                    <path d='M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z' />
                  </svg>
                </Link>
              </Stack>
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
