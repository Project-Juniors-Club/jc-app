import {
  Button,
  ButtonGroup,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  Input,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';

import useSnackbar from '../../hooks/useSnackbar';
import { validateEmail } from '../../utils/validation';
import Modal from '../Modal';

type FormValues = {
  email: string;
};

const ForgotPasswordModal = () => {
  const {
    register,
    handleSubmit,
    formState: { isDirty, errors },
  } = useForm({ defaultValues: { email: '' } });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { openErrorNotification, openSuccessNotification } = useSnackbar();

  const forgotPassword = (data: FormValues) => axios.post('/api/auth/forgotpassword', data);

  const { isLoading, mutate } = useMutation(forgotPassword, {
    onSuccess: ({ data }) => {
      console.log('POST ', data);
      openSuccessNotification(data.message);
    },
    onError: (error: AxiosError) => openErrorNotification(error.message),
  });

  const onSubmit = (data: FormValues) => mutate(data);

  return (
    <>
      <button
        onClick={evt => {
          evt.preventDefault();
          onOpen();
        }}
      >
        Forgot Password
      </button>
      <Modal title='Forgot Password' onClose={onClose} isOpen={isOpen}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody>
            <FormControl isInvalid={!!errors.email}>
              <Input
                id='email'
                placeholder='Email address'
                {...register('email', { validate: email => validateEmail(email) || 'Please enter a valid email address.' })}
                autoFocus
              />
              <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
              <FormHelperText>A password reset link will be sent to the above email address.</FormHelperText>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <ButtonGroup spacing='4'>
              <Button onClick={onClose}>Close</Button>
              <Button type='submit' disabled={!isDirty || isLoading} isLoading={isLoading} loadingText='Submitting' colorScheme='blue'>
                Submit
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </form>
      </Modal>
    </>
  );
};

export default ForgotPasswordModal;
