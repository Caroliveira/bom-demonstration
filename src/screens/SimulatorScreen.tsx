import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FiShield, FiShieldOff } from "react-icons/fi";

import { Nodes, ProjectContext } from "../context";
import { calculateLayers } from "../utils";
import { SimulatorItemComponent } from "../partials";
import { IconButtonComponent, ScreensHeaderComponent } from "../components";

const SimulatorScreen = (): JSX.Element => {
  const { t } = useTranslation();
  const { nodes, edges, setNodes } = useContext(ProjectContext);
  const [allowForcedOperations, setAllowForcedOperations] = useState(false);

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
          return (
            <SimulatorItemComponent
              key={id}
              nodeId={id}
              node={node}
              allowForcedOperations={allowForcedOperations}
            />
          );
        })}
      </ul>
    );
  };

  const renderContent = () => {
    if (!Object.keys(nodes).length) {
      return <p className="simulator__empty">{t("noData")}</p>;
    }
    const maxLayer = Object.values(nodes).reduce((acc, vl) => {
      return acc > vl.layer ? acc : vl.layer;
    }, 0);
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
      <div className="simulator__content">
        <div className="simulator__items">{renderContent()}</div>
        {/* <ConversionListComponent /> */}
      </div>
    </>
  );
};

export default SimulatorScreen;
