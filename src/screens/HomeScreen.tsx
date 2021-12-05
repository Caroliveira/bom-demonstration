import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { v4 as uuid } from "uuid";

import { ButtonComponent } from "../components";
import { ProjectContext } from "../context";
import { useServices } from "../hooks";

const HomeScreen = (): JSX.Element => {
  const { t } = useTranslation();
  const history = useHistory();
  const { setShowImportModal, setLoadingGet } = useContext(ProjectContext);
  const { createProject, getProject } = useServices(setLoadingGet);

  useEffect(() => {
    const loadProject = async (identifier: string) => {
      await getProject(identifier);
    };
    const id = localStorage.getItem("bom_demonstration_id");
    if (id) loadProject(id);
  }, []);

  const handleStartClick = async () => {
    if (history.location.pathname === "/") {
      const id = uuid();
      localStorage.setItem("bom_demonstration_id", id);
      await createProject({ id });
    }
    history.push("/diagram");
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
