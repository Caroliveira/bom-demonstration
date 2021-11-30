import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { FiShield, FiShieldOff } from "react-icons/fi";

import {
  IconButtonComponent,
  ScreensHeaderComponent,
  SimulatorItemComponent,
} from "../components";
import { SimulatorContext, SimulatorContextProvider } from "../context";

const SimulatorScreen = (): JSX.Element => {
  const { t } = useTranslation();
  const { layers, allowForcedOperations, setAllowForcedOperations } =
    useContext(SimulatorContext);

  return (
    <>
      <ScreensHeaderComponent title="simulator">
        <IconButtonComponent
          Icon={allowForcedOperations ? FiShieldOff : FiShield}
          translationKey={t("allowForcedOperations", {
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

const ConnectedSimulatorScreen = (): JSX.Element => {
  return (
    <SimulatorContextProvider>
      <SimulatorScreen />
    </SimulatorContextProvider>
  );
};

export default ConnectedSimulatorScreen;
