import React, { useState, useEffect, useContext } from "react";
import { ProjectContext } from "../context";

type SimulationContextType = {
  maxLayer?: number;
  allowForcedOperations: boolean;
  setAllowForcedOperations: (allow: boolean) => void;
  isAvailable: (nodeId: string) => boolean;
  changeNodeAmount: (nodeId: string, type: "add" | "subtract") => void;
};

type SimulationContextProviderType = { children: React.ReactChild };

export const SimulationContext = React.createContext(
  {} as SimulationContextType
);

export const SimulationContextProvider = ({
  children,
}: SimulationContextProviderType): JSX.Element => {
  const { nodes, setNodes, edges } = useContext(ProjectContext);
  const [maxLayer, setMaxLayer] = useState<number>();
  const [allowForcedOperations, setAllowForcedOperations] = useState(false);

  useEffect(() => {
    if (!nodes.length) setMaxLayer(undefined);
    else {
      const max = Object.values(nodes).reduce((acc, vl) => {
        return acc > vl.layer ? acc : vl.layer;
      }, 0);
      setMaxLayer(max);
    }
  }, []);

  const isAvailable = (nodeId: string) => {
    let available = true;
    Object.entries(edges).forEach(([edgeId, { label }]) => {
      const [source, target] = edgeId.split("-");
      if (target === nodeId) {
        const { amount } = nodes[source];
        if (amount !== undefined && amount < parseInt(label as string, 10)) {
          available = false;
        }
      }
    });
    return available;
  };

  const changeNodeAmount = (nodeId: string, type: "add" | "subtract") => {
    const auxNodes = { ...nodes };
    if (type === "add") auxNodes[nodeId].amount += 1;
    else auxNodes[nodeId].amount -= 1;
    setNodes(auxNodes);
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
