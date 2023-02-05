import { Box, Center, Flex, HStack, VStack, Image, Text, Button, Stack } from '@chakra-ui/react';
import CustomButton from '../../components/Button';
import Footer from '../../components/Footer';
import NavBar from '../../components/navbar/NavBar';

const LandingPage = () => {
  return (
    <>
      <NavBar />
      <Box>
        <Flex direction={'column'}>
          <Box className='min-w-screen min-h-[50%] bg-white px-40 py-20'>
            <Center className='h-full w-full'>
              <HStack className='h-full w-full' spacing={'20'}>
                <VStack className='w-7/12' align={'start'} spacing={'5'}>
                  <Box>
                    <Box>
                      <Text color='#7FB519' as={'span'} fontSize={'4rem'} fontWeight={700}>
                        Children{' '}
                      </Text>
                      <Text fontSize={'4rem'} fontWeight={700} as={'span'} color='2D3748'>
                        Today,
                      </Text>
                    </Box>
                    <Box>
                      <Text fontSize={'4rem'} fontWeight={700} color='#7FB519' as={'span'}>
                        Leaders{' '}
                      </Text>{' '}
                      <Text fontSize={'4rem'} fontWeight={700} as={'span'} color='2D3748'>
                        {' '}
                        Tomorrow
                      </Text>
                    </Box>
                  </Box>
                  <Text fontSize={'2rem'} fontWeight={400} color='4D4D4D'>
                    Empowering our future leaders through education to make a difference in Singapore’s food industry
                  </Text>
                  <Box className='h-1' />
                  <CustomButton variant={'black-solid'}>
                    <Text color={'#FFFFFF'}>Sign Up</Text>
                  </CustomButton>
                </VStack>
                <Box className='h-full w-5/12 rounded-lg'>
                  <Image alt='login left' src='/assets/login_left.jpg' className='h-full max-h-max w-full rounded-xl' />
                </Box>
              </HStack>
            </Center>
          </Box>
          <Box className='min-w-screen min-h-[50%] bg-[#F4FFE0] px-40 py-20'>
            <Center className='px-40'>
              <VStack className='w-1/2'>
                <Box alignItems={'center'}>
                  <Text fontSize={'4rem'}>What is Juniors Club?</Text>
                </Box>
                <Box alignContent={'start'}>
                  <Text fontSize={'1.75rem'}>
                    <strong>The Food Bank Singapore</strong> believes that it is critical to plant the seed of service and social
                    responsibility from a young age.
                    <strong> FBSG’s Junior Club</strong> programme builds awareness among the littlest members of our community through a
                    range of experiential learning opportunities and highly engaging curriculum.
                  </Text>
                  <br />
                  <br />
                  <Text fontSize={'1.75rem'}>Check out our online courses below!</Text>
                </Box>
              </VStack>
            </Center>
          </Box>
          <Box className='min-w-screen min-h-[50%] bg-white px-40 py-20'>
            <Center>
              <VStack className='w-full'>
                <Box alignItems={'center'}>
                  <Text fontSize={'4rem'}>Explore our Courses</Text>
                </Box>
                <Box alignContent={'start'}>
                  <VStack>{/* Put course cards here later */}</VStack>
                </Box>
                <CustomButton variant={'black-solid'}>
                  <Text color={'#FFFFFF'}>View More Courses</Text>
                </CustomButton>
              </VStack>
            </Center>
          </Box>
          <Footer />
        </Flex>
      </Box>
    </>
  );
};

export default LandingPage;
