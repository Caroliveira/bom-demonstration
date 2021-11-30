import { Edge, Elements } from "react-flow-renderer";
import { v4 as uuid } from "uuid";

import { getLayoutedElements } from "./dagre";
import { CustomNodeType } from "../context";
import { nodeById } from ".";

export const nodeMounter = (name: string): CustomNodeType => {
  return {
    id: uuid(),
    type: "default",
    data: { label: name },
    position: { x: 0, y: 0 },
    available: false,
    amount: 0,
    timer: 0,
    layer: 0,
  };
};

const findNextNodes = (
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
    ...findNextNodes(nextNodes, nodes, edges, layer + 1),
  ];
};

const removeDuplicateds = (nodes: CustomNodeType[]) => {
  return nodes.reduce((acc, el) => {
    const index = acc.findIndex((subEl) => subEl.id === el.id);
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
  const nodesWithDuplicateds = findNextNodes(current, nodes, edges, nextLayer);
  const nodesWithLayer = removeDuplicateds(nodesWithDuplicateds);
  return getLayoutedElements([...nodesWithLayer, ...edges]);
};

export const mountElements = (
  nodes: CustomNodeType[],
  edges: Edge[]
): Elements => {
  const rootNodes: CustomNodeType[] = [];
  nodes.forEach((node) => {
    if (!edges.find(({ target }) => target === node.id)) rootNodes.push(node);
  });

  return updateLayers(rootNodes, nodes, edges, 1);
};
