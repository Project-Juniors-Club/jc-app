import { useToast } from '@chakra-ui/react';

const useSnackbar = () => {
  const toast = useToast();
  return {
    openSuccessNotification: (title: string, description?: string) => {
      toast({
        title: title,
        description: description,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    },
    openErrorNotification: (title: string, description?: string) => {
      toast({
        title: title,
        description: description,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    },
  };
};

export default useSnackbar;
