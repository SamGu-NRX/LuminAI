import { useEffect, useState } from "react";
import "@/styles/Button.scss";

interface ModalProps {
  modalType?: "Confirm" | "Error";
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  children: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  confirmClass?: string;
  cancelClass?: string;
}

const Modal: React.FC<ModalProps> = ({
  modalType = "Confirm",
  isOpen,
  onClose,
  onConfirm,
  children,
  confirmText = "OK",
  cancelText = "Cancel",
  confirmClass = "bg-blue-500",
  cancelClass = "bg-gray-500",
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

  if (modalType === "Error") {
    return (
      <div className="flex-container">
        <div
          className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`}
          style={{ animation: "buttonFadeIn 0.5s ease-in-out" }}
        >
          <div
            className={`transform rounded bg-white p-6 shadow-lg transition-transform duration-300 ${isOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
          >
            {children}
            <div className="mt-4 flex justify-between">
              <button
                onClick={onConfirm}
                className={`${confirmClass} button items-center justify-center rounded px-4 py-2 text-white hover:${confirmClass}-hover`}
              >
                {confirmText}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-container">
      <div
        className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`}
        style={{ animation: "buttonFadeIn 0.5s ease-in-out" }}
      >
        <div
          className={`transform rounded bg-white p-6 shadow-lg transition-transform duration-300 ${isOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
        >
          {children}
          <div className="mt-4 flex justify-between">
            <button
              onClick={onConfirm}
              className={`${confirmClass} button rounded px-4 py-2 text-white hover:${confirmClass}-hover`}
            >
              {confirmText}
            </button>
            <button
              onClick={onClose}
              className={`${cancelClass} button rounded px-4 py-2 text-white hover:${cancelClass}-hover`}
            >
              {cancelText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
