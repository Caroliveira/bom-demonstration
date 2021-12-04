import React, { useContext } from "react";
import { FiSave, FiUpload } from "react-icons/fi";
import { useHistory } from "react-router-dom";
import { v4 as uuid } from "uuid";
import {
  ButtonComponent,
  IconButtonComponent,
  SwitchLanguageComponent,
} from ".";
import { MainContext } from "../context";

const HeaderComponent = (): JSX.Element => {
  const history = useHistory();
  const { setShowImportModal, setShowExportModal } = useContext(MainContext);

  const handleClick = (evt: React.MouseEvent) => {
    evt.preventDefault();
    if (history.location.pathname === "/") {
      localStorage.setItem("bom_demonstration_id", uuid());
    }
    history.push("/diagram");
  };

  const renderFullHeader = () => (
    <>
      <IconButtonComponent
        Icon={FiUpload}
        translationKey="loadProject"
        onClick={() => setShowImportModal(true)}
        className="mr-2"
      />
      <IconButtonComponent
        Icon={FiSave}
        translationKey="save"
        onClick={() => setShowExportModal(true)}
        className="mr-2"
      />
    </>
  );

  return (
    <header className="header">
      <div style={{ flex: 1 }}>
        <a href="/diagram" className="header__title" onClick={handleClick}>
          BOM - Bill Of Materials
        </a>
      </div>
      {localStorage.getItem("bom_demonstration_id") && renderFullHeader()}
      <SwitchLanguageComponent />
    </header>
  );
};

export default HeaderComponent;
