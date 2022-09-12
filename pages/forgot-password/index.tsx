import {
  Button,
  ButtonGroup,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  Input,
  ModalBody,
  ModalFooter,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Layout from '../../components/Layout';
import Modal from '../../components/Modal';
import { validateEmail } from '../../utils/validation';

type FormValues = {
  email: string;
};

//Temporary page to demo forgot password feature
const ForgotPasswordPage = () => {
  const {
    register,
    handleSubmit,
    formState: { isDirty, errors },
  } = useForm({ defaultValues: { email: '' } });
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleModalClosed = () => {
    setMessage(false);
    onClose();
  };

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    const { email } = data;
    try {
      const response = await axios.post('/api/auth/forgotpassword', { email });
      const { status, data } = response;
      if (status !== 200) {
        console.error(response.status);
      }
      console.log('POST ', data);
      setMessage(data.message);
    } catch (err: any) {
      //TODO: display error
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout title='Forgot Password | Next.js + TypeScript Example'>
      <h1>Hello Next.js 👋</h1>
      <div>
        <Button onClick={onOpen}>Forgot Password</Button>
        <Modal title='Forgot Password' onClose={handleModalClosed} isOpen={isOpen}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody>
              {!message ? (
                <FormControl isInvalid={!!errors.email}>
                  <Input
                    id='email'
                    placeholder='Email address'
                    {...register('email', { validate: email => validateEmail(email) || 'Invalid email address.' })}
                    autoFocus
                  />
                  <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
                  <FormHelperText>A password reset link will be sent to the above email address.</FormHelperText>
                </FormControl>
              ) : (
                <Text fontSize={'md'}>{message}</Text>
              )}
            </ModalBody>
            <ModalFooter>
              <ButtonGroup spacing='4'>
                <Button onClick={handleModalClosed}>Close</Button>
                {!message && (
                  <Button type='submit' disabled={!isDirty || isLoading} isLoading={isLoading} loadingText='Submitting' colorScheme='blue'>
                    Submit
                  </Button>
                )}
              </ButtonGroup>
            </ModalFooter>
          </form>
        </Modal>
      </div>
    </Layout>
  );
};
export default ForgotPasswordPage;
