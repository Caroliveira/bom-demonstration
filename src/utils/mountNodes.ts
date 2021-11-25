import { Edge, Node } from 'react-flow-renderer';
import { CustomNodeType } from '../context';

const findNextNodes = (
  currentNodes: CustomNodeType[],
  nodes: Node[],
  links: Edge[],
  count: number,
): CustomNodeType[] => {
  const nextNodes: CustomNodeType[] = [];

  currentNodes.forEach((node) => {
    const targetLinks = links.filter(({ source }) => source === node.id);

    targetLinks.forEach(({ target }) => {
      const targetNode = nodes.find(({ id }) => id === target);
      if (targetNode) {
        nextNodes.push({
          ...targetNode, layer: count, amount: 0, timer: 0, available: false,
        });
      }
    });
  });

  if (!nextNodes.length) return currentNodes;
  return [...currentNodes, ...findNextNodes(nextNodes, nodes, links, count + 1)];
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

export const nodeToCustomNode = (nodes: Node[], links: Edge[]): CustomNodeType[] => {
  const rootNodes: CustomNodeType[] = [];

  nodes.forEach((node) => {
    if (!links.find(({ target }) => target === node.id)) {
      rootNodes.push({
        ...node, layer: 0, amount: 0, timer: 0, available: true,
      });
    }
  });

  const nodesWithDuplicateds = findNextNodes(rootNodes, nodes, links, 1);
  return removeDuplicateds(nodesWithDuplicateds);
};
