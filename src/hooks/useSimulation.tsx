import { useContext, useEffect, useState } from 'react';
import { Context, NodeWithLayerType } from '../context';

export type SimulatorNodes = {
  amount: number;
  timer: number;
} & NodeWithLayerType;
type LayersType = SimulatorNodes[][]

const useSimulation = (): LayersType => {
  const { nodes, links } = useContext(Context);
  const [layers, setLayers] = useState<LayersType>([]);
  const [availableNodes, setAvailableNodes] = useState<LayersType>([]);

  const separateLayers = () => {
    const layersArray: SimulatorNodes[][] = [];
    nodes.forEach((node) => {
      const simulatorNode = { ...node, amount: 0, timer: 0 };
      if (layersArray[node.layer]) layersArray[node.layer].push(simulatorNode);
      else layersArray[node.layer] = [simulatorNode];
    });
    setLayers(layersArray);
    setAvailableNodes([layersArray[0]]);
  };

  useEffect(() => separateLayers(), []);

  return availableNodes;
};

export default useSimulation;
