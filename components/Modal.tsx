import {
  Button,
  Modal as ModalComponent,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';

type Props = {
  title?: string,
  onClose: () => void;
  isOpen?: boolean;
  children?: React.ReactNode;
};

const Modal = ({title = "Modal Title", onClose, isOpen = false, children, ...rest }: Props) => {
  return (
    <ModalComponent onClose={onClose} isOpen={isOpen} {...rest}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </ModalComponent>
  );
};

export default Modal;
