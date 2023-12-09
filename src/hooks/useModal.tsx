import { useState } from 'react';

interface UseModalProps {
  initialOpen?: boolean;
}

const useModal = ({ initialOpen = false }: UseModalProps = {}) => {
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
