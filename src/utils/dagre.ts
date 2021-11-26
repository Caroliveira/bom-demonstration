import dagre from 'dagre';
import { Elements, isEdge, Position } from 'react-flow-renderer';

const nodeWidth = 172;
const nodeHeight = 36;

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

export const getLayoutedElements = (elements: Elements, direction: 'TB' | 'LR' = 'TB'): Elements => {
  const isHorizontal = direction === 'LR';
  dagreGraph.setGraph({ rankdir: direction });

  elements.forEach((el) => {
    if (isEdge(el)) dagreGraph.setEdge(el.source, el.target);
    else dagreGraph.setNode(el.id, { width: nodeWidth, height: nodeHeight });
  });

  dagre.layout(dagreGraph);

  return elements.map((element) => {
    const el = element;

    if (!isEdge(el)) {
      const nodeWithPosition = dagreGraph.node(el.id);
      el.targetPosition = isHorizontal ? Position.Left : Position.Top;
      el.sourcePosition = isHorizontal ? Position.Right : Position.Bottom;

      el.position = {
        x: nodeWithPosition.x - nodeWidth / 2 + Math.random() / 1000,
        y: nodeWithPosition.y - nodeHeight / 2,
      };
    }

    return el;
  });
};
