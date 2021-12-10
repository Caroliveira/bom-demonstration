import React, { useState, useCallback, useEffect } from "react";
import { Elements } from "react-flow-renderer";

import { getLayoutedElements } from "../utils";

type AdjustLayoutParams = { dir?: "TB" | "LR"; els?: Elements } | undefined;

export type Node = {
  label: string;
  amount: number;
  layer: number;
  timer: number;
};

export type Nodes = { [id: string]: Node };

export type Edge = {
  label: string;
  source: string;
  target: string;
};

export type Edges = { [id: string]: Edge };

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
  nodes: Nodes;
  edges: Edges;
  elements: Elements;
  setElements: (elements: Elements) => void;
  conversionEdges: ConversionEdge[];
  setConversionEdges: (conversionEdges: ConversionEdge[]) => void;
  adjustLayout: (params: AdjustLayoutParams) => void;
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
  const [nodes, setNodes] = useState<Nodes>({});
  const [edges, setEdges] = useState<Edges>({});
  const [elements, setElements] = useState<Elements>([]);
  const [conversionEdges, setConversionEdges] = useState<ConversionEdge[]>([]);
  const [direction, setDirection] = useState<"TB" | "LR">("TB");
  const [showImportModal, setShowImportModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showFullHeader, setShowFullHeader] = useState(false);
  const [showNodeModal, setShowNodeModal] = useState(false);
  const [loadingGet, setLoadingGet] = useState(false);
  const [loadingSet, setLoadingSet] = useState(false);

  const adjustLayout = useCallback(
    (params: AdjustLayoutParams) => {
      const currentDirection = params?.dir || direction;
      const currentElements = params?.els || elements;
      const layoutedElements = getLayoutedElements(
        currentElements,
        currentDirection
      );
      setElements(layoutedElements);
      setDirection(currentDirection);
    },
    [elements]
  );

  const setProject = (project?: Project) => {
    if (project) {
      const { nodes: n, edges: e } = project;
      const elsEdges = Object.entries(e).map(([id, el]) => ({ ...el, id }));
      const elsNodes = Object.entries(n).map(([id, { label, ...rest }]) => {
        return { ...rest, id, data: { label } };
      });
      setNodes(n);
      setEdges(e);
      adjustLayout({ els: [...elsNodes, ...elsEdges] as Elements });
    }
  };

  return (
    <ProjectContext.Provider
      value={{
        nodes,
        edges,
        elements,
        setElements,
        conversionEdges,
        setConversionEdges,
        adjustLayout,
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
