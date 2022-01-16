import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FiShield, FiShieldOff } from "react-icons/fi";

import { useHistory } from "react-router-dom";
import { FaUndo } from "react-icons/fa";
import { Nodes, ProjectContext } from "../context";
import { calculateLayers } from "../utils";
import { ConversionListComponent, SimulatorItemComponent } from "../partials";
import {
  ButtonComponent,
  IconButtonComponent,
  ScreensHeaderComponent,
} from "../components";

const SimulatorScreen = (): JSX.Element => {
  const history = useHistory();
  const { t } = useTranslation();
  const { nodes, edges, setNodes, resetNodesAmount } =
    useContext(ProjectContext);
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
        {!!Object.keys(nodes).length && (
          <ButtonComponent
            outlined
            translationKey="conversions"
            className="toolbar__button"
            onClick={() => history.push("/conversions")}
          />
        )}
        <IconButtonComponent
          Icon={allowForcedOperations ? FiShieldOff : FiShield}
          label={t("allowForcedOperations", {
            state: allowForcedOperations ? t("on") : t("off"),
          })}
          onClick={() => setAllowForcedOperations(!allowForcedOperations)}
        />
        <IconButtonComponent
          Icon={FaUndo}
          style={{ padding: 10 }}
          translationKey="restart"
          onClick={resetNodesAmount}
        />
      </ScreensHeaderComponent>
      <div className="simulator__content">
        <div className="simulator__items">{renderContent()}</div>
        <ConversionListComponent />
      </div>
    </>
  );
};

export default SimulatorScreen;
