import {
  EdgeModalComponent,
  FooterComponent,
  HeaderComponent,
  ImportModalComponent,
  NodeModalComponent,
} from '.';

type LayoutProps = {
  children: React.ReactChild;
}

const LayoutComponent = ({ children }: LayoutProps): JSX.Element => {
  return (
    <>
      <HeaderComponent />
      <div style={{ flex: 1 }}>{children}</div>
      <ImportModalComponent />
      <NodeModalComponent />
      <EdgeModalComponent />
      <FooterComponent />
    </>
  );
};

export default LayoutComponent;
