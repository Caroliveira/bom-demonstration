import { Node } from "react-flow-renderer";
import { v4 as uuid } from "uuid";

export const nodeById = (nodes: Node[], id?: string | null) => {
  if (!id) return undefined;
  return nodes.find((node) => node.id === id) as Node;
};

export const nodeMounter = (name: string): Node => {
  return {
    id: uuid(),
    type: "default",
    data: { label: name },
    position: { x: 0, y: 0 },
  };
};
