import React, { useState, useEffect, ReactChild } from "react";
import { useStoreState, Node } from "react-flow-renderer";

export type SimulatorNodeType = {
  layer: number;
  amount: number;
  timer: number;
  available: boolean;
} & Node;

export type LayersType = SimulatorNodeType[][];

type SimulatorContextType = {
  layers: LayersType;
  setLayers: (layers: LayersType) => void;
  allowForcedOperations: boolean;
  setAllowForcedOperations: (allow: boolean) => void;
};

type SimulatorContextProviderType = { children: ReactChild };

export const SimulatorContext = React.createContext({} as SimulatorContextType);

export const SimulatorContextProvider = ({
  children,
}: SimulatorContextProviderType): JSX.Element => {
  const nodes = useStoreState((store) => store.nodes) as SimulatorNodeType[];
  const [layers, setLayers] = useState<LayersType>([]);
  const [allowForcedOperations, setAllowForcedOperations] = useState(false);

  const separateLayers = () => {
    const layersArray: SimulatorNodeType[][] = [];

    nodes.forEach((node) => {
      if (layersArray[node.layer]) layersArray[node.layer].push(node);
      else layersArray[node.layer] = [node];
    });

    setLayers(layersArray);
  };

  useEffect(separateLayers, []);

  return (
    <SimulatorContext.Provider
      value={{
        layers,
        setLayers,
        allowForcedOperations,
        setAllowForcedOperations,
      }}
    >
      {children}
    </SimulatorContext.Provider>
  );
};
