import React, { useState, ReactChild } from 'react';
import { Edge, Node } from 'react-flow-renderer';
import { nodesWithLayers } from './utils';

type ContextType = {
  showImportModal: boolean;
  setShowImportModal: (showImportModal: boolean) => void;
  nodes: Node[];
  setNodes: (nodes: Node[]) => void;
  links: Edge[];
  setLinks: (links: Edge[]) => void;
  setModel: (nodes: Node[], links: Edge[]) => void;
};

type ContextProviderType = {children : ReactChild};

export const Context = React.createContext({} as ContextType);

export const ContextProvider = ({ children }: ContextProviderType): JSX.Element => {
  const [showImportModal, setShowImportModal] = useState(false);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [links, setLinks] = useState<Edge[]>([]);

  const setModel = (unorderedNodes: Node[], unassignedLinks: Edge[]) => {
    const nodesWithLayer:
      (Node & {layer: number})[] = nodesWithLayers(unorderedNodes, unassignedLinks);

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
    <Context.Provider value={{
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
    </Context.Provider>
  );
};
