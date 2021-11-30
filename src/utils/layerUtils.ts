import { Edge, Node } from "react-flow-renderer";
import { CustomNodeType } from "../context";
import { nodeById, removeDuplicatedNodes } from ".";

const nextNodesUpdateLayers = (
  currentNodes: CustomNodeType[],
  nodes: CustomNodeType[],
  edges: Edge[],
  layer: number
): CustomNodeType[] => {
  const nextNodes: CustomNodeType[] = [];
  currentNodes.forEach((node) => {
    const targetEdges = edges.filter(({ source }) => source === node.id);
    targetEdges.forEach(({ target }) => {
      const targetNode = nodeById(nodes, target);
      if (targetNode) nextNodes.push({ ...targetNode, layer });
    });
  });

  if (!nextNodes.length) return currentNodes;
  return [
    ...currentNodes,
    ...nextNodesUpdateLayers(nextNodes, nodes, edges, layer + 1),
  ];
};

export const updateLayers = (
  current: CustomNodeType[],
  nodes: (CustomNodeType | Node)[],
  edges: Edge[],
  nextLayer: number
) => {
  const nodesWithDuplicateds = nextNodesUpdateLayers(
    current,
    nodes as CustomNodeType[],
    edges,
    nextLayer
  );
  return removeDuplicatedNodes(
    nodesWithDuplicateds,
    (subEl, el) => subEl.layer < el.layer,
    "data"
  );
};
