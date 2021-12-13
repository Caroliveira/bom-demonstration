import React from "react";
import { t } from "i18next";
import { FaPlay } from "react-icons/fa";
import { colors } from "../utils";

const ConversionItemComponent = (): JSX.Element => {
  return (
    <div className="cl__item">
      <div className="cl__item-list">
        <span className="cl__item-text">2 - teste1</span>
        <span className="cl__item-text">3 - teste2</span>
      </div>
      <FaPlay color={colors.primary} className="cl__item-icon" />
      <div className="cl__item-list">
        <span className="cl__item-text">2 - teste1</span>
        <span className="cl__item-text">3 - teste2</span>
      </div>
    </div>
  );
};

const ConversionListComponent = (): JSX.Element => {
  return (
    <div className="cl">
      <p className="cl__header">{t("conversions")}</p>
      <div className="cl__content">
        <ConversionItemComponent />
        <ConversionItemComponent />
        <ConversionItemComponent />
        <ConversionItemComponent />
        <ConversionItemComponent />
      </div>
    </div>
  );
};

export default ConversionListComponent;
