import React, { useCallback, useContext, useEffect, useState } from "react";
import { Elements } from "react-flow-renderer";
import { ProjectContext } from "../context";
import { getLayoutedElements } from "../utils";

type DirectionType = "TB" | "LR";

type DiagramContextType = {
  elements: Elements;
  setElements: (elements: Elements) => void;
  edgeId: string;
  setEdgeId: (edgeId: string) => void;
  direction: DirectionType;
  showMiniMap: boolean;
  setShowMiniMap: (showMiniMap: boolean) => void;
  adjustLayout: (dir: DirectionType, els?: Elements) => void;
};

type DiagramContextProviderType = { children: React.ReactNode };

export const DiagramContext = React.createContext({} as DiagramContextType);

export const DiagramContextProvider = ({
  children,
}: DiagramContextProviderType): JSX.Element => {
  const { nodes, edges } = useContext(ProjectContext);
  const [elements, setElements] = useState<Elements>([]);
  const [direction, setDirection] = useState<DirectionType>("TB");
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
    const elsEdges = Object.entries(edges).map(([id, label]) => {
      const [source, target] = id.split("-");
      return { id, source, target, label };
    });
    const elsNodes = Object.entries(nodes).map(([id, { label, ...rest }]) => {
      return { ...rest, id, data: { label } };
    });
    adjustLayout(direction, [...elsNodes, ...elsEdges] as Elements);
  }, [nodes, edges]);

  return (
    <DiagramContext.Provider
      value={{
        elements,
        setElements,
        edgeId,
        setEdgeId,
        direction,
        showMiniMap,
        setShowMiniMap,
        adjustLayout,
      }}
    >
      {children}
    </DiagramContext.Provider>
  );
};
