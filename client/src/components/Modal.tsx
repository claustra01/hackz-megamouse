import React from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.div`
  background-color: #f8f8f8; /* 雰囲気に合った色 */
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
`;

const ModalCloseButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  background-color: transparent;
  border: none;
  font-size: 24px;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #ffac00;
  }
`;

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <ModalOverlay>
      <ModalContainer>
        <ModalCloseButton onClick={onClose}>&times;</ModalCloseButton>
        <div className="modal-content">
          {children}
        </div>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default Modal;
