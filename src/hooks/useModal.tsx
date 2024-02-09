import { useState } from 'react';

interface UseModalProps {
  initialOpen?: boolean;
}

export interface UseModalReturn {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const useModal = ({ initialOpen = false }: UseModalProps = {}): UseModalReturn => {
  const [isOpen, setIsOpen] = useState(initialOpen);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return {
    isOpen,
    openModal,
    closeModal,
  };
};

export default useModal;
