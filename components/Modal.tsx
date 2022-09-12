import { Modal as ModalComponent, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/react';
import { ReactNode } from 'react';

type Props = {
  title?: string;
  onClose: () => void;
  isOpen?: boolean;
  children?: ReactNode;
};

const Modal = ({ title='Modal Title', onClose, isOpen = false, children, ...rest }: Props) => {
  return (
    <ModalComponent onClose={onClose} isOpen={isOpen} {...rest}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        {children}
      </ModalContent>
    </ModalComponent>
  );
};

export default Modal;
