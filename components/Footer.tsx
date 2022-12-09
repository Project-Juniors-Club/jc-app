import React from 'react';
import { Box, Flex, Link, Stack, Text, StackDivider } from '@chakra-ui/react';
import Image from 'next/image';
import styles from './Footer.module.css';

import { socials, policies } from '../utils/links';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Box as='footer' role='contentinfo' mx='auto' py='4' px='24' bgColor='#262728' color='gray.200' fontSize='sm'>
        <Stack>
          <Text fontSize='3xl' mb='30px' mt='20px' className={styles.contactUs}>
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
            <Box h='100px' w='270px'>
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
                {socials.map(social => (
                  <Link href={social.url} key={social.name} isExternal>
                    <Image src={'/assets/' + social.icon + '.svg'} alt={social.name} width='18' height='18' />
                  </Link>
                ))}
              </Stack>
            </Box>
          </Flex>
          <Stack direction='column' pt='30px'>
            <Text textAlign='center'>Copyright Foodbank 2022. All rights reserved.</Text>
            <Stack direction='row' justify='center' divider={<StackDivider borderColor='white' />}>
              {policies.map(policy => (
                <Link href={policy.url} key={policy.name} isExternal>
                  <Text textAlign='center'>{policy.name}</Text>
                </Link>
              ))}
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </footer>
  );
};

export default Footer;
