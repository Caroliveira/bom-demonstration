import React, { useContext, useEffect, useState } from "react";
import { FaEdit, FaPlay } from "react-icons/fa";
import { IconButtonComponent } from "../../components";
import { ConversionEdge, ProjectContext } from "../../context";
import { colors } from "../../utils";

type ConversionItemPartial =
  | { context: "modal"; onClick?: never }
  | { context?: "page" | "list"; onClick?: () => void };

type ConversionItemProps = {
  conversionEdgeId: string;
  conversionEdge?: ConversionEdge;
  renderIcon?: (type: "sources" | "targets", id: string) => void;
} & ConversionItemPartial;

const ConversionItemComponent = ({
  context = "list",
  conversionEdgeId,
  conversionEdge,
  renderIcon,
  onClick,
}: ConversionItemProps): JSX.Element | null => {
  const { nodes, conversionEdges, setConversionEdges } =
    useContext(ProjectContext);
  const [ce, setCe] = useState<ConversionEdge>();
  const [showDiff, setShowDiff] = useState(false);

  useEffect(() => {
    setCe(conversionEdge || conversionEdges[conversionEdgeId]);
  }, [conversionEdge, conversionEdgeId]);

  useEffect(() => {
    if (ce && context === "list") {
      const auxCes = { ...conversionEdges };
      let available = true;
      Object.entries(ce.sources).forEach(([nodeId, value]) => {
        if (nodes[nodeId].amount < value) available = false;
      });
      ce.available = available;
      auxCes[conversionEdgeId] = ce;
      setConversionEdges(auxCes);
    }
  }, [nodes]);

  if (!ce) return null;

  const grayBackground =
    context === "list" && !ce.available && "ce-item__container--disabled";
  const showCursor = context === "page" || (context === "list" && ce.available);
  const showTitle = ce.label && context !== "modal";

  const handleClick = () => {
    if (onClick && context === "list") onClick();
    else if (context === "page") setShowDiff(!showDiff);
  };

  const renderDepList = (type: "sources" | "targets") => {
    const depArr = Object.entries(ce[type]);
    if (!depArr.length) return <span>-</span>;
    return (
      <div>
        {depArr.map(([id, amount]) => (
          <span key={id} className="ce-item__text">
            {amount} - {nodes[id].label}
            {renderIcon?.(type, id)}
          </span>
        ))}
      </div>
    );
  };

  const renderDiff = () => {
    const diffResult = { ...ce.targets };
    Object.entries(ce.sources).forEach(([id, amount]) => {
      if (diffResult[id]) diffResult[id] -= amount;
      else diffResult[id] = -amount;
    });
    return (
      <div className="ce-item__info">
        <div className="ce-item__diff">
          {Object.entries(diffResult).map(([id, amount]) => (
            <span key={id}>
              {nodes[id].label}: {amount}
            </span>
          ))}
        </div>
        {context === "page" && (
          <IconButtonComponent
            Icon={FaEdit}
            translationKey="editConversion"
            onClick={onClick}
            style={{ height: 32, width: 32, paddingTop: 4 }}
            iconProps={{ style: { width: 20, height: 20 } }}
          />
        )}
      </div>
    );
  };

  return (
    <div className={`ce-item__container ${grayBackground}`}>
      <div
        className={`ce-item ${!showCursor && "ce-item--disabled"}`}
        onClick={handleClick}
        onKeyPress={handleClick}
        role="button"
        tabIndex={0}
      >
        {showTitle && <p className="ce-item__title">{ce.label}</p>}
        <div className="ce-item__content">
          {renderDepList("sources")}
          <FaPlay color={colors.primary} className="ce-item__icon" />
          {renderDepList("targets")}
        </div>
      </div>
      {showDiff && renderDiff()}
    </div>
  );
};
export default ConversionItemComponent;
