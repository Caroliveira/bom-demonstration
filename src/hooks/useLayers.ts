import React, { useContext } from "react";
import { useStoreState } from "react-flow-renderer";
import { CustomNode, MainContext, NodeContext } from "../context";

export const useLayers = () => {
  const { setElements } = useContext(MainContext);
  const { nodeById } = useContext(NodeContext);
  const edges = useStoreState((store) => store.edges);
  const nodes = useStoreState((store) => store.nodes) as CustomNode[];

  const calculateLayers = (
    currentNodes: CustomNode[],
    layer: number
  ): CustomNode[] => {
    const nextNodes: CustomNode[] = [];
    currentNodes.forEach((node) => {
      const targetEdges = edges.filter(({ source }) => source === node.id);
      targetEdges.forEach(({ target }) => {
        const targetNode = nodeById(target);
        if (targetNode) nextNodes.push({ ...targetNode, layer });
      });
    });

    if (!nextNodes.length) return currentNodes;
    return [...currentNodes, ...calculateLayers(nextNodes, layer + 1)];
  };

  const removeDuplicatedNodes = (duplicateds: CustomNode[]) => {
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
    }, [] as CustomNode[]);
  };

  const calculateNodesLayers = () => {
    const rootNodes: CustomNode[] = [];
    nodes.forEach((node) => {
      if (!edges.find(({ target }) => target === node.id)) rootNodes.push(node);
    });

    const duplicateds = calculateLayers(rootNodes, 1);
    const calculateds = removeDuplicatedNodes(duplicateds);
    setElements([...calculateds, ...edges]);
  };

  const getNodesByLayer = (layer: number) => {
    return nodes.filter((node) => node.layer === layer);
  };

  return { getNodesByLayer, calculateNodesLayers };
};
