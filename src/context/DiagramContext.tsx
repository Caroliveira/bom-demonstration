import React, { useState } from "react";
import { Edge } from "react-flow-renderer";

type DiagramContextType = {
  edge?: Edge;
  setEdge: (edge: Edge) => void;
  showEdgeModal: boolean;
  setShowEdgeModal: (show: boolean) => void;
  showMiniMap: boolean;
  setShowMiniMap: (show: boolean) => void;
  closeEdgeModal: () => void;
};

type DiagramContextProviderType = { children: React.ReactChild };

export const DiagramContext = React.createContext({} as DiagramContextType);

export const DiagramContextProvider = ({
  children,
}: DiagramContextProviderType): JSX.Element => {
  const [showEdgeModal, setShowEdgeModal] = useState(false);
  const [showMiniMap, setShowMiniMap] = useState(true);
  const [edge, setEdge] = useState<Edge>();

  const closeEdgeModal = () => {
    setShowEdgeModal(false);
    setEdge(undefined);
  };

  return (
    <DiagramContext.Provider
      value={{
        edge,
        setEdge,
        showEdgeModal,
        setShowEdgeModal,
        showMiniMap,
        setShowMiniMap,
        closeEdgeModal,
      }}
    >
      {children}
    </DiagramContext.Provider>
  );
};
