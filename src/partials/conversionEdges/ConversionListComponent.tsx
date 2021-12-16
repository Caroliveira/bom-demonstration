import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { ProjectContext } from "../../context";
import ConversionItemComponent from "./ConversionItemComponent";

const ConversionListComponent = (): JSX.Element => {
  const { t } = useTranslation();
  const { conversionEdges } = useContext(ProjectContext);
  return (
    <div className="cl">
      <p className="cl__header">{t("conversions")}</p>
      <div className="cl__content">
        {Object.entries(conversionEdges).map(([id, ce]) => (
          <ConversionItemComponent
            key={id}
            context="list"
            conversionEdge={ce}
            // onClick={() => null}
          />
        ))}
      </div>
    </div>
  );
};

export default ConversionListComponent;
