import React from "react";
import { useHistory } from "react-router-dom";
import { SwitchLanguageComponent } from ".";

const HeaderComponent = (): JSX.Element => {
  const history = useHistory();

  const handleClick = (
    evt: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    evt.preventDefault();
    history.push("/diagram");
  };

  return (
    <header className="header">
      <div style={{ flex: 1 }}>
        <a href="/diagram" className="header__title" onClick={handleClick}>
          BOM - Bill Of Materials
        </a>
      </div>
      <SwitchLanguageComponent />
    </header>
  );
};

export default HeaderComponent;
