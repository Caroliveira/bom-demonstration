import React from "react";
import { useTranslation } from "react-i18next";

const NotFoundScreen = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <div className="home">
      <h1 className="home__title">404 - {t("pageNotFound")}</h1>
    </div>
  );
};

export default NotFoundScreen;
