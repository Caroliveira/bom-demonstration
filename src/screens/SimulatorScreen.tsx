import React, { useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FiShield, FiShieldOff } from "react-icons/fi";

import {
  IconButtonComponent,
  ScreensHeaderComponent,
  SimulatorItemComponent,
} from "../components";
import {
  Nodes,
  ProjectContext,
  SimulationContext,
  SimulationContextProvider,
} from "../context";
import { calculateLayers } from "../utils";

const SimulatorScreen = (): JSX.Element => {
  const { t } = useTranslation();
  const { nodes, edges, setNodes } = useContext(ProjectContext);
  const { maxLayer, allowForcedOperations, setAllowForcedOperations } =
    useContext(SimulationContext);

  useEffect(() => setNodes(calculateLayers(nodes, edges)), []);

  const getNodesByLayer = (layer: number) => {
    const nodesByLayer: Nodes = {};
    Object.entries(nodes).forEach(([id, node]) => {
      if (layer === node.layer) nodesByLayer[id] = node;
    });
    return nodesByLayer;
  };

  const renderList = (index: number) => {
    const layerNodes = getNodesByLayer(index);
    return (
      <ul key={`layer${index + 1}`} className="simulator__list">
        {Object.entries(layerNodes).map(([id, node]) => {
          return <SimulatorItemComponent nodeId={id} node={node} key={id} />;
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
