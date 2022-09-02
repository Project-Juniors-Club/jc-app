import { Button, Input, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import Layout from '../../components/Layout';
import Modal from '../../components/Modal';

const ResetPasswordPage = () => {
  const [email, setEmail] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleEmailChanged: React.ChangeEventHandler = (evt: React.ChangeEvent<HTMLInputElement>) => setEmail(evt.target.value);
  
  return (
    <Layout title='Forgot Password | Next.js + TypeScript Example'>
      <h1>Hello Next.js 👋</h1>
      <p>
        <Button onClick={onOpen}>Forgot Password</Button>
        <Modal title='Forgot Password' onClose={onClose} isOpen={isOpen}>
          <Input autoFocus placeholder='Email address' value={email} onChange={handleEmailChanged} />
        </Modal>
      </p>
    </Layout>
  );
};
export default ResetPasswordPage;
