import React, { useState, ReactChild } from 'react';

type ContextType = {
  showImportModal: boolean;
  setShowImportModal: (showImportModal: boolean) => void;
};

type ContextProviderType = {children : ReactChild};

export const Context = React.createContext({} as ContextType);

export const ContextProvider = ({ children }: ContextProviderType): JSX.Element => {
  const [showImportModal, setShowImportModal] = useState(false);

  return (
    <Context.Provider value={{
      showImportModal,
      setShowImportModal,
    }}
    >
      {children}
    </Context.Provider>
  );
};
