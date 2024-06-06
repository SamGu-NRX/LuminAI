import React from 'react';
import useModal from '../hooks/useModal';
import Modal from './Modal';
import ContactForm from './ContactForm';

const ContactButton = () => {
  const { isOpen, openModal, closeModal } = useModal();

  const handleConfirmClick = () => {
    window.location.href = 'https://forms.gle/';
  };

  return (
    <div>
      <ContactForm/>
      <button onClick={openModal} type="submit" 
      className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
        Submit
      </button>
      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        onConfirm={handleConfirmClick}>
        <p className="mb-4"> We have received your message. You will hear back from our team shortly.</p>
      </Modal>
    </div>
  );
};

export default ContactButton;