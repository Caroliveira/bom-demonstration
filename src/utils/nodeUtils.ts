import { v4 as uuid } from "uuid";
import { Node, Nodes } from "../context";

export const getNodesByLayer = (nodes: Nodes, layer: number) => {
  const nodesByLayer: Nodes = {};
  Object.entries(nodes).forEach(([id, node]) => {
    if (layer === node.layer) nodesByLayer[id] = node;
  });
  return nodesByLayer;
};

export const nodeMounter = (label: string): { id: string } & Node => {
  return {
    id: uuid(),
    label,
    amount: 0,
    layer: 0,
    timer: 0,
  };
};
