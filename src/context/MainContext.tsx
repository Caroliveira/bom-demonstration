import React, { useState, ReactChild } from 'react';
import { Elements, Node } from 'react-flow-renderer';

export type CustomNodeType = {
  layer: number;
  amount: number;
  timer: number;
  available: boolean;
} & Node;

export type NodeModalProps = {
  show: boolean;
  edgeSource?: string
 } | undefined;

type MainContextType = {
  elements: Elements;
  setElements: (elements: Elements) => void;
  showImportModal: boolean;
  setShowImportModal: (showImportModal: boolean) => void;
  showNodeModal: boolean;
  setShowNodeModal: (show: boolean) => void;
  edgeSource: string;
  setEdgeSource: (nodeId: string) => void;
};

type MainContextProviderType = {children : ReactChild};

export const MainContext = React.createContext({} as MainContextType);

export const MainContextProvider = ({ children }: MainContextProviderType): JSX.Element => {
  const [elements, setElements] = useState<Elements>([]);
  const [showImportModal, setShowImportModal] = useState(false);
  const [showNodeModal, setShowNodeModal] = useState(false);
  const [edgeSource, setEdgeSource] = useState('');

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
    }}
    >
      {children}
    </MainContext.Provider>
  );
};
