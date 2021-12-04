import { Elements } from "react-flow-renderer";

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

const jsonHandler = (result: string): Elements => {
  const { id, nodes, edges } = JSON.parse(result);
  localStorage.setItem("bom_demonstration_id", id);
  return [...nodes, ...edges];
};

export const fileHandler = (
  result: string,
  fileType = "application/json"
): Elements | undefined => {
  // if (fileType === "text/csv") return csvHandler(result);
  if (fileType === "application/json") return jsonHandler(result);
  return undefined;
};
