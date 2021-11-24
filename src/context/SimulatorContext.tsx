import React, {
  useState, useEffect, ReactChild, useContext,
} from 'react';
import { MainContext, NodeWithLayerType } from '.';

type DependentType = { index: number; name: string; amountNeeded: number }[];
type NodeAddition = { amount: number; timer: number; pre: DependentType; pos: DependentType }
export type SimulatorNode = NodeAddition & NodeWithLayerType;
export type LayersType = SimulatorNode[][];

const defaultNodeAddition: NodeAddition = {
  amount: 0, timer: 0, pre: [], pos: [],
};

type SimulatorContextType = {
  allLayers: LayersType;
  availableLayers: LayersType;
  setAvailableLayers: (layers: LayersType) => void;
};

type SimulatorContextProviderType = {children : ReactChild};

export const SimulatorContext = React.createContext({} as SimulatorContextType);

export const SimulatorContextProvider = ({ children }: SimulatorContextProviderType):
  JSX.Element => {
  const { nodes, links } = useContext(MainContext);
  const [allLayers, setAllLayers] = useState<LayersType>([]);
  const [availableLayers, setAvailableLayers] = useState<LayersType>([]);

  const separateLayers = () => {
    const layersArray: SimulatorNode[][] = [];

    nodes.forEach((node) => {
      const simulatorNode: SimulatorNode = { ...node, ...defaultNodeAddition };
      if (layersArray[node.layer]) layersArray[node.layer].push(simulatorNode);
      else layersArray[node.layer] = [simulatorNode];
    });

    setAllLayers(layersArray);
    setAvailableLayers([layersArray[0]]);
  };

  useEffect(() => separateLayers(), []);

  return (
    <SimulatorContext.Provider value={{ allLayers, availableLayers, setAvailableLayers }}>
      {children}
    </SimulatorContext.Provider>
  );
};
