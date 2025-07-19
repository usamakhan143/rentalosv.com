import React, { createContext, useContext, useState } from "react";

const SignupModalContext = createContext();

export const useSignupModal = () => {
  const context = useContext(SignupModalContext);
  if (!context) {
    throw new Error("useSignupModal must be used within a SignupModalProvider");
  }
  return context;
};

export const SignupModalProvider = ({ children }) => {
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);

  const openSignupModal = () => setIsSignupModalOpen(true);
  const closeSignupModal = () => setIsSignupModalOpen(false);

  const value = {
    isSignupModalOpen,
    openSignupModal,
    closeSignupModal,
  };

  return (
    <SignupModalContext.Provider value={value}>
      {children}
    </SignupModalContext.Provider>
  );
};
