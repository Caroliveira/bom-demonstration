import React, { useState, useEffect, useContext } from "react";
import { useStoreState, Node } from "react-flow-renderer";
import { NodeContext } from "../context";
import { nodeById } from "../utils";

export type CalculatedNode = { layer: number; amount: number } & Node;

export const useLayers = () => {
  const { setLayer } = useContext(NodeContext);
  const nodes = useStoreState((store) => store.nodes);
  const edges = useStoreState((store) => store.edges);
  const [calculatedNodes, setCalculatedNodes] = useState<CalculatedNode[]>([]);

  const calculateLayers = (
    currentNodes: CalculatedNode[]
  ): CalculatedNode[] => {
    const nextNodes: CalculatedNode[] = [];
    currentNodes.forEach((n) => {
      const sourceEdges = edges.filter(({ target }) => target === n.id);
      sourceEdges.forEach(({ source, label }) => {
        const sourceNode = nodeById(nodes, source);
        const amount = parseInt(label as string, 10);
        if (sourceNode) {
          const sourceCalculatedNode = { ...sourceNode, layer: 0, amount };
          nextNodes.push(sourceCalculatedNode);
        }
      });
    });

    if (!nextNodes.length) return currentNodes;
    const calculatedNextNodes = calculateLayers(nextNodes);
    const currentLayer = calculatedNextNodes[0].layer + 1;
    const calculateCurrentNodes = currentNodes.map((n) => {
      return { ...n, layer: currentLayer };
    });

    return [...calculateCurrentNodes, ...calculatedNextNodes];
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

  const calculateNodes = (node: Node) => {
    const duplicateds = calculateLayers([{ ...node, layer: 0, amount: 0 }]);
    const calculateds = removeDuplicatedNodes(duplicateds);
    setCalculatedNodes(calculateds);
    return calculateds.find((n) => n.id === node.id)?.layer || 0;
  };

  const getCalculatedLayer = (layer: number) => {
    return calculatedNodes.filter((n) => n.layer === layer);
  };

  return { getCalculatedLayer, calculateNodes };
};
