import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { Edge } from "react-flow-renderer";
import axios from "axios";

import { CustomNode, ProjectContext } from "../context";

export type ProjectType = {
  id: string;
  nodes: CustomNode[];
  edges: Edge[];
  conversionEdges?: Edge[];
};

axios.defaults.headers.common = { Accept: "application/json" };

export const useServices = () => {
  const history = useHistory();
  const { adjustLayout } = useContext(ProjectContext);
  const base = "https://bom-demonstration-api.herokuapp.com";
  const [loading, setLoading] = useState(false);

  const getProject = async (id: string) => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${base}/projects/${id}`);
      if (data) {
        adjustLayout({ els: [...data.nodes, ...data.edges] });
        if (history.location.pathname !== "/diagram") history.push("/diagram");
        setLoading(false);
        return 200;
      }
      setLoading(false);
      return 404;
    } catch (err: any) {
      setLoading(false);
      return err?.response?.status || 500;
    }
  };

  const createProject = async (project: Partial<ProjectType>) => {
    setLoading(true);
    try {
      const res = await axios.post(`${base}/projects`, project);
      setLoading(false);
      return res.data;
    } catch (error: any) {
      setLoading(false);
      return error.response.status;
    }
  };

  const updateProject = async ({ id, ...project }: ProjectType) => {
    setLoading(true);
    try {
      const res = await axios.put(`${base}/projects/${id}`, project);
      setLoading(false);
      return res.data;
    } catch (error: any) {
      setLoading(false);
      return error;
    }
  };

  return { loading, setLoading, getProject, createProject, updateProject };
};
