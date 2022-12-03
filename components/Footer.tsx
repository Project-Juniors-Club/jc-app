import { Box, HStack, Icon, Text } from '@chakra-ui/react';

import favicon from '../public/favicon.ico';

const Footer = () => {
  return (
    <Box className='bg-[#262728] justify-center items-center'>
      <Box className='w-11/12 mx-auto justify-center items-center flex-col' py={10}>
        <Box className='text-inherit'>
          <Text className='text-[#FFFFFF] font-bold text-3xl mb-10'>
            <strong>CONTACT US</strong>
          </Text>
        </Box>
        <div className='grid grid-rows-3 grid-cols-4 grid-flow-col gap-4 text-[#FFFFFF] mb-10'>
          <div className='font-bold'>Donor, Media & General Enquiries</div>
          <div className='row-span-2'>
            <p>Email: enquiries@foodbank.sg</p>
            <p>Tel: +65 9855 4805</p>
          </div>
          <div className='font-bold'>Volunteers</div>
          <div className='row-span-2'>
            <p>Contact: volunteer@foodbank.sg</p>
          </div>
          <div className='font-bold'>We are located at:</div>
          <div className='row-span-2'>
            <p>The Foodbank Singapore Ltd</p>
            <p>218 Pandan Loop, XPACE</p>
            <p>Singapore, 128408</p>
          </div>
          <div className='row-start-2 row-span-2 font-bold'>
            <p>Follow Us</p>
            <HStack className='h-fit'>
              <link rel='icon' type='image/png' href='favicon.src' />
              <link rel='icon' type='image/png' href='favicon.src' />
              <link rel='icon' type='image/png' href='favicon.src' />
            </HStack>
          </div>
        </div>
        <div className='w-fit text-[#FFFFFF] mx-auto'>
          <p className='text-center'>Copyright Foodbank 2022. All rights reserved</p>
          <a>Terms of Service</a> | <a>Privacy Policy</a> | <a>Board Policy</a>
        </div>
      </Box>
      <div className=' justify-end'></div>
    </Box>
  );
};

export default Footer;
