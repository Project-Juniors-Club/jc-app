import { Alert, AlertDescription, AlertIcon, AlertTitle, Button, HStack, Text, VStack } from '@chakra-ui/react';
import useSnackbar from '../../hooks/useSnackbar';
import CustomButton from '../../components/Buttons';

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
      <VStack>
        <HStack>
          <CustomButton variant={'green-solid'}>
            <Text>Hello</Text>
          </CustomButton>
          <CustomButton variant={'green-outline'}>
            <Text>Hello</Text>
          </CustomButton>
          <CustomButton variant={'black-solid'}>
            <Text color='#FFFFFF'>Hello</Text>
          </CustomButton>
          <CustomButton variant={'black-outline'}>
            <Text>Hello</Text>
          </CustomButton>
        </HStack>
        <HStack>
          <CustomButton variant={'green-solid'} isDisabled />
          <CustomButton variant={'green-outline'} isDisabled />
          <CustomButton variant={'black-solid'} isDisabled />
          <CustomButton variant={'black-outline'} isDisabled />
        </HStack>
        <HStack>
          <CustomButton variant={'green-solid'} isLoading />
          <CustomButton variant={'green-outline'} isLoading />
          <CustomButton variant={'black-solid'} isLoading />
          <CustomButton variant={'black-outline'} isLoading />
        </HStack>
      </VStack>
    </div>
  );
};

export default Test;
