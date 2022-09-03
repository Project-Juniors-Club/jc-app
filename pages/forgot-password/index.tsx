import { Button, ButtonGroup, FormControl, FormHelperText, Input, ModalBody, ModalFooter, Text, useDisclosure } from '@chakra-ui/react';
import { FormEvent, SyntheticEvent, useState } from 'react';
import Layout from '../../components/Layout';
import Modal from '../../components/Modal';
//Temporary page to demo forgot password feature
const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleEmailChanged = (evt: FormEvent<HTMLInputElement>) => setEmail(evt.currentTarget.value);
  const handleModalClosed = () => {
    setMessage(false);
    onClose();
  };
  const handleSubmit = async (evt: SyntheticEvent) => {
    evt.preventDefault();
    setIsLoading(true);
    try {
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
      setMessage(data.message);
    } catch (err: any) {
      //TODO: display error
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  const canSubmit = email;
  return (
    <Layout title='Forgot Password | Next.js + TypeScript Example'>
      <h1>Hello Next.js 👋</h1>
      <div>
        <Button onClick={onOpen}>Forgot Password</Button>
        <Modal title='Forgot Password' onClose={handleModalClosed} isOpen={isOpen}>
          <ModalBody>
            {!message ? (
              <FormControl>
                <Input type='email' placeholder='Email address' value={email} onChange={handleEmailChanged} autoFocus />
                <FormHelperText>A password reset link will be sent to the above email address.</FormHelperText>
              </FormControl>
            ) : (
              <Text fontSize={'md'}>{message}</Text>
            )}
          </ModalBody>
          <ModalFooter>
            <ButtonGroup spacing='6'>
              <Button onClick={handleModalClosed}>Close</Button>
              {!message && (
                <Button disabled={!canSubmit} isLoading={isLoading} loadingText='Submitting' colorScheme='blue' onClick={handleSubmit}>
                  Submit
                </Button>
              )}
            </ButtonGroup>
          </ModalFooter>
        </Modal>
      </div>
    </Layout>
  );
};
export default ForgotPasswordPage;
