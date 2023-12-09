import React from 'react';
import { css } from '@/styled-system/css';
import { modalConstant } from '@/styles/constant';
import { createPortal } from 'react-dom';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, children, ...props }) => {
  if (!isOpen) {
    return null;
  }

  return createPortal(
    <div className={modalOverlayCss} {...props}>
      <div className={modalContentCss}>{children}</div>
    </div>,
    document.body,
  );
};
const modalOverlayCss = css({
  position: 'fixed',
  top: '0',
  left: '0',
  width: '100%',
  height: '100%',
  background: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: `${modalConstant}`,
});
const modalContentCss = css({
  background: '#fff',
  padding: '20px',
  borderRadius: '30px',
  maxWidth: '400px',
  width: '100%',
  textAlign: 'center',
});

export default Modal;
