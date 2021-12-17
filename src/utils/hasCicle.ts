import { Connection, Edge } from "react-flow-renderer";
import { Edges } from "../context";

const findCicle = (
  currentEdges: string[][],
  source: string,
  edgesDeps: string[][],
  hasCircle: boolean
): boolean => {
  if (hasCircle) return hasCircle;
  let circleResult = false;
  currentEdges.forEach(([_, target]) => {
    if (target === source) circleResult = true;
    else {
      const nextEdges = edgesDeps.filter(([auxTarget]) => auxTarget === target);
      circleResult = findCicle(nextEdges, source, edgesDeps, hasCircle);
    }
  });
  return circleResult;
};

export const hasCicle = (edge: Edge | Connection, edges: Edges) => {
  const { source, target } = edge;
  if (source && target) {
    const edgesDeps = Object.keys(edges).map((id) => id.split("-"));
    const nextEdges = edgesDeps.filter(([auxTarget]) => auxTarget === target);
    return findCicle(nextEdges, source, edgesDeps, false);
  }
  return false;
};
