import React, { useState, useContext, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { SelectInputComponent } from "../components";
import { ProjectContext } from "../context";
import { useAmountByLayer } from "../hooks";

const LayersCalculationComponent = (): JSX.Element | null => {
  const { t } = useTranslation();
  const { nodeId, nodes } = useContext(ProjectContext);
  const { calculateNodesLayers } = useAmountByLayer();
  const [currentLayer, setCurrentLayer] = useState("");

  if (!nodeId) return null;

  const renderCalculation = useMemo(() => {
    const layerToCalculate = parseInt(currentLayer, 10);
    if (Number.isNaN(layerToCalculate)) {
      return <p style={{ textAlign: "end" }}>{t("noLayerSelected")}</p>;
    }
    const calculatedNodes = calculateNodesLayers(layerToCalculate);
    return calculatedNodes.map((n) => (
      <p key={n.id}>
        {n.label}: {n.amount}
      </p>
    ));
  }, [nodeId, currentLayer]);

  return (
    <div className="layers">
      <SelectInputComponent
        translationKey="layer"
        value={currentLayer}
        onChange={(evt) => setCurrentLayer(evt.target.value)}
        style={{ width: 220 }}
      >
        <option value="">{t("choose")}</option>
        {Array(nodes[nodeId].layer)
          .fill(0)
          .map((_, index) => (
            <option value={index} key={`${index + 1}`}>
              {t("layer")} {index + 1}
            </option>
          ))}
      </SelectInputComponent>
      <div style={{ flex: 1 }} />
      <div className="layers__result">{renderCalculation}</div>
    </div>
  );
};

export default LayersCalculationComponent;
