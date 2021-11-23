import { ReactChild } from 'react';
import { FooterComponent, HeaderComponent, ImportModalComponent } from '.';

type LayoutProps = {
  children: ReactChild;
}

const LayoutComponent = ({ children }:LayoutProps): JSX.Element => {
  return (
    <>
      <HeaderComponent />
      <div style={{ flex: 1 }}>{children}</div>
      <ImportModalComponent />
      <FooterComponent />
    </>
  );
};

export default LayoutComponent;
