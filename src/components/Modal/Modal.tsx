'use client';

import React, { type PropsWithChildren, useRef } from 'react';
import AnimatePortal from '@/components/portal/AnimationPortal';
import useOutsideClick from '@/hooks/useOutsideClick';
import { css } from '@styled-system/css';
import { type Property } from '@styled-system/types/csstype';
import { motion } from 'framer-motion';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  padding?: Property.Padding;
}

/**
 * @description Modal 컴포넌트
 * @param isOpen 모달 오픈 여부
 * @param onClose 모달 닫기
 * @param padding 모달 패딩 값 (default: 20px 24px)
 * @param children 모달 내부 컨텐츠
 *
 */
function Modal({ isOpen, children, onClose, padding = '20px 24px' }: PropsWithChildren<ModalProps>) {
  const modalRef = useRef(null);

  useOutsideClick({
    ref: modalRef,
    handler: () => {
      onClose();
    },
  });

  return (
    <AnimatePortal isShowing={isOpen} mode={'popLayout'}>
      <div className={css(modalOverlayCss)}>
        <motion.div
          key="modal"
          className={css(modalContentCss, {
            padding,
          })}
          ref={modalRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.03 }}
          exit={{ opacity: 0 }}
        >
          {children}
        </motion.div>
      </div>
    </AnimatePortal>
  );
}

const modalOverlayCss = {
  position: 'absolute',
  top: '0',
  left: '0',
  width: '100%',
  height: '100%',
  background: 'scrim.screen',
  padding: '28px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 'modalOverlay',
};

const modalContentCss = {
  background: 'bg.surface4',
  borderRadius: '30px',
  maxWidth: '300px',
  width: '100%',
};

export default Modal;
