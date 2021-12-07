import React, { useState, useContext, useMemo } from "react";
import { useStoreState } from "react-flow-renderer";
import { useTranslation } from "react-i18next";
import { SelectInputComponent } from ".";
import { CustomNode, NodeContext } from "../context";
import { useAmountByLayer } from "../hooks";
// import { calculateAmountByLayer } from "../utils";

const LayersCalculationComponent = (): JSX.Element | null => {
  const { t } = useTranslation();
  const { node } = useContext(NodeContext);
  const { calculateNodesLayers } = useAmountByLayer();
  const [currentLayer, setCurrentLayer] = useState("");
  const edges = useStoreState((store) => store.edges);
  const nodes = useStoreState((store) => store.nodes) as CustomNode[];

  if (!node) return null;

  const renderCalculation = useMemo(() => {
    const layerToCalculate = parseInt(currentLayer, 10);
    if (Number.isNaN(layerToCalculate)) return <p>{t("noLayerSelected")}</p>;
    const calculatedNodes = calculateNodesLayers(layerToCalculate);
    return calculatedNodes.map((n) => (
      <p key={n.id}>
        {n.data.label}: {n.amount}
      </p>
    ));
  }, [node, currentLayer]);

  return (
    <div className="layers">
      <SelectInputComponent
        translationKey="layer"
        value={node.layer}
        onChange={(evt) => setCurrentLayer(evt.target.value)}
        style={{ width: 220 }}
      >
        <option value="">{t("choose")}</option>
        {Array(node.layer)
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
