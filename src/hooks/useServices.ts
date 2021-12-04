import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Edge } from "react-flow-renderer";
import axios from "axios";

import { CustomNode, MainContext } from "../context";

export type ProjectType = {
  id: string;
  nodes: CustomNode[];
  edges: Edge[];
  conversionEdges?: Edge[];
};

axios.defaults.headers.common = { Accept: "application/json" };

export const useServices = () => {
  const history = useHistory();
  const { adjustLayout } = useContext(MainContext);
  const base = "https://bom-demonstration-api.herokuapp.com";

  const getProject = async (id: string) => {
    try {
      const { data } = await axios.get(`${base}/projects/${id}`);
      if (data) {
        adjustLayout({ els: [...data.nodes, ...data.edges] });
        if (history.location.pathname !== "/diagram") history.push("/diagram");
        return 200;
      }
      return 404;
    } catch (err: any) {
      return err?.response?.status || 500;
    }
  };

  const createProject = async (project: Partial<ProjectType>) => {
    try {
      const res = await axios.post(`${base}/projects`, project);
      return res.data;
    } catch (error: any) {
      return error.response.status;
    }
  };

  const updateProject = async ({ id, ...project }: ProjectType) => {
    try {
      const res = await axios.put(`${base}/projects/${id}`, project);
      return res.data;
    } catch (error: any) {
      return error;
    }
  };

  return { getProject, createProject, updateProject };
};
