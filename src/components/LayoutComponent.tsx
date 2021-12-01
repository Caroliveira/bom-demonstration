import React from "react";
import {
  EdgeModalComponent,
  ExportModalComponent,
  FooterComponent,
  HeaderComponent,
  ImportModalComponent,
  NodeModalComponent,
} from ".";

type LayoutProps = {
  children: React.ReactChild;
};

const LayoutComponent = ({ children }: LayoutProps): JSX.Element => {
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
