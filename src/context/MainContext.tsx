import React, { useState, useCallback, ReactChild } from 'react';
import { Elements, Node, useStoreState } from 'react-flow-renderer';
import { getLayoutedElements } from '../utils/dagre';

export type CustomNodeType = {
  layer: number;
  amount: number;
  timer: number;
  available: boolean;
} & Node;

type MainContextType = {
  elements: Elements;
  setElements: (elements: Elements) => void;
  adjustLayout: (direction: 'TB' | 'LR') => void;
  showImportModal: boolean;
  setShowImportModal: (showImportModal: boolean) => void;
  showNodeModal: boolean;
  setShowNodeModal: (show: boolean) => void;
  showMiniMap: boolean;
  setShowMiniMap: (show: boolean) =>void;
  edgeSource: string;
  setEdgeSource: (nodeId: string) => void;
  resetNodeModalStates: () => void;
};

type MainContextProviderType = {children : ReactChild};

export const MainContext = React.createContext({} as MainContextType);

export const MainContextProvider = ({ children }: MainContextProviderType): JSX.Element => {
  const nodes = useStoreState((store) => store.nodes) as CustomNodeType[];
  const edges = useStoreState((store) => store.edges);

  // Global states
  const [elements, setElements] = useState<Elements>([]);
  const [showImportModal, setShowImportModal] = useState(false);
  const [showNodeModal, setShowNodeModal] = useState(false);
  const [showMiniMap, setShowMiniMap] = useState(true);

  // Node modal states
  const [edgeSource, setEdgeSource] = useState('');

  const resetNodeModalStates = () => {
    setShowNodeModal(false);
    setEdgeSource('');
  };

  const adjustLayout = useCallback((direction: 'TB' | 'LR') => {
    const layoutedElements = getLayoutedElements(elements, direction);
    setElements(layoutedElements);
  }, [elements]);

  return (
    <MainContext.Provider value={{
      elements,
      setElements,
      adjustLayout,
      showImportModal,
      setShowImportModal,
      showNodeModal,
      setShowNodeModal,
      showMiniMap,
      setShowMiniMap,
      edgeSource,
      setEdgeSource,
      resetNodeModalStates,
    }}
    >
      {children}
    </MainContext.Provider>
  );
};
