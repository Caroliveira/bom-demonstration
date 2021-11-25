import React, { useState, ReactChild } from 'react';
import { Edge, Node } from 'react-flow-renderer';
import { nodeToCustomNode } from '../utils';

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
  showImportModal: boolean;
  setShowImportModal: (showImportModal: boolean) => void;
  nodes: CustomNodeType[];
  links: Edge[];
  setModel: (nodes: Node[], links: Edge[]) => void;
  showNodeModal: boolean;
  setShowNodeModal: (show: boolean) => void;
  addNode: (node: CustomNodeType) => void;
  addLink: (link: Edge) => void;
  edgeSource: string;
  setEdgeSource: (nodeId: string) => void;
};

type MainContextProviderType = {children : ReactChild};

export const MainContext = React.createContext({} as MainContextType);

export const MainContextProvider = ({ children }: MainContextProviderType): JSX.Element => {
  const [showImportModal, setShowImportModal] = useState(false);
  const [showNodeModal, setShowNodeModal] = useState(false);
  const [edgeSource, setEdgeSource] = useState('');
  const [nodes, setNodes] = useState<CustomNodeType[]>([]);
  const [links, setLinks] = useState<Edge[]>([]);

  const addNode = (node: CustomNodeType) => setNodes([...nodes, node]);
  const addLink = (link: Edge) => setLinks([...links, link]);

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
      showImportModal,
      setShowImportModal,
      nodes,
      links,
      setModel,
      showNodeModal,
      setShowNodeModal,
      addNode,
      addLink,
      edgeSource,
      setEdgeSource,
    }}
    >
      {children}
    </MainContext.Provider>
  );
};
