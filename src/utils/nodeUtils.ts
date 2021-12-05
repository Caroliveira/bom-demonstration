import { CustomNode } from "../context";

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
