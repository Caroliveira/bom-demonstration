import React, { useEffect, useContext } from "react";

import { useServices } from "../hooks";
import { ProjectContext } from "../context";
import HeaderComponent from "./HeaderComponent";
import ImportModalComponent from "./ImportModalComponent";
import ExportModalComponent from "./ExportModalComponent";
import NodeModalComponent from "./NodeModalComponent";
import FooterComponent from "./FooterComponent";

type LayoutProps = {
  children: React.ReactChild;
};

const Layout = ({ children }: LayoutProps): JSX.Element => {
  const { nodes, setLoadingGet } = useContext(ProjectContext);
  const { getProject } = useServices(setLoadingGet);

  useEffect(() => {
    const loadProject = async () => {
      const id = localStorage.getItem("bom_demonstration_id");
      if (id) await getProject(id);
    };

    if (!Object.keys(nodes).length) loadProject();
  }, []);

  return (
    <div className="layout">
      <HeaderComponent />
      <main className="layout__main">{children}</main>
      <ImportModalComponent />
      <ExportModalComponent />
      <NodeModalComponent />
      <FooterComponent />
    </div>
  );
};

export default Layout;
