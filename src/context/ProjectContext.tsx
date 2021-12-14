import React, { useState } from "react";

export type Node = {
  label: string;
  amount: number;
  layer: number;
  timer: number;
};

export type Nodes = { [id: string]: Node };

export type Edges = { [id: string]: number };

export type ConversionEdge = {
  label: string;
  source: string[];
  target: string[];
};

export type Project = {
  nodes: Nodes;
  edges: Edges;
  conversionEdges: ConversionEdge[];
};

type ProjectContextType = {
  nodeId: string;
  setNodeId: (nodeId: string) => void;
  nodes: Nodes;
  setNodes: (nodes: Nodes) => void;
  edges: Edges;
  setEdges: (edges: Edges) => void;
  conversionEdges: ConversionEdge[];
  setConversionEdges: (conversionEdges: ConversionEdge[]) => void;
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
};

type ProjectContextProviderType = { children: React.ReactChild };

export const ProjectContext = React.createContext({} as ProjectContextType);

export const ProjectContextProvider = ({
  children,
}: ProjectContextProviderType): JSX.Element => {
  const [nodeId, setNodeId] = useState("");
  const [nodes, setNodes] = useState<Nodes>({});
  const [edges, setEdges] = useState<Edges>({});
  const [conversionEdges, setConversionEdges] = useState<ConversionEdge[]>([]);
  const [showImportModal, setShowImportModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showFullHeader, setShowFullHeader] = useState(false);
  const [showNodeModal, setShowNodeModal] = useState(false);
  const [loadingGet, setLoadingGet] = useState(false);
  const [loadingSet, setLoadingSet] = useState(false);

  const setProject = (project?: Project) => {
    if (project) {
      const { nodes: n, edges: e } = project;
      setNodes(n);
      setEdges(e);
    }
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
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};
