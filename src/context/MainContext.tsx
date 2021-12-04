import React, { useState, useCallback, useEffect } from "react";
import { Edge, Elements } from "react-flow-renderer";
import { useHistory } from "react-router-dom";

import { getLayoutedElements } from "../utils";

type AdjustLayoutParams = { dir?: "TB" | "LR"; els?: Elements } | undefined;

type MainContextType = {
  elements: Elements;
  setElements: (elements: Elements) => void;
  edge?: Edge;
  setEdge: (edge: Edge) => void;
  adjustLayout: (params: AdjustLayoutParams) => void;
  showImportModal: boolean;
  setShowImportModal: (showImportModal: boolean) => void;
  showExportModal: boolean;
  setShowExportModal: (showExportModal: boolean) => void;
  showEdgeModal: boolean;
  setShowEdgeModal: (show: boolean) => void;
  showMiniMap: boolean;
  setShowMiniMap: (show: boolean) => void;
  showFullHeader: boolean;
  setShowFullHeader: (show: boolean) => void;
  closeEdgeModal: () => void;
};

type MainContextProviderType = { children: React.ReactChild };

export const MainContext = React.createContext({} as MainContextType);

export const MainContextProvider = ({
  children,
}: MainContextProviderType): JSX.Element => {
  const [elements, setElements] = useState<Elements>([]);
  const [direction, setDirection] = useState<"TB" | "LR">("TB");
  const [showImportModal, setShowImportModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showFullHeader, setShowFullHeader] = useState(false);
  const [showEdgeModal, setShowEdgeModal] = useState(false);
  const [showMiniMap, setShowMiniMap] = useState(true);
  const [edge, setEdge] = useState<Edge>();

  const closeEdgeModal = () => {
    setShowEdgeModal(false);
    setEdge(undefined);
  };

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
    <MainContext.Provider
      value={{
        edge,
        setEdge,
        elements,
        setElements,
        adjustLayout,
        showImportModal,
        setShowImportModal,
        showExportModal,
        setShowExportModal,
        showEdgeModal,
        setShowEdgeModal,
        showMiniMap,
        setShowMiniMap,
        closeEdgeModal,
        showFullHeader,
        setShowFullHeader,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};
