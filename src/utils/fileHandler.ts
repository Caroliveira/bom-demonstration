import { ArrowHeadType, Edge, Node } from 'react-flow-renderer';

type FileHandlerType = { nodes: Node[], edges: Edge[]};
type JsonItemType = { source: string; target: string; value: string };

const nodeMounter = (name: string): Node => {
  return {
    id: name,
    type: 'default',
    data: { label: name },
    position: { x: 0, y: 0 },
  };
};

const doesNodeExist = (nodes: Node[], node: string) => {
  return nodes.some(({ id }) => id === node);
};

const csvTableHandler = (table: string[][]): FileHandlerType => {
  const nodes: Node[] = [];
  const edges: Edge[] = table.map((row) => {
    if (!doesNodeExist(nodes, row[0])) nodes.push(nodeMounter(row[0]));
    if (!doesNodeExist(nodes, row[1])) nodes.push(nodeMounter(row[1]));
    return {
      id: `${row[0]}-${row[1]}`,
      label: parseFloat(row[2]),
      source: row[0],
      target: row[1],
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
  const cleanTable = table.filter(
    (row, index) => index && row.length >= columns.length && !row.some((col) => col === ''),
  );

  const model = isHeaderValid && cleanTable[0] ? csvTableHandler(cleanTable) : undefined;
  return model;
};

const jsonHandler = (result: string): FileHandlerType => {
  const rawEdges = JSON.parse(result);
  const nodes: Node[] = [];
  const edges = rawEdges.map(({ source, target, value }: JsonItemType) => {
    if (!doesNodeExist(nodes, source)) nodes.push(nodeMounter(source));
    if (!doesNodeExist(nodes, target)) nodes.push(nodeMounter(target));
    return {
      id: `${source}-${target}`,
      label: value,
      source,
      target,
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
