import { Node } from "react-flow-renderer";
import { CustomNodeType } from "../context";

export const nodeById = (nodes: Node[], id?: string | null) => {
  if (!id) return undefined;
  return nodes.find((node) => node.id === id) as CustomNodeType;
};
