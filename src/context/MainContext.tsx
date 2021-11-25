import React, { useState, ReactChild } from 'react';
import { Edge, Node } from 'react-flow-renderer';
import { nodeToCustomNode } from '../utils';

export type CustomNodeType = {
  layer: number;
  amount: number;
  timer: number;
  available: boolean;
} & Node;

type MainContextType = {
  showNodeModal: boolean;
  setShowNodeModal: (showNodeModal: boolean) => void;
  showImportModal: boolean;
  setShowImportModal: (showImportModal: boolean) => void;
  nodes: CustomNodeType[];
  setNodes: (nodes: CustomNodeType[]) => void;
  links: Edge[];
  setLinks: (links: Edge[]) => void;
  setModel: (nodes: Node[], links: Edge[]) => void;
};

type MainContextProviderType = {children : ReactChild};

export const MainContext = React.createContext({} as MainContextType);

export const MainContextProvider = ({ children }: MainContextProviderType): JSX.Element => {
  const [showImportModal, setShowImportModal] = useState(false);
  const [showNodeModal, setShowNodeModal] = useState(false);
  const [nodes, setNodes] = useState<CustomNodeType[]>([]);
  const [links, setLinks] = useState<Edge[]>([]);

  const setModel = (unorderedNodes: Node[], unassignedLinks: Edge[]) => {
    const nodesWithLayer: CustomNodeType[] = nodeToCustomNode(unorderedNodes, unassignedLinks);

    const countArray: number[] = [];
    const nodesWithPosition = nodesWithLayer.map((node) => {
      const countLayer = countArray[node.layer] || 0;
      countArray[node.layer] = countLayer + 1;
      return { ...node, position: { x: countLayer * 200, y: node.layer * 200 } };
    });

    setNodes(nodesWithPosition);
    setLinks(unassignedLinks);
  };

  return (
    <MainContext.Provider value={{
      showNodeModal,
      setShowNodeModal,
      showImportModal,
      setShowImportModal,
      nodes,
      setNodes,
      links,
      setLinks,
      setModel,
    }}
    >
      {children}
    </MainContext.Provider>
  );
};
