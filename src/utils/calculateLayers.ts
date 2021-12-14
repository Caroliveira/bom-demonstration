import { Edges, Node, Nodes } from "../context";

type NodesArr = ({ id: string } & Node)[];
type EdgesArr = { source: string; target: string; label: number }[];

const defineEdgesAndNodesAsArray = (nodes: Nodes, edges: Edges) => {
  const nodesArr = Object.entries(nodes).map(([id, node]) => ({ ...node, id }));
  const edgesArr = Object.entries(edges).map(([id, label]) => {
    const [source, target] = id.split("-");
    return { source, target, label };
  });
  return { nodesArr, edgesArr };
};

const reverseNodesToObject = (nodesArr: NodesArr) => {
  const nodes: Nodes = {};
  nodesArr.forEach(({ id, ...node }) => {
    nodes[id] = node;
  });
  return nodes;
};

const setNextLayers = (
  currentNodes: NodesArr,
  nodes: NodesArr,
  edges: EdgesArr,
  layer: number
): NodesArr => {
  const nextNodes: NodesArr = [];

  currentNodes.forEach((node) => {
    const targetEdges = edges.filter(({ source }) => source === node.id);
    targetEdges.forEach(({ target }) => {
      const targetNode = nodes.find((n) => n.id === target);
      if (targetNode) nextNodes.push({ ...targetNode, layer });
    });
  });

  if (!nextNodes.length) return currentNodes;
  return [
    ...currentNodes,
    ...setNextLayers(nextNodes, nodes, edges, layer + 1),
  ];
};

const removeDuplicatedNodes = (duplicateds: NodesArr) => {
  return duplicateds.reduce((acc, el) => {
    const index = acc.findIndex((subEl) => subEl.id === el.id);
    let addElement = true;

    if (index > -1) {
      if (acc[index].layer < el.layer) acc.splice(index, 1);
      else addElement = false;
    }

    return addElement ? [...acc, el] : acc;
  }, [] as NodesArr);
};

export const calculateLayers = (nodes: Nodes, edges: Edges) => {
  const { nodesArr, edgesArr } = defineEdgesAndNodesAsArray(nodes, edges);

  const rootNodes: NodesArr = [];
  nodesArr.forEach((node) => {
    if (!edgesArr.find(({ target }) => target === node.id))
      rootNodes.push(node);
  });

  const duplicateds = setNextLayers(rootNodes, nodesArr, edgesArr, 1);
  const calculateds = removeDuplicatedNodes(duplicateds);
  return reverseNodesToObject(calculateds);
};
