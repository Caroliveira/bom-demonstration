import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { v4 as uuid } from "uuid";

import { ButtonComponent } from "../components";
import { MainContext } from "../context";

const HomeScreen = (): JSX.Element => {
  const { t } = useTranslation();
  const history = useHistory();
  const { setShowImportModal, setShowFullHeader } = useContext(MainContext);

  const handleStartClick = () => {
    if (history.location.pathname === "/") {
      localStorage.setItem("bom_demonstration_id", uuid());
    }
    history.push("/diagram");
    setShowFullHeader(true);
  };

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
        <ButtonComponent translationKey="start" onClick={handleStartClick} />
      </div>
    </div>
  );
};

export default HomeScreen;
