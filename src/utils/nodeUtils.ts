import { Node } from "react-flow-renderer";
import { CustomNodeType } from "../context";

export const nodeById = (nodes: Node[], id?: string | null) => {
  if (!id) return undefined;
  return nodes.find((node) => node.id === id) as CustomNodeType;
};

const compare = (
  subEl: CustomNodeType,
  el: CustomNodeType,
  attribute: keyof CustomNodeType
) => {
  if (attribute === "data") return subEl.data.label === el.data.label;
  return subEl[attribute] === el[attribute];
};

export const removeDuplicatedNodes = (
  nodes: (CustomNodeType | Node)[],
  condition: (subEl: CustomNodeType, el: CustomNodeType) => boolean,
  attribute: keyof CustomNodeType
) => {
  return (nodes as CustomNodeType[]).reduce((acc, el) => {
    const index = acc.findIndex((subEl) => compare(subEl, el, attribute));
    let addElement = true;

    if (index > -1) {
      if (condition(acc[index], el)) acc.splice(index, 1);
      else addElement = false;
    }

    return addElement ? [...acc, el] : acc;
  }, [] as CustomNodeType[]);
};
