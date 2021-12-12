import React from "react";
import { useTranslation } from "react-i18next";

import { ReactComponent as Signature } from "../assets/images/signature.svg";

const FooterComponent = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <span className="footer__text">{t("madeBy")}</span>
      <Signature height={40} width={190} />
    </footer>
  );
};

export default FooterComponent;
