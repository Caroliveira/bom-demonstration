import React from "react";
import { Edge } from "react-flow-renderer";
import { CustomNode } from "../context";

const calculateLayers = (
  currentNodes: CustomNode[],
  nodes: CustomNode[],
  edges: Edge[],
  layer: number
): CustomNode[] => {
  const nextNodes: CustomNode[] = [];
  currentNodes.forEach((node) => {
    const targetEdges = edges.filter(({ source }) => source === node.id);
    targetEdges.forEach(({ target }) => {
      const targetNode = nodes.find((n) => n.id === target);
      if (targetNode) nextNodes.push({ ...targetNode, layer });
    });
  });

  if (!nextNodes.length) return currentNodes;
  return [
    ...currentNodes,
    ...calculateLayers(nextNodes, nodes, edges, layer + 1),
  ];
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

export const calculateNodesLayers = (nodes: CustomNode[], edges: Edge[]) => {
  const rootNodes: CustomNode[] = [];
  nodes.forEach((node) => {
    if (!edges.find(({ target }) => target === node.id)) rootNodes.push(node);
  });

  const duplicateds = calculateLayers(rootNodes, nodes, edges, 1);
  const calculateds = removeDuplicatedNodes(duplicateds);
  return [...calculateds, ...edges];
};

export const getNodesByLayer = (nodes: CustomNode[], layer: number) => {
  return nodes.filter((node) => node.layer === layer);
};
