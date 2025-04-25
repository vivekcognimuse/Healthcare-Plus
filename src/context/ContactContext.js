// context/ContactContext.js
"use client"; // <-- important!
import { createContext, useContext, useState } from "react";

const ModalContext = createContext();

export function ModalProvider({ children }) {
  const [showFormModal, setShowFormModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const openFormModal = () => setShowFormModal(true);
  const closeFormModal = () => setShowFormModal(false);
  const openSuccessModal = () => {
    setShowFormModal(false);
    setShowSuccessModal(true);
  };
  const closeSuccessModal = () => setShowSuccessModal(false);

  return (
    <ModalContext.Provider
      value={{
        showFormModal,
        openFormModal,
        closeFormModal,
        showSuccessModal,
        openSuccessModal,
        closeSuccessModal,
      }}>
      {children}
    </ModalContext.Provider>
  );
}

export const useModal = () => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
