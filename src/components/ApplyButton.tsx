import React from 'react';
import useModal from '@/hooks/useModal';
import Modal from './Modal';
// import '@/styles/Button.scss';

const ApplyButton = () => {
  const { isOpen, openModal, closeModal } = useModal();

  const handleConfirmClick = () => {
    window.location.href = 'https://forms.gle/RaW38zynf2p515Ua8';
  };

  return (
    <div className="text-center mt-8">
      <button onClick={openModal} 
      className="button styled-button text-white py-2 px-4 text-l hover:bg-green-600"
      style={{animation: "bounceIn 1s"}}> 
      {/* add aos animation later */}
      
        Apply Now!
      </button>
      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        onConfirm={handleConfirmClick}
        confirmText="Yes"
        cancelText="No"
        confirmClass="bg-green-500"
        cancelClass="bg-red-500"
      >
        <p className="mb-4">You are about to leave LuminAI. Do you want to proceed?</p>
      </Modal>
    </div>
  );
};

export default ApplyButton;
