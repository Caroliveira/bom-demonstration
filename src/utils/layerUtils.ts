import { Edge } from "react-flow-renderer";
import { CustomNodeType } from "../context";
import { nodeById } from ".";

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

const removeDuplicateds = (nodes: CustomNodeType[]) => {
  return nodes.reduce((acc, el) => {
    const index = acc.findIndex((subEl) => subEl.data.label === el.data.label);
    let addElement = true;

    if (index > -1) {
      if (acc[index].layer < el.layer) acc.splice(index, 1);
      else addElement = false;
    }

    return addElement ? [...acc, el] : acc;
  }, [] as CustomNodeType[]);
};

export const updateLayers = (
  current: CustomNodeType[],
  nodes: CustomNodeType[],
  edges: Edge[],
  nextLayer: number
) => {
  const nodesWithDuplicateds = nextNodesUpdateLayers(
    current,
    nodes,
    edges,
    nextLayer
  );
  return removeDuplicateds(nodesWithDuplicateds);
};
