import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { ButtonComponent } from "../components";
import { ProjectContext } from "../context";

const HomeScreen = (): JSX.Element => {
  const history = useHistory();
  const { t } = useTranslation();
  const { setShowImportModal } = useContext(ProjectContext);

  return (
    <div className="home">
      <h1 className="home__title">{t("welcomeTitle")}</h1>
      <div className="home__buttons">
        <ButtonComponent
          outlined
          translationKey="loadProject"
          onClick={() => setShowImportModal(true)}
          style={{ marginRight: 32 }}
        />
        <ButtonComponent
          translationKey="start"
          onClick={() => history.push("/diagram")}
        />
      </div>
    </div>
  );
};

export default HomeScreen;
