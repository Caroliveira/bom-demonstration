import React, { useContext, useMemo } from "react";
import { NodeContext, ProjectContext } from "../context";

type CalculatedNode = {
  id: string;
  label: string;
  layer: number;
  amount: number;
};

export const useAmountByLayer = () => {
  const { nodeId } = useContext(NodeContext);
  const { nodes, edges } = useContext(ProjectContext);

  const edgesArr = useMemo(() => {
    return Object.entries(edges).map(([edgeId, edge]) => {
      const [source, target] = edgeId.split("-");
      return { source, target, label: edge.label };
    });
  }, [edges]);

  const calculateLayers = (
    currentNodes: CalculatedNode[],
    currentLayer: number,
    wantedLayer: number
  ): CalculatedNode[] => {
    if (currentLayer === wantedLayer) return currentNodes;

    const nextNodes: CalculatedNode[] = [];
    currentNodes.forEach(({ id, amount }) => {
      const sourceEdges = edgesArr.filter(({ target }) => target === id);
      sourceEdges.forEach(({ source, label }) => {
        nextNodes.push({
          id: source,
          label: nodes[source].label,
          layer: nodes[source].layer,
          amount: parseInt(label as string, 10) * amount,
        });
      });
    });

    return [
      ...currentNodes,
      ...calculateLayers(nextNodes, currentLayer - 1, wantedLayer),
    ];
  };

  const removeDuplicatedNodes = (duplicateds: CalculatedNode[]) => {
    return duplicateds.reduce((acc, el) => {
      const index = acc.findIndex((subEl) => subEl.id === el.id);
      const { amount } = acc[index] || { amount: 0 };
      let addElement = true;

      if (index > -1) {
        if (acc[index].layer > el.layer) acc.splice(index, 1);
        else {
          addElement = false;
          acc[index].amount += el.amount;
        }
      }

      return addElement ? [...acc, { ...el, amount: amount + el.amount }] : acc;
    }, [] as CalculatedNode[]);
  };

  const calculateNodesLayers = (wantedLayer: number) => {
    if (nodeId) {
      const { label, layer } = nodes[nodeId];
      const nodeArr = [{ id: nodeId, label, layer, amount: 1 }];
      const duplicateds = calculateLayers(nodeArr, layer, wantedLayer);
      const filtereds = duplicateds.filter((n) => n.layer === wantedLayer);
      return removeDuplicatedNodes(filtereds);
    }
    return [];
  };

  return { calculateNodesLayers };
};
