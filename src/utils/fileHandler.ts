import { ArrowHeadType, Edge } from 'react-flow-renderer';
import { v4 as uuid } from 'uuid';

import { nodeMounter } from '.';
import { CustomNodeType } from '../context';

type FileHandlerType = { nodes: CustomNodeType[], edges: Edge[]};
type JsonItemType = { source: string; target: string; value: string };

const nodesCreator = (sourceLabels: string[], targetLabels: string[]) => {
  const uniqueLabels = [...new Set([...sourceLabels, ...targetLabels])];
  return uniqueLabels.map((label) => nodeMounter(label));
};

const edgesCreator = (
  nodes: CustomNodeType[],
  sourceLabel: string,
  targetLabel: string,
  edgeValue: string,
) => {
  const source = nodes.find(({ data }) => data.label === sourceLabel);
  const target = nodes.find(({ data }) => data.label === targetLabel);
  return {
    id: uuid(),
    label: parseFloat(edgeValue),
    source: source?.id || '',
    target: target?.id || '',
    arrowHeadType: ArrowHeadType.ArrowClosed,
  };
};

const csvTableHandler = (table: string[][]): FileHandlerType => {
  const sourceLabels = table.map((row) => row[0]);
  const targetLabels = table.map((row) => row[1]);
  const nodes = nodesCreator(sourceLabels, targetLabels);
  const edges = table.map((row) => edgesCreator(nodes, row[0], row[1], row[2]));
  return { nodes, edges };
};

const csvHandler = (result: string) => {
  const rows = result.split('\n');
  const table = rows.map((el) => el.split(','));
  const columns = ['source', 'target', 'value'];

  const isHeaderValid = !columns.some((el, i) => el !== table[0][i]);
  const cleanTable = table.filter((row, index) => {
    return (index && row.length >= columns.length && !row.some((col) => col === ''));
  });

  return isHeaderValid && cleanTable[0] ? csvTableHandler(cleanTable) : undefined;
};

const jsonHandler = (result: string): FileHandlerType => {
  const rawEdges = JSON.parse(result);
  const sourceLabels = rawEdges.map(({ source }: JsonItemType) => source);
  const targetLabels = rawEdges.map(({ target }: JsonItemType) => target);
  const nodes = nodesCreator(sourceLabels, targetLabels);
  const edges = rawEdges.map(({ source, target, value }: JsonItemType) => {
    return edgesCreator(nodes, source, target, value);
  });
  return { nodes, edges };
};

export const fileHandler = (result: string, fileType: string): FileHandlerType | undefined => {
  if (fileType === 'text/csv') return csvHandler(result);
  if (fileType === 'application/json') return jsonHandler(result);
  return undefined;
};
