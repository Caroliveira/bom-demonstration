import React, {
  useState, useEffect, ReactChild, useContext,
} from 'react';
import { MainContext, CustomNodeType } from '.';

export type LayersType = CustomNodeType[][];

type SimulatorContextType = {
  layers: LayersType;
  setLayers: (layers: LayersType) => void;
};

type SimulatorContextProviderType = {children : ReactChild};

export const SimulatorContext = React.createContext({} as SimulatorContextType);

export const SimulatorContextProvider = ({ children }: SimulatorContextProviderType):
  JSX.Element => {
  const { nodes, links } = useContext(MainContext);
  const [layers, setLayers] = useState<LayersType>([]);

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
    <SimulatorContext.Provider value={{ layers, setLayers }}>
      {children}
    </SimulatorContext.Provider>
  );
};
