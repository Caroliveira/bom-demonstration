import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import { fileHandler } from "../utils";
import { MainContext } from "../context";
import { getEdges } from "../services";

export const useServices = () => {
  const history = useHistory();
  const { adjustLayout } = useContext(MainContext);

  const getProject = async (id: string) => {
    try {
      const { edges } = await getEdges(id);
      if (edges) {
        localStorage.setItem("bom_demonstration_id", id);
        const model = fileHandler(JSON.stringify(edges), "application/json");
        if (model) adjustLayout({ els: [...model.nodes, ...model.edges] });
        if (history.location.pathname !== "/diagram") history.push("/diagram");
        return 200;
      }
      return 404;
    } catch (err: any) {
      return err?.statusCode || 500;
    }
  };

  return { getProject };
};
