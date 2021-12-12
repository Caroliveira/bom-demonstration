import React from "react";
import { useTranslation } from "react-i18next";

const SwitchLanguageComponent = (): JSX.Element => {
  const { t, i18n } = useTranslation();
  const newLanguage = i18n.language === "en" ? "pt" : "en";

  const handleClick = (evt: React.MouseEvent) => {
    evt.preventDefault();
    i18n.changeLanguage(newLanguage);
  };

  return (
    <button
      type="button"
      title={t(i18n.language)}
      className="icon-button icon-button__text"
      onClick={handleClick}
    >
      {i18n.language}
    </button>
  );
};

export default SwitchLanguageComponent;
