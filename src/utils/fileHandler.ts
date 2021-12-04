import { Edge } from "react-flow-renderer";
import { CustomNode } from "../context";

type FileHandlerType = { nodes: CustomNode[]; edges: Edge[] };

// TO DO: adapt csvHandler to new store format
// const csvHandler = (result: string) => {
//   const rows = result.split("\n");
//   const table = rows.map((el) => el.split(","));
//   const columns = ["source", "target", "value"];

//   const isHeaderValid = !columns.some((el, i) => el !== table[0][i]);
//   const cleanTable = table.filter((row, index) => {
//     return (
//       index && row.length >= columns.length && !row.some((col) => col === "")
//     );
//   });

//   return isHeaderValid && cleanTable[0]
//     ? csvTableHandler(cleanTable)
//     : undefined;
// };

const jsonHandler = (result: string): FileHandlerType => {
  const { nodes, edges } = JSON.parse(result);
  return { nodes, edges };
};

export const fileHandler = (
  result: string,
  fileType: string
): FileHandlerType | undefined => {
  // if (fileType === "text/csv") return csvHandler(result);
  if (fileType === "application/json") return jsonHandler(result);
  return undefined;
};
