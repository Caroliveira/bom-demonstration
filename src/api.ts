import axios from "axios";

const dbName = "bom-demonstration";
const dbUri = "http://localhost:5984/";

export const getEdges = async (id: string) => {
  const res = await axios.get(`${dbUri}${dbName}/${id}`, {
    withCredentials: true,
  });
  return res.data;
};
