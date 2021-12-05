import React from "react";
import { useTranslation } from "react-i18next";
import { FiShield, FiShieldOff } from "react-icons/fi";

import {
  IconButtonComponent,
  ScreensHeaderComponent,
  SimulatorItemComponent,
} from "../components";
import { useSimulation } from "../hooks";

const SimulatorScreen = (): JSX.Element => {
  const { t } = useTranslation();
  const { layers, allowForcedOperations, setAllowForcedOperations } =
    useSimulation();

  return (
    <>
      <ScreensHeaderComponent title="simulator">
        <IconButtonComponent
          Icon={allowForcedOperations ? FiShieldOff : FiShield}
          label={t("allowForcedOperations", {
            state: allowForcedOperations ? t("on") : t("off"),
          })}
          onClick={() => setAllowForcedOperations(!allowForcedOperations)}
        />
      </ScreensHeaderComponent>
      <div className="simulator__content">
        {!layers[0] && <p className="simulator__empty">{t("noData")}</p>}
        {layers?.map((layer, index) => (
          <ul key={`layer${index + 1}`} className="simulator__list">
            {layer?.map((node) =>
              node ? <SimulatorItemComponent node={node} key={node.id} /> : null
            )}
          </ul>
        ))}
      </div>
    </>
  );
};

export default SimulatorScreen;
