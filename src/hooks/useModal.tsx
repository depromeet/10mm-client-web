import { useCallback, useState } from 'react';

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

  const openModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  return {
    isOpen,
    openModal,
    closeModal,
  };
};

export default useModal;
