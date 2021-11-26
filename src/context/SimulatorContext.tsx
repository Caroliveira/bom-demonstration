import React, { useState, useEffect, ReactChild } from 'react';
import { useStoreState } from 'react-flow-renderer';
import { CustomNodeType } from '.';

export type LayersType = CustomNodeType[][];

type SimulatorContextType = {
  layers: LayersType;
  setLayers: (layers: LayersType) => void;
  allowForcedOperations: boolean;
  setAllowForcedOperations: (allow: boolean) => void;
};

type SimulatorContextProviderType = {children : ReactChild};

export const SimulatorContext = React.createContext({} as SimulatorContextType);

export const SimulatorContextProvider = ({ children }: SimulatorContextProviderType):
  JSX.Element => {
  const nodes = useStoreState((store) => store.nodes) as CustomNodeType[];
  const [layers, setLayers] = useState<LayersType>([]);
  const [allowForcedOperations, setAllowForcedOperations] = useState(false);

  const separateLayers = () => {
    const layersArray: CustomNodeType[][] = [];

    nodes.forEach((node) => {
      if (layersArray[node.layer]) layersArray[node.layer].push(node);
      else layersArray[node.layer] = [node];
    });

    setLayers(layersArray);
  };

  useEffect(separateLayers, []);

  return (
    <SimulatorContext.Provider value={{
      layers, setLayers, allowForcedOperations, setAllowForcedOperations,
    }}
    >
      {children}
    </SimulatorContext.Provider>
  );
};
