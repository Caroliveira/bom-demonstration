import React, { useContext } from "react";
import { FiSave, FiUpload } from "react-icons/fi";
import { useHistory } from "react-router-dom";
import { v4 as uuid } from "uuid";

import { IconButtonComponent, SwitchLanguageComponent } from ".";
import { ProjectContext } from "../context";
import { useServices } from "../hooks";

const HeaderComponent = (): JSX.Element => {
  const history = useHistory();
  const { createProject } = useServices();
  const { showFullHeader, setShowImportModal, setShowExportModal } =
    useContext(ProjectContext);

  const handleClick = async (evt: React.MouseEvent) => {
    evt.preventDefault();
    if (history.location.pathname === "/") {
      const id = uuid();
      localStorage.setItem("bom_demonstration_id", id);
      await createProject({ id });
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
      {showFullHeader && renderFullHeader()}
      <SwitchLanguageComponent />
    </header>
  );
};

export default HeaderComponent;
