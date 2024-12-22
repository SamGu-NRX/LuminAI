import React from "react";
import useModal from "@/hooks/useModal";
import Modal from "../Modal";
// import "@/styles/Button.scss";
import ShimmerButton from "../ui/shimmer-button";

const ApplyButton = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>((props, ref) => {
  const { isOpen, openModal, closeModal } = useModal();

  const handleConfirmClick = () => {
    window.location.href = "https://forms.gle/RaW38zynf2p515Ua8";
  };

  return (
    <div
      className="text-center mt-8 z-10 flex items-center justify-center"
      ref={ref}
    >
      <ShimmerButton className="shadow-2xl text-white" onClick={openModal}>
        <span className="z-20 whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
          Join our AI Revolution
        </span>
      </ShimmerButton>
      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        onConfirm={handleConfirmClick}
        confirmText="Yes"
        cancelText="No"
        confirmClass="bg-green-500"
        cancelClass="bg-red-500"
      >
        <p className="mb-4">
          You are about to leave LuminAI. Do you want to proceed?
        </p>
      </Modal>
    </div>
  );
});

ApplyButton.displayName = "ApplyButton";

export default ApplyButton;
