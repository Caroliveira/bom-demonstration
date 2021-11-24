import React, { useState, ReactChild } from 'react';
import { Edge, Node } from 'react-flow-renderer';
import { nodesWithLayers } from '../utils';

export type NodeWithLayerType = Node & {layer: number};

type MainContextType = {
  showImportModal: boolean;
  setShowImportModal: (showImportModal: boolean) => void;
  nodes: NodeWithLayerType[];
  setNodes: (nodes: NodeWithLayerType[]) => void;
  links: Edge[];
  setLinks: (links: Edge[]) => void;
  setModel: (nodes: Node[], links: Edge[]) => void;
};

type MainContextProviderType = {children : ReactChild};

export const MainContext = React.createContext({} as MainContextType);

export const MainContextProvider = ({ children }: MainContextProviderType): JSX.Element => {
  const [showImportModal, setShowImportModal] = useState(false);
  const [nodes, setNodes] = useState<NodeWithLayerType[]>([]);
  const [links, setLinks] = useState<Edge[]>([]);

  const setModel = (unorderedNodes: Node[], unassignedLinks: Edge[]) => {
    const nodesWithLayer: NodeWithLayerType[] = nodesWithLayers(unorderedNodes, unassignedLinks);

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
