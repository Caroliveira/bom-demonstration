import React, { useCallback, useContext, useEffect, useState } from "react";
import { Elements } from "react-flow-renderer";
import { ProjectContext } from "../context";
import { getLayoutedElements } from "../utils";

type DirectionType = "TB" | "LR";

export const useDiagram = () => {
  const { nodes, edges } = useContext(ProjectContext);
  const [elements, setElements] = useState<Elements>([]);
  const [direction, setDirection] = useState<DirectionType>("TB");
  const [showEdgeModal, setShowEdgeModal] = useState(false);
  const [showMiniMap, setShowMiniMap] = useState(true);
  const [edgeId, setEdgeId] = useState("");

  const adjustLayout = useCallback(
    (dir: DirectionType, els?: Elements) => {
      const currentElements = els || elements;
      const layoutedElements = getLayoutedElements(currentElements, dir);
      setElements(layoutedElements);
      if (dir !== direction) setDirection(dir);
    },
    [elements]
  );

  useEffect(() => {
    const elsEdges = Object.entries(edges).map(([id, el]) => ({ ...el, id }));
    const elsNodes = Object.entries(nodes).map(([id, { label, ...rest }]) => {
      return { ...rest, id, data: { label } };
    });
    adjustLayout(direction, [...elsNodes, ...elsEdges] as Elements);
  }, [nodes, edges]);

  const closeEdgeModal = () => {
    setShowEdgeModal(false);
    setEdgeId("");
  };

  return {
    elements,
    setElements,
    edgeId,
    setEdgeId,
    showEdgeModal,
    setShowEdgeModal,
    showMiniMap,
    setShowMiniMap,
    adjustLayout,
    closeEdgeModal,
  };
};
