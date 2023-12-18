import { Grid, GridItem, Input, Box, Center, Flex, Container, HStack, VStack, Image, Text, Button, Stack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import CustomButton from '../../components/Button';
import Footer from '../../components/Footer';
import NavBar from '../../components/navbar/NavBar';
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

const UserManagePage = () => {
    const router = useRouter();
    const { data: session } = useSession();
    console.log(session);
    function handleChange(){
        //no editing allowed, do nothing
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
                                    value={session?.user.email}
                                    onChange={handleChange}
                                    size='md'
                                />
                            </Box>
                            <Box>
                                <Text mb='8px'>Full Name</Text>
                                <Input
                                    value={session?.user.name}
                                    onChange={handleChange}
                                    size='md'
                                />
                            </Box>
                            <Box>
                                <Text mb='8px'>Date of Birth</Text>
                                <Input
                                    value={session?.data?.dob && session?.data?.dob.split('T')[0]}
                                    onChange={handleChange}
                                    size='md'
                                    placeholder='NA'
                                />
                            </Box>
                            <Box className='pb-6'></Box>
                            <Box>
                                <CustomButton onClick={() => alert('Coming soon')} variant={'black-solid'}>
                                    <Text color={'#FFFFFF'}>Delete Account</Text>
                                </CustomButton>
                                <CustomButton style={{float: 'right'}} onClick={() => alert('Coming soon')} variant={'green-solid'}>
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
