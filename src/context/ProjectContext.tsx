import React, { useState, useCallback } from "react";
import { Edge, Elements } from "react-flow-renderer";

import { getLayoutedElements } from "../utils";

type AdjustLayoutParams = { dir?: "TB" | "LR"; els?: Elements } | undefined;

type ProjectContextType = {
  elements: Elements;
  setElements: (elements: Elements) => void;
  conversionEdges: Edge[];
  setConversionEdges: (edges: Edge[]) => void;
  adjustLayout: (params: AdjustLayoutParams) => void;
  showImportModal: boolean;
  setShowImportModal: (showImportModal: boolean) => void;
  showExportModal: boolean;
  setShowExportModal: (showExportModal: boolean) => void;
  showNodeModal: boolean;
  setShowNodeModal: (show: boolean) => void;
  showFullHeader: boolean;
  setShowFullHeader: (show: boolean) => void;
};

type ProjectContextProviderType = { children: React.ReactChild };

export const ProjectContext = React.createContext({} as ProjectContextType);

export const ProjectContextProvider = ({
  children,
}: ProjectContextProviderType): JSX.Element => {
  const [elements, setElements] = useState<Elements>([]);
  const [conversionEdges, setConversionEdges] = useState<Edge[]>([]);
  const [direction, setDirection] = useState<"TB" | "LR">("TB");
  const [showImportModal, setShowImportModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showFullHeader, setShowFullHeader] = useState(false);
  const [showNodeModal, setShowNodeModal] = useState(false);

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

  return (
    <ProjectContext.Provider
      value={{
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
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};
