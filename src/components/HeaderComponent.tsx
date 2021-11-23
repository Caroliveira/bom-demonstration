import { SwitchLanguageComponent } from '.';

const HeaderComponent = (): JSX.Element => {
  return (
    <header className="header">
      <div style={{ flex: 1 }}>
        <a href="/" className="header__title">
          BOM - Bill Of Materials
        </a>
      </div>
      <SwitchLanguageComponent />
    </header>
  );
};

export default HeaderComponent;
