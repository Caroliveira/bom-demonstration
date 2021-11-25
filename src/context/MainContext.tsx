import React, { useState, ReactChild } from 'react';
import { Elements, Node, XYPosition } from 'react-flow-renderer';

export type CustomNodeType = {
  layer: number;
  amount: number;
  timer: number;
  available: boolean;
} & Node;

type MainContextType = {
  elements: Elements;
  setElements: (elements: Elements) => void;
  showImportModal: boolean;
  setShowImportModal: (showImportModal: boolean) => void;
  showNodeModal: boolean;
  setShowNodeModal: (show: boolean) => void;
  edgeSource: string;
  setEdgeSource: (nodeId: string) => void;
  resetNodeModalStates: () => void;
};

type MainContextProviderType = {children : ReactChild};

export const MainContext = React.createContext({} as MainContextType);

export const MainContextProvider = ({ children }: MainContextProviderType): JSX.Element => {
  // Global states
  const [elements, setElements] = useState<Elements>([]);
  const [showImportModal, setShowImportModal] = useState(false);
  const [showNodeModal, setShowNodeModal] = useState(false);

  // Node modal states
  const [edgeSource, setEdgeSource] = useState('');

  const resetNodeModalStates = () => {
    setShowNodeModal(false);
    setEdgeSource('');
  };

  return (
    <MainContext.Provider value={{
      elements,
      setElements,
      showImportModal,
      setShowImportModal,
      showNodeModal,
      setShowNodeModal,
      edgeSource,
      setEdgeSource,
      resetNodeModalStates,
    }}
    >
      {children}
    </MainContext.Provider>
  );
};
