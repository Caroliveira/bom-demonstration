import { ArrowHeadType, Edge, Node } from 'react-flow-renderer';

type FileHandlerType = { nodes: Node[], links: Edge[]};
type JsonItemType = { source: string; target: string; value: string };

const nodeMounter = (name: string): Node => {
  return {
    id: name,
    type: 'default',
    data: { label: name },
    position: { x: 0, y: 0 },
  };
};

const nodeExist = (nodes: Node[], node: string) => {
  return nodes.some(({ id }) => id === node);
};

const tableHandler = (table: string[][]): FileHandlerType => {
  const nodes: Node[] = [];
  const links: Edge[] = table.map((row) => {
    if (!nodeExist(nodes, row[0])) nodes.push(nodeMounter(row[0]));
    if (!nodeExist(nodes, row[1])) nodes.push(nodeMounter(row[1]));
    return {
      id: `${row[0]}-${row[1]}`,
      label: parseFloat(row[2]),
      source: row[0],
      target: row[1],
      arrowHeadType: ArrowHeadType.ArrowClosed,
    };
  });

  return { nodes, links };
};

const csvHandler = (result: string) => {
  const rows = result.split('\n');
  const table = rows.map((el) => el.split(','));
  const columns = ['source', 'target', 'value'];

  const isHeaderValid = !columns.some((el, i) => el !== table[0][i]);
  const cleanTable = table.filter(
    (row, index) => index && row.length >= columns.length && !row.some((col) => col === ''),
  );

  const model = isHeaderValid && cleanTable[0] ? tableHandler(cleanTable) : undefined;
  return model;
};

const jsonHandler = (result: string): FileHandlerType => {
  const rawLinks = JSON.parse(result);
  const nodes: Node[] = [];
  const links = rawLinks.map(({ source, target, value }: JsonItemType) => {
    if (!nodeExist(nodes, source)) nodes.push(nodeMounter(source));
    if (!nodeExist(nodes, target)) nodes.push(nodeMounter(target));
    return {
      id: `${source}-${target}`,
      label: value,
      source,
      target,
      arrowHeadType: ArrowHeadType.ArrowClosed,
    };
  });
  return { nodes, links };
};

export const fileHandler = (result: string, fileType: string): FileHandlerType | undefined => {
  if (fileType === 'text/csv') return csvHandler(result);
  if (fileType === 'application/json') return jsonHandler(result);
  return undefined;
};
