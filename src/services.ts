import axios from "axios";
import { EdgesToSaveType } from "./components/ExportModalComponent";

const base = "https://bom-demonstration-api.herokuapp.com";

export const getEdges = async (id: string) => {
  try {
    const res = await axios.get(`${base}/edges/${id}`, {
      headers: { Accept: "application/json" },
    });
    return res.data;
  } catch (error: any) {
    return error.response.status;
  }
};

export const createEdges = async (id: string, edges: EdgesToSaveType) => {
  try {
    const res = await axios.post(`${base}/edges`, { id, edges });
    return res.data;
  } catch (error: any) {
    return error.response.status;
  }
};

export const updateEdges = async (id: string, edges: EdgesToSaveType) => {
  try {
    const res = await axios.put(`${base}/edges/${id}`, edges);
    return res.data;
  } catch (error: any) {
    return error.response.status;
  }
};
