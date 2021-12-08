import React, { useState, useEffect, useContext } from "react";
import { Edge, isEdge, useStoreState } from "react-flow-renderer";
import { CustomNode, ProjectContext } from "../context";

type SimulationContextType = {
  maxLayer?: number;
  allowForcedOperations: boolean;
  setAllowForcedOperations: (allow: boolean) => void;
  isAvailable: (node: CustomNode) => boolean;
  changeNodeAmount: (node: CustomNode, type: "add" | "subtract") => void;
};

type SimulationContextProviderType = { children: React.ReactChild };

export const SimulationContext = React.createContext(
  {} as SimulationContextType
);

export const SimulationContextProvider = ({
  children,
}: SimulationContextProviderType): JSX.Element => {
  const { elements, setElements } = useContext(ProjectContext);
  const nodes = useStoreState((store) => store.nodes) as CustomNode[];
  const [maxLayer, setMaxLayer] = useState<number>();
  const [allowForcedOperations, setAllowForcedOperations] = useState(false);

  useEffect(() => {
    if (!nodes.length) setMaxLayer(undefined);
    else {
      const max = nodes.reduce((acc, vl) => {
        return acc > vl.layer ? acc : vl.layer;
      }, 0);
      setMaxLayer(max);
    }
  }, []);

  const isAvailable = (node: CustomNode) => {
    const auxEdges: Edge[] = [];
    const auxNodes: CustomNode[] = [];
    elements.forEach((el) =>
      isEdge(el) ? auxEdges.push(el) : auxNodes.push(el as CustomNode)
    );

    let available = true;
    auxEdges.forEach(({ source, target, label }) => {
      if (target === node.id) {
        const { amount } = auxNodes.find(({ id }) => source === id) || {};
        if (amount !== undefined && amount < parseInt(label as string, 10)) {
          available = false;
        }
      }
    });
    return available;
  };

  const changeNodeAmount = (node: CustomNode, type: "add" | "subtract") => {
    const updatedElements = elements.map((element) => {
      if (!isEdge(element) && element.id === node.id) {
        const el = { ...element } as CustomNode;
        if (type === "add") el.amount += 1;
        else el.amount -= 1;
        return el;
      }
      return element;
    });
    setElements(updatedElements);
  };

  return (
    <SimulationContext.Provider
      value={{
        maxLayer,
        allowForcedOperations,
        setAllowForcedOperations,
        isAvailable,
        changeNodeAmount,
      }}
    >
      {children}
    </SimulationContext.Provider>
  );
};
