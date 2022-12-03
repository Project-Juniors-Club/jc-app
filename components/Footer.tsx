import React from 'react';
import { Box, Flex, Link, Stack, Text, StackDivider } from '@chakra-ui/react';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer>
      <Box as='footer' role='contentinfo' mx='auto' py='4' px='24' bgColor='#262728' color='gray.200' fontSize='sm'>
        <Stack>
          <Text fontWeight='900' fontSize='2xl' mb='30px' mt='20px'>
            CONTACT US
          </Text>
          <Flex direction={['column', 'column', 'column', 'row']} align='center' justify={{ base: 'center', md: 'space-between' }}>
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
            <Box h={['100px', '100px', '100px', '120px']} w='270px'>
              <Text fontWeight='700' mb='20px'>
                We are located at:
              </Text>
              <Text>The Foodbank Singapore Pte Ltd</Text>
              <Text>218 Pandan Loop, XPACE</Text>
              <Text>Singapore 128408</Text>
            </Box>
            <Box h='100px' w='270px' display='flex' flexDirection='column' alignItems='start' justifyContent='flex-end'>
              <Text fontWeight='700' mb='10px'>
                Follow Us
              </Text>
              <Stack direction='row' spacing='4'>
                <Link href='https://www.instagram.com/foodbanksingapore/' isExternal>
                  <Image src='/assets/instagram.svg' alt='Instagram' width='18' height='18' />
                </Link>
                <Link href='https://www.facebook.com/foodbanksingapore' isExternal>
                  <Image src='/assets/facebook.svg' alt='Facebook' width='18' height='18' />
                </Link>
                <Link href='https://www.linkedin.com/company/foodbank-singapore/' isExternal>
                  <Image src='/assets/linkedin.svg' alt='linkedin' width='18' height='18' />
                </Link>
              </Stack>
            </Box>
          </Flex>
          <Stack direction='column' pt='30px'>
            <Text textAlign='center'>Copyright Foodbank 2022. All rights reserved.</Text>
            <Stack direction='row' justify='center' divider={<StackDivider borderColor='white' />}>
              <Link href='https://www.foodbank.sg/terms-of-service' isExternal textDecoration='none'>
                <Text textAlign='center'>Terms of Service</Text>
              </Link>
              <Link href='https://www.foodbank.sg/privacy-policy' isExternal textDecoration='none'>
                <Text textAlign='center'>Privacy Policy</Text>
              </Link>
              <Link href='https://www.foodbank.sg/board-policy' isExternal textDecoration='none'>
                <Text textAlign='center'>Board Policy</Text>
              </Link>
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </footer>
  );
};

export default Footer;
