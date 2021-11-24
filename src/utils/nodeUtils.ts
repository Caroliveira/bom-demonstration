import { Edge, Node } from 'react-flow-renderer';

type NodesWithLayersType = (Node & {layer: number})[];

const calculateLayer = (
  rootNodes: NodesWithLayersType,
  nodes: Node[],
  links: Edge[],
  count: number,
): NodesWithLayersType => {
  const nextNodes: NodesWithLayersType = [];
  rootNodes.forEach((node) => {
    const auxLinks = links.filter(({ source }) => source === node.id);
    auxLinks.forEach(({ target }) => {
      const auxNode = nodes.find(({ id }) => id === target);
      if (auxNode) {
        const newNode = { ...auxNode, layer: count };
        if (!nextNodes.find((el) => el.id === newNode.id)) nextNodes.push(newNode);
      }
    });
  });

  if (!nextNodes.length) return [];
  const result = calculateLayer(nextNodes, nodes, links, count + 1);

  const compiledArray = rootNodes.reduce((acc, el) => {
    const index = result.findIndex((subEl) => subEl.id === el.id);
    let nodeToAdd = el;
    if (index > -1) {
      result.splice(index, 1);
      nodeToAdd = result[index].layer > el.layer ? result[index] : el;
    }
    return [...acc, nodeToAdd];
  }, [] as NodesWithLayersType);

  return [...compiledArray, ...result];
};

export const nodesWithLayers = (nodes: Node[], links: Edge[]): NodesWithLayersType => {
  const rootNodes: NodesWithLayersType = [];

  nodes.forEach((node) => {
    if (!links.find(({ target }) => target === node.id)) rootNodes.push({ ...node, layer: 0 });
  });

  return calculateLayer(rootNodes, nodes, links, 1);
};
