import React, { useState } from "react";

export type ConversionEdge = {
  label?: string;
  sources: { [id: string]: number };
  targets: { [id: string]: number };
  available: boolean;
};

export type Node = {
  label: string;
  amount: number;
  layer: number;
  timer: number;
};

export type Nodes = { [id: string]: Node };

export type Edges = { [id: string]: number };

export type ConversionEdges = { [id: string]: ConversionEdge };

export type Project = {
  nodes: Nodes;
  edges: Edges;
  conversionEdges: ConversionEdges;
};

type ProjectContextType = {
  nodeId: string;
  setNodeId: (nodeId: string) => void;
  nodes: Nodes;
  setNodes: (nodes: Nodes) => void;
  edges: Edges;
  setEdges: (edges: Edges) => void;
  conversionEdges: ConversionEdges;
  setConversionEdges: (conversionEdges: ConversionEdges) => void;
  showImportModal: boolean;
  setShowImportModal: (showImportModal: boolean) => void;
  showExportModal: boolean;
  setShowExportModal: (showExportModal: boolean) => void;
  showNodeModal: boolean;
  setShowNodeModal: (show: boolean) => void;
  showFullHeader: boolean;
  setShowFullHeader: (show: boolean) => void;
  loadingGet: boolean;
  setLoadingGet: (show: boolean) => void;
  loadingSet: boolean;
  setLoadingSet: (show: boolean) => void;
  setProject: (project?: Project) => void;
  closeProject: () => void;
  resetNodesAmount: () => void;
};

type ProjectContextProviderType = { children: React.ReactChild };

export const ProjectContext = React.createContext({} as ProjectContextType);

export const ProjectContextProvider = ({
  children,
}: ProjectContextProviderType): JSX.Element => {
  const [nodeId, setNodeId] = useState("");
  const [nodes, setNodes] = useState<Nodes>({});
  const [edges, setEdges] = useState<Edges>({});
  const [conversionEdges, setConversionEdges] = useState<ConversionEdges>({});
  const [showImportModal, setShowImportModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showFullHeader, setShowFullHeader] = useState(false);
  const [showNodeModal, setShowNodeModal] = useState(false);
  const [loadingGet, setLoadingGet] = useState(false);
  const [loadingSet, setLoadingSet] = useState(false);

  const closeProject = () => {
    localStorage.removeItem("bom_demonstration_id");
    setShowFullHeader(false);
    setNodes({});
    setEdges({});
    setConversionEdges({});
  };

  const setProject = (project?: Project) => {
    if (project) {
      const { nodes: n, edges: e, conversionEdges: ce } = project;
      setNodes(n);
      setEdges(e);
      setConversionEdges(ce);
    }
  };

  const resetNodesAmount = () => {
    const auxNodes = { ...nodes };
    Object.keys(nodes).forEach((id) => {
      auxNodes[id].amount = 0;
    });
    setNodes(auxNodes);
  };

  return (
    <ProjectContext.Provider
      value={{
        nodeId,
        setNodeId,
        nodes,
        setNodes,
        edges,
        setEdges,
        conversionEdges,
        setConversionEdges,
        showImportModal,
        setShowImportModal,
        showExportModal,
        setShowExportModal,
        showNodeModal,
        setShowNodeModal,
        showFullHeader,
        setShowFullHeader,
        loadingGet,
        setLoadingGet,
        loadingSet,
        setLoadingSet,
        setProject,
        closeProject,
        resetNodesAmount,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};
