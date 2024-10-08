import React, { useEffect, useRef } from 'react';

interface HelpModalProps {
  handleClose: () => void;
}

const HelpModal: React.FC<HelpModalProps> = ({ handleClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Close modal on ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    // Focus on the modal when it opens
    modalRef.current?.focus();

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleClose]);

  return (
    <div 
      className='modal-overlay' 
      role='dialog' 
      aria-modal='true' 
      aria-labelledby='modal-title' 
      aria-describedby='modal-description'
    >
      <div className='modal-content' ref={modalRef} tabIndex={-1}>
        <h2 id='modal-title'>Help Information</h2>
        <p id='modal-description'>
          This form requires your title, name, email, and gender. Please ensure all fields are filled out correctly.
        </p>
        <button onClick={handleClose} aria-label='Close help modal' className='btn btn-close'>
          Close
        </button>
      </div>
    </div>
  );
};

export default HelpModal;
