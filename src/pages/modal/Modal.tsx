import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  const handleOverlayClick = (event: React.MouseEvent)=>{
    if(event.target === event.currentTarget){
        onClose();
    }
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={handleOverlayClick}
    >
      <div className="bg-white sm:w-[35%] p-10 rounded-3xl shadow-lg flex flex-col absolute sm:bottom-32 -bottom-6">
        {children}
      </div>
    </div>
  );
};
