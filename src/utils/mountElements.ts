import { Edge, Elements } from "react-flow-renderer";
import { v4 as uuid } from "uuid";

import { getLayoutedElements } from "./dagre";
import { CustomNodeType } from "../context";
import { updateLayers } from ".";

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

export const mountElements = (
  nodes: CustomNodeType[],
  edges: Edge[]
): Elements => {
  const rootNodes: CustomNodeType[] = [];
  nodes.forEach((node) => {
    if (!edges.find(({ target }) => target === node.id)) rootNodes.push(node);
  });
  const elements = [...updateLayers(rootNodes, nodes, edges, 1), ...edges];
  return getLayoutedElements(elements);
};
