import { Box, HStack, Icon, Text } from '@chakra-ui/react';

import favicon from '../public/favicon.ico';

const Footer = () => {
  return (
    <Box className='items-center justify-center bg-[#262728]'>
      <Box className='mx-auto w-11/12 flex-col items-center justify-center' py={10}>
        <Box className='text-inherit'>
          <Text className='mb-10 text-3xl font-bold text-[#FFFFFF]'>
            <strong>CONTACT US</strong>
          </Text>
        </Box>
        <div className='mb-10 grid grid-flow-col grid-cols-4 grid-rows-3 gap-4 text-[#FFFFFF]'>
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
          <div className='row-span-2 row-start-2 font-bold'>
            <p>Follow Us</p>
            <HStack className='h-fit'>
              <link rel='icon' type='image/png' href='favicon.src' />
              <link rel='icon' type='image/png' href='favicon.src' />
              <link rel='icon' type='image/png' href='favicon.src' />
            </HStack>
          </div>
        </div>
        <div className='mx-auto w-fit text-[#FFFFFF]'>
          <p className='text-center'>Copyright Foodbank 2022. All rights reserved</p>
          <a>Terms of Service</a> | <a>Privacy Policy</a> | <a>Board Policy</a>
        </div>
      </Box>
      <div className=' justify-end'></div>
    </Box>
  );
};

export default Footer;
