import React from "react";
import { cn } from "../../../@lib/utils";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const handleOverlayClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={cn(
        "fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 transition-opacity duration-300",
        {
          "opacity-100": isOpen,
          "opacity-0 pointer-events-none": !isOpen,
        }
      )}
      onClick={handleOverlayClick}
    >
      <div
        className={cn(
          "bg-white sm:w-[35%] md:w-[44%] p-8 rounded-3xl shadow-lg flex flex-col absolute sm:bottom-24 -bottom-4 transition-transform duration-300",
          {
            "transform translate-y-0": isOpen,
            "transform translate-y-full": !isOpen,
          }
        )}
      >
        {children}
      </div>
    </div>
  );
};
