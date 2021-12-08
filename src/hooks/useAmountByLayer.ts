import React, { useContext } from "react";
import { useStoreState } from "react-flow-renderer";
import { CustomNode, NodeContext } from "../context";
import { nodeById } from "../utils";

type NodeWithAmount = { amountNeeded: number } & CustomNode;

export const useAmountByLayer = () => {
  const { node } = useContext(NodeContext);
  const nodes = useStoreState((store) => store.nodes) as CustomNode[];
  const edges = useStoreState((store) => store.edges);

  const calculateLayers = (
    currentNodes: NodeWithAmount[],
    currentLayer: number,
    wantedLayer: number
  ): NodeWithAmount[] => {
    if (currentLayer === wantedLayer) return currentNodes;

    const nextNodes: NodeWithAmount[] = [];
    currentNodes.forEach(({ id, amountNeeded }) => {
      const sourceEdges = edges.filter(({ target }) => target === id);
      sourceEdges.forEach(({ source, label }) => {
        const sourceNode = nodeById(nodes, source);
        if (sourceNode)
          nextNodes.push({
            ...sourceNode,
            amountNeeded: parseInt(label as string, 10) * amountNeeded,
          });
      });
    });

    return [
      ...currentNodes,
      ...calculateLayers(nextNodes, currentLayer - 1, wantedLayer),
    ];
  };

  const removeDuplicatedNodes = (duplicateds: NodeWithAmount[]) => {
    return duplicateds.reduce((acc, el) => {
      const index = acc.findIndex((subEl) => subEl.id === el.id);
      const { amountNeeded } = acc[index] || { amountNeeded: 0 };
      let addElement = true;

      if (index > -1) {
        if (acc[index].layer > el.layer) acc.splice(index, 1);
        else {
          addElement = false;
          acc[index].amountNeeded += el.amountNeeded;
        }
      }

      return addElement
        ? [...acc, { ...el, amountNeeded: amountNeeded + el.amountNeeded }]
        : acc;
    }, [] as NodeWithAmount[]);
  };

  const calculateNodesLayers = (layer: number) => {
    if (node) {
      const nodeArr = [{ ...node, amountNeeded: 1 }];
      const duplicateds = calculateLayers(nodeArr, node.layer, layer);
      const filtereds = duplicateds.filter((n) => n.layer === layer);
      return removeDuplicatedNodes(filtereds);
    }
    return [];
  };

  return { calculateNodesLayers };
};
