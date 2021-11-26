import React, { useState, useCallback, ReactChild } from 'react';
import { Elements, Node } from 'react-flow-renderer';

import { getLayoutedElements } from '../utils';

export type CustomNodeType = {
  layer: number;
  amount: number;
  timer: number;
  available: boolean;
} & Node;

type AdjustLayoutParams = {dir?: 'TB' | 'LR', els?: Elements} | undefined;

type MainContextType = {
  elements: Elements;
  setElements: (elements: Elements) => void;
  node?: CustomNodeType;
  setNode: (node: CustomNodeType) => void;
  adjustLayout: (params: AdjustLayoutParams) => void;
  showImportModal: boolean;
  setShowImportModal: (showImportModal: boolean) => void;
  showNodeModal: boolean;
  setShowNodeModal: (show: boolean) => void;
  showMiniMap: boolean;
  setShowMiniMap: (show: boolean) =>void;
  closeNodeModal: () => void;
};

type MainContextProviderType = {children : ReactChild};

export const MainContext = React.createContext({} as MainContextType);

export const MainContextProvider = ({ children }: MainContextProviderType): JSX.Element => {
  const [elements, setElements] = useState<Elements>([]);
  const [node, setNode] = useState<CustomNodeType>();
  const [direction, setDirection] = useState<'TB' | 'LR'>('TB');
  const [showImportModal, setShowImportModal] = useState(false);
  const [showNodeModal, setShowNodeModal] = useState(false);
  const [showMiniMap, setShowMiniMap] = useState(true);

  const closeNodeModal = () => {
    setShowNodeModal(false);
    setNode(undefined);
  };

  const adjustLayout = useCallback((params: AdjustLayoutParams) => {
    const currentDirection = params?.dir || direction;
    const currentElements = params?.els || elements;
    const layoutedElements = getLayoutedElements(currentElements, currentDirection);
    setElements(layoutedElements);
    setDirection(currentDirection);
  }, [elements]);

  return (
    <MainContext.Provider value={{
      node,
      setNode,
      elements,
      setElements,
      adjustLayout,
      showImportModal,
      setShowImportModal,
      showNodeModal,
      setShowNodeModal,
      showMiniMap,
      setShowMiniMap,
      closeNodeModal,
    }}
    >
      {children}
    </MainContext.Provider>
  );
};
