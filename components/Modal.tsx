import {
  Button,
  ButtonGroup,
  Modal as ModalComponent,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';

type Props = {
  title?: string;
  body?: React.ReactNode;
  footer?: React.ReactNode;
  onClose: () => void;
  isOpen?: boolean;
};

const Modal = ({ title = 'Modal Title', body, footer, onClose, isOpen = false, ...rest }: Props) => {
  return (
    <ModalComponent onClose={onClose} isOpen={isOpen} {...rest}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{body}</ModalBody>
        <ModalFooter>{footer}</ModalFooter>
      </ModalContent>
    </ModalComponent>
  );
};

export default Modal;
