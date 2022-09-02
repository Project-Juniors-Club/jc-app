import { Button, ButtonGroup, Input, useDisclosure } from '@chakra-ui/react';
import React, { useState } from 'react';
import Layout from '../../components/Layout';
import Modal from '../../components/Modal';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleEmailChanged = (evt: React.FormEvent<HTMLInputElement>) => setEmail(evt.currentTarget.value);

  const handleSubmit = async (evt: React.SyntheticEvent) => {
    evt.preventDefault();
    const response = await fetch('/api/auth/forgotpassword', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      console.error(response.status);
    }
    const data = await response.json();
    console.log('POST ', data);
  };

  return (
    <Layout title='Forgot Password | Next.js + TypeScript Example'>
      <h1>Hello Next.js 👋</h1>
      <div>
        <Button onClick={onOpen}>Forgot Password</Button>
        <Modal
          title='Forgot Password'
          body={<Input autoFocus type='email' placeholder='Email address' value={email} onChange={handleEmailChanged} />}
          footer={
            <ButtonGroup spacing='6'>
              <Button onClick={onClose}>Close</Button>
              <Button colorScheme='blue' onClick={handleSubmit}>
                Submit
              </Button>
            </ButtonGroup>
          }
          onClose={onClose}
          isOpen={isOpen}
        />
      </div>
    </Layout>
  );
};
export default ForgotPasswordPage;
