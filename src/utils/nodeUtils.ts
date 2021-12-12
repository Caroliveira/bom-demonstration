import { v4 as uuid } from "uuid";
import { CustomNode, Nodes } from "../context";

export const nodeById = (nodes: CustomNode[], id?: string | null) => {
  if (!id) return undefined;
  return nodes.find((n) => n.id === id);
};

export const nodeArrayById = (nodes: CustomNode[], nodesId: string[]) => {
  const nodesById: CustomNode[] = [];
  nodesId.forEach((id) => {
    const nodeExist = nodeById(nodes, id);
    if (nodeExist) nodesById.push(nodeExist);
  });
  return nodesById;
};

export const getNodesByLayer = (nodes: Nodes, layer: number) => {
  const nodesByLayer: Nodes = {};
  Object.entries(nodes).forEach(([id, node]) => {
    if (layer === node.layer) nodesByLayer[id] = node;
  });
  return nodesByLayer;
};

export const nodeMounter = (label: string): CustomNode => {
  return {
    id: uuid(),
    type: "default",
    data: { label },
    position: { x: 0, y: 0 },
    amount: 0,
    layer: 0,
    timer: 0,
  };
};
