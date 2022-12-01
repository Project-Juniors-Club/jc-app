import { Alert, AlertDescription, AlertIcon, AlertTitle, Button, Text } from '@chakra-ui/react';
import useSnackbar from '../../hooks/useSnackbar';
import NavbarGeneral from '../../components/NavBarGeneral';
import NavBarCart from '../../components/NavBarCart';
import NavBarGeneral from '../../components/NavBarGeneral';
import NavBarCourse from '../../components/NavBarCourse';

const Test = () => {
  const { openSuccessNotification, openErrorNotification } = useSnackbar();
  return (
    <div>
      <NavBarGeneral></NavBarGeneral>
      {/* <NavBarCart></NavBarCart> */}
      {/* <NavBarCourse></NavBarCourse> */}
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
    </div>
  );
};

export default Test;
