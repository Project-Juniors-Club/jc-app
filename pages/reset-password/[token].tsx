import { Button, FormControl, FormHelperText, FormLabel, Input, useDisclosure, VStack } from '@chakra-ui/react';
import { GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import { FormEvent, SyntheticEvent, useState } from 'react';
import Layout from '../../components/Layout';

const ResetPasswordPage = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const { query } = useRouter();
  const { token } = query;

  const handleNewPasswordChanged = (evt: FormEvent<HTMLInputElement>) => setNewPassword(evt.currentTarget.value);
  const handleConfirmPasswordChanged = (evt: FormEvent<HTMLInputElement>) => setConfirmPassword(evt.currentTarget.value);

  const handleSubmit = async (evt: SyntheticEvent) => {
    evt.preventDefault();
    if (newPassword != confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    const response = await fetch(`/api/auth/resetpassword/${token}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password: newPassword }),
    });

    if (!response.ok) {
      console.error(response.status);
    }
    const data = await response.json();
    //TODO: replace with redirect to login page
    console.log('POST ', data);
  };
  const canSubmit = newPassword && confirmPassword;
  return (
    <Layout title='Reset Password | Next.js + TypeScript Example'>
      {/* TODO: replace with Formik */}
      <VStack spacing={4} justifyContent='center'>
        <FormControl isInvalid={error}>
          <FormLabel>New password</FormLabel>
          <Input type='password' value={newPassword} onChange={handleNewPasswordChanged} />
          {error && <FormHelperText>{error}</FormHelperText>}
        </FormControl>
        <FormControl isInvalid={error}>
          <FormLabel>Confirm password</FormLabel>
          <Input type='password' value={confirmPassword} onChange={handleConfirmPasswordChanged} />
          {error && <FormHelperText>{error}</FormHelperText>}
        </FormControl>
        <Button colorScheme='blue' disabled={!canSubmit} onClick={handleSubmit}>
          Submit
        </Button>
      </VStack>
    </Layout>
  );
};
export default ResetPasswordPage;
