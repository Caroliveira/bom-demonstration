import React, {
  useState, useEffect, ReactChild, useContext,
} from 'react';
import { MainContext, NodeWithLayerType } from '.';

type DependentType = { index: number; amountNeeded: number }[];
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

  const defineDependencies = (layersArray: SimulatorNode[][]) => {
    links.forEach(({ source, target, label }) => {
      const amountNeeded = parseInt(label as string, 10);

      let sourceIndex;
      const sourceLayer = layersArray.findIndex((layer) => {
        sourceIndex = layer.findIndex((node) => node.id === source);
        return sourceIndex > -1;
      });

      let targetIndex;
      const targetLayer = layersArray.findIndex((layer) => {
        targetIndex = layer.findIndex((node) => node.id === target);
        return targetIndex > -1;
      });

      if (sourceIndex && targetIndex) {
        layersArray[sourceLayer][sourceIndex].pos.push({ index: targetIndex, amountNeeded });
        layersArray[targetLayer][targetIndex].pre.push({ index: sourceIndex, amountNeeded });
      }
    });

    setAllLayers(layersArray);
    setAvailableLayers([layersArray[0], layersArray[1]]);
  };

  const separateLayers = () => {
    const layersArray: SimulatorNode[][] = [];

    nodes.forEach((node) => {
      const simulatorNode: SimulatorNode = { ...node, ...defaultNodeAddition };
      if (layersArray[node.layer]) layersArray[node.layer].push(simulatorNode);
      else layersArray[node.layer] = [simulatorNode];
    });

    if (layersArray.length) defineDependencies(layersArray);
  };

  useEffect(() => separateLayers(), []);

  return (
    <SimulatorContext.Provider value={{ allLayers, availableLayers, setAvailableLayers }}>
      {children}
    </SimulatorContext.Provider>
  );
};
