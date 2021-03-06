import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

import { ConversionEdges, Edges, Nodes, ProjectContext } from "../context";

export type ProjectType = {
  id: string;
  nodes: Nodes;
  edges: Edges;
  conversionEdges?: ConversionEdges;
};

axios.defaults.headers.common = { Accept: "application/json" };

export const useServices = (customSetLoading?: (loading: boolean) => void) => {
  const history = useHistory();
  const { setProject } = useContext(ProjectContext);
  // const base = "http://localhost:3001"; // local
  const base = "https://bom-demonstration-api.herokuapp.com";
  const [loading, setLoading] = useState(false);

  const startLoading = () => {
    if (customSetLoading) customSetLoading(true);
    else setLoading(true);
  };

  const stopLoading = () => {
    if (customSetLoading) customSetLoading(false);
    else setLoading(false);
  };

  const getProject = async (id: string) => {
    startLoading();
    if (history.location.pathname !== "/diagram") history.push("/diagram");
    try {
      const { data } = await axios.get(`${base}/projects/${id}`);
      if (data) {
        setProject(data);
        stopLoading();
        return 200;
      }
      stopLoading();
      return 404;
    } catch (err: any) {
      stopLoading();
      return err?.response?.status || 500;
    }
  };

  const createProject = async (project: Partial<ProjectType>) => {
    startLoading();
    try {
      const res = await axios.post(`${base}/projects`, project);
      stopLoading();
      return res.data;
    } catch (error: any) {
      stopLoading();
      return error?.response?.status || 500;
    }
  };

  const updateProject = async ({ id, ...project }: ProjectType) => {
    startLoading();
    try {
      const res = await axios.put(`${base}/projects/${id}`, project);
      stopLoading();
      return res.data;
    } catch (error: any) {
      stopLoading();
      return error?.response?.status || 500;
    }
  };

  return { loading, setLoading, getProject, createProject, updateProject };
};
