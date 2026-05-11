import React, { useState, useEffect, useRef } from 'react';
import './Modal.css';

export interface ModalProps {
  buttonText?: string;
  title?: string;
  content?: string;
  closeText?: string;
}

export const Modal = ({
  buttonText = 'Open Modal',
  title = 'Modal Title',
  content = 'This is the modal content. You can put anything you want in here.',
  closeText = 'Close',
}: ModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeModal();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  // Handle clicking outside the modal content to close
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      closeModal();
    }
  };

  return (
    <>
      <button className="wf-modal-trigger" onClick={openModal}>
        {buttonText}
      </button>

      {isOpen && (
        <div className="wf-modal-overlay" onClick={handleOverlayClick} role="dialog" aria-modal="true">
          <div className="wf-modal-content" ref={modalRef}>
            <div className="wf-modal-header">
              <h2 className="wf-modal-title">{title}</h2>
              <button className="wf-modal-close-icon" onClick={closeModal} aria-label="Close">
                ×
              </button>
            </div>
            
            <div className="wf-modal-body">
              <p>{content}</p>
            </div>
            
            <div className="wf-modal-footer">
              <button className="wf-modal-close-btn" onClick={closeModal}>
                {closeText}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
