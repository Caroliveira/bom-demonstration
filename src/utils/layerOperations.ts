import { Edge, Elements, isEdge } from "react-flow-renderer";
import { CustomNode } from "../context";

const defineEdgesAndNodes = (elements: Elements) => {
  const nodes: CustomNode[] = [];
  const edges: Edge[] = [];
  elements.forEach((el) =>
    isEdge(el) ? edges.push(el) : nodes.push(el as CustomNode)
  );
  return { nodes, edges };
};

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
    let addElement = true;

    if (index > -1) {
      if (acc[index].layer < el.layer) acc.splice(index, 1);
      else addElement = false;
    }

    return addElement ? [...acc, el] : acc;
  }, [] as CustomNode[]);
};

export const calculateNodesLayers = (elements: Elements) => {
  const { nodes, edges } = defineEdgesAndNodes(elements);

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
