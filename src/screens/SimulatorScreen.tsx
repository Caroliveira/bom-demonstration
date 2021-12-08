import React, { useContext, useCallback } from "react";
import { isEdge } from "react-flow-renderer";
import { useTranslation } from "react-i18next";
import { FiShield, FiShieldOff } from "react-icons/fi";

import {
  IconButtonComponent,
  ScreensHeaderComponent,
  SimulatorItemComponent,
} from "../components";
import {
  CustomNode,
  ProjectContext,
  SimulationContext,
  SimulationContextProvider,
} from "../context";
import { getNodesByLayer } from "../utils";

const SimulatorScreen = (): JSX.Element => {
  const { t } = useTranslation();
  const { elements } = useContext(ProjectContext);
  const { maxLayer, allowForcedOperations, setAllowForcedOperations } =
    useContext(SimulationContext);

  const renderList = (index: number) => {
    const nodes = elements.filter((el) => !isEdge(el)) as CustomNode[];
    const layerNodes = getNodesByLayer(nodes, index);
    return (
      <ul key={`layer${index + 1}`} className="simulator__list">
        {layerNodes?.map((node) => {
          return <SimulatorItemComponent node={node} key={node.id} />;
        })}
      </ul>
    );
  };

  const renderContent = () => {
    if (maxLayer === undefined) {
      return <p className="simulator__empty">{t("noData")}</p>;
    }
    const emptyArr = Array(maxLayer + 1).fill(0);
    return emptyArr.map((_, index) => renderList(index));
  };

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
      <div className="simulator__content">{renderContent()}</div>
    </>
  );
};

const ConnectedSimulatorScreen = () => (
  <SimulationContextProvider>
    <SimulatorScreen />
  </SimulationContextProvider>
);

export default ConnectedSimulatorScreen;
