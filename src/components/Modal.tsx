import { useEffect, useState } from 'react';
import '@/styles/Button.scss';

const Modal = ({modalType = 'Confirm',
  isOpen, onClose,
  onConfirm, children, 
  confirmText = 'OK', cancelText = 'Cancel', 
  confirmClass = 'bg-blue-500', cancelClass = 'bg-gray-500'
}) => {
  
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setActive(true);
    } else {
      setTimeout(() => setActive(false), 300);
    }
  }, [isOpen]);

  if (!active) return null;

  if(modalType === 'Error'){
    return (
      <div className='flex-container'>
        <div className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
        style={{ animation: 'buttonFadeIn 0.5s ease-in-out' }}>
          <div className={`bg-white p-6 rounded shadow-lg transform transition-transform duration-300 ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            {children}
            <div className="flex justify-between mt-4">
              <button onClick={onConfirm} className={`${confirmClass} button text-white py-2 px-4 items-center justify-center rounded hover:${confirmClass}-hover`}>
                {confirmText}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='flex-container'>
      <div className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
          style={{ animation: 'buttonFadeIn 0.5s ease-in-out' }}>
        <div className={`bg-white p-6 rounded shadow-lg transform transition-transform duration-300 ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
          {children}
          <div className="flex justify-between mt-4">
            <button onClick={onConfirm} className={`${confirmClass} button text-white py-2 px-4 rounded hover:${confirmClass}-hover`}>
              {confirmText}
            </button>
            <button onClick={onClose} className={`${cancelClass} button text-white py-2 px-4 rounded hover:${cancelClass}-hover`}>
              {cancelText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
