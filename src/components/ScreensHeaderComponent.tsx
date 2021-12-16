import React from "react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FiArrowLeft } from "react-icons/fi";

import { IconButtonComponent } from "../components";

type ScreensHeaderProps = {
  title: string;
  children?: React.ReactNode;
  path?: string;
};

const ScreensHeaderComponent = ({
  title,
  children,
  path,
}: ScreensHeaderProps): JSX.Element => {
  const history = useHistory();
  const { t } = useTranslation();

  return (
    <div className="screen-header">
      <div className="screen-header--left">
        <IconButtonComponent
          Icon={FiArrowLeft}
          translationKey="back"
          onClick={() => history.push(`/${path || "diagram"}`)}
        />
        <h1 className="screen-header__title">{t(title)}</h1>
      </div>
      {children}
    </div>
  );
};

export default ScreensHeaderComponent;
