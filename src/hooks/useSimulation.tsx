import React, { useState, useEffect } from "react";
import { useStoreState } from "react-flow-renderer";
import { CustomNode } from "../context";

export const useSimulation = () => {
  const nodes = useStoreState((store) => store.nodes) as CustomNode[];
  const edges = useStoreState((store) => store.edges);
  const [layers, setLayers] = useState<CustomNode[][]>([]);
  const [allowForcedOperations, setAllowForcedOperations] = useState(false);

  useEffect(() => {
    const layersArray: CustomNode[][] = [];
    nodes.forEach((node) => {
      if (layersArray[node.layer]) layersArray[node.layer].push(node);
      else layersArray[node.layer] = [node];
    });
    setLayers(layersArray);
  }, []);

  const isAvailable = (node: CustomNode) => {
    let available = true;
    edges.forEach(({ source, target, label }) => {
      if (target === node.id) {
        const { amount } = nodes.find(({ id }) => source === id) || {};
        if (amount !== undefined && amount < parseInt(label as string, 10)) {
          available = false;
        }
      }
    });
    return available;
  };

  return {
    layers,
    allowForcedOperations,
    setAllowForcedOperations,
    isAvailable,
  };
};
