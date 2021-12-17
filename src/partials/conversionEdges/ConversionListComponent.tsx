import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ConversionEdge, ProjectContext } from "../../context";
import ConversionItemComponent from "./ConversionItemComponent";

const ConversionListComponent = (): JSX.Element => {
  const { t } = useTranslation();
  const { conversionEdges, nodes, setNodes } = useContext(ProjectContext);
  const [ces, setCes] = useState<({ id: string } & ConversionEdge)[]>([]);

  useEffect(() => {
    const auxCes = Object.entries(conversionEdges)
      .map(([id, ce]) => ({ id, ...ce }))
      .sort((a, b) => +b.available - +a.available);
    setCes(auxCes);
  }, [conversionEdges]);

  const handleClick = (ceId: string) => {
    const { sources, targets, available } = conversionEdges[ceId];
    if (available) {
      const auxNodes = { ...nodes };
      Object.entries(sources).forEach(([nodeId, amount]) => {
        auxNodes[nodeId].amount -= amount;
      });
      Object.entries(targets).forEach(([nodeId, amount]) => {
        auxNodes[nodeId].amount += amount;
      });
      setNodes(auxNodes);
    }
  };

  return (
    <div className="cl">
      <p className="cl__header">{t("conversions")}</p>
      <div className="cl__content">
        {ces.map(({ id }) => (
          <ConversionItemComponent
            key={id}
            context="list"
            conversionEdgeId={id}
            onClick={() => handleClick(id)}
          />
        ))}
      </div>
    </div>
  );
};

export default ConversionListComponent;
