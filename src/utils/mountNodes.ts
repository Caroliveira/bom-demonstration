import { Edge, Node } from 'react-flow-renderer';
import { NodeWithLayerType } from '../context';

const findNextNodes = (
  rootNodes: NodeWithLayerType[],
  nodes: Node[],
  links: Edge[],
  count: number,
): NodeWithLayerType[] => {
  const nextNodes: NodeWithLayerType[] = [];
  rootNodes.forEach((node) => {
    const auxLinks = links.filter(({ source }) => source === node.id);
    auxLinks.forEach(({ target }) => {
      const auxNode = nodes.find(({ id }) => id === target);
      if (auxNode) nextNodes.push({ ...auxNode, layer: count });
    });
  });

  if (!nextNodes.length) return rootNodes;
  return [...rootNodes, ...findNextNodes(nextNodes, nodes, links, count + 1)];
};

const removeDuplicateds = (nodes: NodeWithLayerType[]) => {
  return nodes.reduce((acc, el) => {
    const index = acc.findIndex((subEl) => subEl.id === el.id);
    const auxAcc = acc;
    let addElement = true;

    if (index > -1) {
      if (auxAcc[index].layer < el.layer) auxAcc.splice(index, 1);
      else addElement = false;
    }

    return addElement ? [...auxAcc, el] : auxAcc;
  }, [] as NodeWithLayerType[]);
};

export const nodesWithLayers = (nodes: Node[], links: Edge[]): NodeWithLayerType[] => {
  const rootNodes: NodeWithLayerType[] = [];

  nodes.forEach((node) => {
    if (!links.find(({ target }) => target === node.id)) rootNodes.push({ ...node, layer: 0 });
  });

  const nodesWithDuplicateds = findNextNodes(rootNodes, nodes, links, 1);
  return removeDuplicateds(nodesWithDuplicateds);
};
