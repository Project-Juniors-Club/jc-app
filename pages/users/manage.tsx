import { Grid, GridItem, Input, Box, Center, Flex, Container, HStack, VStack, Image, Text, Button, Stack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import CustomButton from '../../components/Button';
import Footer from '../../components/Footer';
import NavBar from '../../components/navbar/NavBar';
import React from "react";

const UserManagePage = () => {
    const router = useRouter();
    function handleChange(){

    }
    return (
        <>
        <NavBar />
        <Box className='mt-5' >
            <Flex direction={'column'}>
                <Box className='min-w-screen min-h-[100%] bg-white px-40 py-20'>
                    <Center className='h-full w-full'>
                        <Stack direction='column' spacing={3}>
                            <h1 className='pb-6 text-5xl font-bold '>
                                Account Details
                            </h1>
                            <Box />
                            <Box>
                                <Text mb='8px'>Email</Text>
                                <Input
                                    value='test'
                                    onChange={handleChange}
                                    placeholder='Here is a sample placeholder'
                                    size='md'
                                />
                            </Box>
                            <Box>
                                <Text mb='8px'>Full Name</Text>
                                <Input
                                    value='test'
                                    onChange={handleChange}
                                    placeholder='Here is a sample placeholder'
                                    size='md'
                                />
                            </Box>
                            <Box>
                                <Text mb='8px'>Date of Birth</Text>
                                <Input
                                    value='2018-07-22'
                                    onChange={handleChange}
                                    size='md'
                                    type="date"
                                />
                            </Box>
                            <Box className='pb-6'></Box>
                            <Box>
                                <CustomButton onClick={() => router.push('/courses')} variant={'black-solid'}>
                                    <Text color={'#FFFFFF'}>Delete Account</Text>
                                </CustomButton>

                                <CustomButton style={{float: 'right'}} onClick={() => router.push('/courses')} variant={'green-solid'}>
                                    <Text color={'#FFFFFF'}>Edit Details</Text>
                                </CustomButton>
                            </Box>
                        </Stack>
                    </Center>
                </Box>
                <Box style={{height: 275}}></Box>
                <Box style={{bottom: 0, width: '100%'}}>
                    <Footer />
                </Box>
            </Flex>
        </Box>
        </>
    );
};

export default UserManagePage;
