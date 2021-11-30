import { Node } from "react-flow-renderer";
import { v4 as uuid } from "uuid";

export const nodeById = (nodes: Node[], id?: string | null) => {
  if (!id) return undefined;
  return nodes.find((node) => node.id === id) as Node;
};

const compare = (subEl: Node, el: Node, attribute: keyof Node) => {
  if (attribute === "data") return subEl.data.label === el.data.label;
  return subEl[attribute] === el[attribute];
};

export const removeDuplicatedNodes = (
  nodes: (Node | Node)[],
  condition: (subEl: Node, el: Node) => boolean,
  attribute: keyof Node
) => {
  return (nodes as Node[]).reduce((acc, el) => {
    const index = acc.findIndex((subEl) => compare(subEl, el, attribute));
    let addElement = true;

    if (index > -1) {
      if (condition(acc[index], el)) acc.splice(index, 1);
      else addElement = false;
    }

    return addElement ? [...acc, el] : acc;
  }, [] as Node[]);
};

export const nodeMounter = (name: string): Node => {
  return {
    id: uuid(),
    type: "default",
    data: { label: name },
    position: { x: 0, y: 0 },
  };
};
