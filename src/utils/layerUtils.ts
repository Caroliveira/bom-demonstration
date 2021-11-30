import { Edge, Node } from "react-flow-renderer";
import { nodeById, removeDuplicatedNodes } from ".";

// const nextNodesUpdateLayers = (
//   currentNodes: Node[],
//   nodes: Node[],
//   edges: Edge[],
//   layer: number
// ): Node[] => {
//   const nextNodes: Node[] = [];
//   currentNodes.forEach((node) => {
//     const targetEdges = edges.filter(({ source }) => source === node.id);
//     targetEdges.forEach(({ target }) => {
//       const targetNode = nodeById(nodes, target);
//       if (targetNode) nextNodes.push({ ...targetNode, layer });
//     });
//   });

//   if (!nextNodes.length) return currentNodes;
//   return [
//     ...currentNodes,
//     ...nextNodesUpdateLayers(nextNodes, nodes, edges, layer + 1),
//   ];
// };

// export const updateLayers = (
//   current: Node[],
//   nodes: Node[],
//   edges: Edge[],
//   nextLayer: number
// ) => {
//   const nodesWithDuplicateds = nextNodesUpdateLayers(
//     current,
//     nodes as Node[],
//     edges,
//     nextLayer
//   );
//   return removeDuplicatedNodes(
//     nodesWithDuplicateds,
//     (subEl, el) => subEl.layer < el.layer,
//     "data"
//   );
// };
