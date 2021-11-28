import { ArrowHeadType, Edge } from 'react-flow-renderer';
import { v4 as uuid } from 'uuid';

import { nodeMounter } from '.';
import { CustomNodeType } from '../context';

type FileHandlerType = { nodes: CustomNodeType[], edges: Edge[]};
type JsonItemType = { source: string; target: string; value: string };

const csvTableHandler = (table: string[][]): FileHandlerType => {
  const nodes: CustomNodeType[] = [];
  const edges: Edge[] = table.map((row) => {
    const sourceExist = nodes.find(({ data }) => data.label === row[0]);
    const targetExist = nodes.find(({ data }) => data.label === row[1]);
    const source = sourceExist || nodeMounter(row[0]);
    const target = targetExist || nodeMounter(row[1]);
    if (!sourceExist) nodes.push(source);
    if (!targetExist) nodes.push(target);
    return {
      id: uuid(),
      label: parseFloat(row[2]),
      source: source.id,
      target: target.id,
      arrowHeadType: ArrowHeadType.ArrowClosed,
    };
  });

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
  const nodes: CustomNodeType[] = [];
  const edges = rawEdges.map(({ source, target, value }: JsonItemType) => {
    const sourceExist = nodes.find(({ data }) => data.label === source);
    const targetExist = nodes.find(({ data }) => data.label === target);
    const sourceNode = sourceExist || nodeMounter(source);
    const targetNode = targetExist || nodeMounter(target);
    if (!sourceExist) nodes.push(sourceNode);
    if (!targetExist) nodes.push(targetNode);
    return {
      id: uuid(),
      label: value,
      source: sourceNode.id,
      target: targetNode.id,
      arrowHeadType: ArrowHeadType.ArrowClosed,
    };
  });

  return { nodes, edges };
};

export const fileHandler = (result: string, fileType: string): FileHandlerType | undefined => {
  if (fileType === 'text/csv') return csvHandler(result);
  if (fileType === 'application/json') return jsonHandler(result);
  return undefined;
};
