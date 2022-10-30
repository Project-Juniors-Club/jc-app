import { Alert, AlertDescription, AlertIcon, AlertTitle, Button, Spinner, Text } from '@chakra-ui/react';
import useSnackbar from '../../hooks/useSnackbar';
import { BlackOutlineButton, BlackSolidButton, GreenOutlineButton, GreenSolidButton } from '../../components/Buttons';

const Test = () => {
  const { openSuccessNotification, openErrorNotification } = useSnackbar();
  return (
    <div>
      <Text fontSize={'4xl'}>UI Components are shown here.</Text>

      <Text fontSize={'lg'}>Buttons</Text>

      <Button colorScheme='blue'>Button</Button>
      <Text fontSize={'lg'}>Notification</Text>

      <Alert status='error'>
        <AlertIcon />
        <AlertTitle>Sample Error Title</AlertTitle>
        <AlertDescription>Sample Error Description goes here.</AlertDescription>
      </Alert>
      <Text fontSize={'lg'}>Snackbar</Text>
      <Button
        colorScheme='green'
        onClick={() => {
          openSuccessNotification('Sample Title', 'Sample description');
        }}
      >
        Click for Success
      </Button>
      <Button colorScheme='red' onClick={() => openErrorNotification('Sample Title', 'Sample description')}>
        Click for Failure
      </Button>
      <GreenSolidButton text={'button'} icon={<Spinner />} />
      <GreenOutlineButton text={'button'} icon={<Spinner />} />
      <BlackSolidButton text={'button'} icon={<Spinner color='#FFFFFF' />} />
      <BlackOutlineButton text={'button'} icon={<Spinner />} />
    </div>
  );
};

export default Test;
