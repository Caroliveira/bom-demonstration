import React from "react";
import { useTranslation } from "react-i18next";
import ConversionItemComponent from "./ConversionItemComponent";

const ConversionListComponent = (): JSX.Element => {
  const { t } = useTranslation();
  return (
    <div className="cl">
      <p className="cl__header">{t("conversions")}</p>
      <div className="cl__content">
        {/* <ConversionItemComponent />
        <ConversionItemComponent />
        <ConversionItemComponent />
        <ConversionItemComponent />
        <ConversionItemComponent /> */}
      </div>
    </div>
  );
};

export default ConversionListComponent;
