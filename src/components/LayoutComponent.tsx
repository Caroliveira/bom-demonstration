import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { v4 as uuid } from "uuid";

import {
  EdgeModalComponent,
  ExportModalComponent,
  FooterComponent,
  HeaderComponent,
  ImportModalComponent,
  NodeModalComponent,
} from ".";
import { useServices } from "../hooks";
import { MainContext } from "../context";

type LayoutProps = {
  children: React.ReactChild;
};

const LayoutComponent = ({ children }: LayoutProps): JSX.Element => {
  const history = useHistory();
  const { getProject } = useServices();
  const { elements } = useContext(MainContext);

  useEffect(() => {
    const verifyId = async () => {
      const id = localStorage.getItem("bom_demonstration_id");
      if (!id) localStorage.setItem("bom_demonstration_id", uuid());
      else if (!elements.length) await getProject(id);
    };

    if (history.location.pathname !== "/") verifyId();
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
      <EdgeModalComponent />
      <FooterComponent />
    </>
  );
};

export default LayoutComponent;
