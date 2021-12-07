import React, { useEffect, useContext } from "react";

import {
  ExportModalComponent,
  FooterComponent,
  HeaderComponent,
  ImportModalComponent,
  NodeModalComponent,
} from ".";
import { useServices } from "../hooks";
import { ProjectContext } from "../context";

type LayoutProps = {
  children: React.ReactChild;
};

const LayoutComponent = ({ children }: LayoutProps): JSX.Element => {
  const { elements, setLoadingGet } = useContext(ProjectContext);
  const { getProject } = useServices(setLoadingGet);

  useEffect(() => {
    const loadProject = async () => {
      const id = localStorage.getItem("bom_demonstration_id");
      if (id) await getProject(id);
    };

    if (!elements.length) loadProject();
  }, []);

  return (
    <>
      <HeaderComponent />
      <div className="layout">
        <main className="layout__main">{children}</main>
      </div>
      <ImportModalComponent />
      <ExportModalComponent />
      <NodeModalComponent />
      <FooterComponent />
    </>
  );
};

export default LayoutComponent;
