import React, { useState, useContext } from "react";
import { useTranslation } from "react-i18next";
import { SelectInputComponent } from ".";
import { NodeContext } from "../context";

const LayersCalculationComponent = (): JSX.Element => {
  const { t } = useTranslation();
  const { layer } = useContext(NodeContext);
  const [currentLayer, setCurrentLayer] = useState("");

  // const renderCalculation = () => {
  //   const calculatedNodes = getCalculatedLayer(parseInt(currentLayer, 10));
  //   if (!calculatedNodes.length) return <p>{t("noLayerSelected")}</p>;
  //   return calculatedNodes.map((node) => (
  //     <p key={node.id}>
  //       {node.data.label}: {node.amount}
  //     </p>
  //   ));
  // };

  return (
    <div className="layers">
      <SelectInputComponent
        translationKey="layer"
        value={layer}
        onChange={(evt) => setCurrentLayer(evt.target.value)}
        style={{ width: 220 }}
      >
        <option value="">{t("choose")}</option>
        {Array(layer)
          .fill(0)
          .map((_, index) => (
            <option value={index} key={`${index + 1}`}>
              {t("layer")} {index + 1}
            </option>
          ))}
      </SelectInputComponent>
      <div style={{ flex: 1 }} />
      {/* <div className="layers__result">{renderCalculation()}</div> */}
    </div>
  );
};

export default LayersCalculationComponent;
