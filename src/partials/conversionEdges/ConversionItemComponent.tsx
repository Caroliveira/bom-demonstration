import React, { useContext, useEffect, useState } from "react";
import { FaEdit, FaPlay } from "react-icons/fa";
import { IconButtonComponent } from "../../components";
import { ConversionEdge, ProjectContext } from "../../context";
import { colors } from "../../utils";

type ConversionItemPartial =
  | {
      context: "modal";
      onClick?: never;
    }
  | {
      context?: "page" | "list";
      onClick?: () => void;
    };

type ConversionItemProps = {
  conversionEdge: ConversionEdge;
  renderIcon?: (type: "sources" | "targets", id: string) => void;
} & ConversionItemPartial;

const ConversionItemComponent = ({
  context = "list",
  conversionEdge,
  renderIcon,
  onClick,
}: ConversionItemProps): JSX.Element | null => {
  const { nodes } = useContext(ProjectContext);
  const [ce, setCe] = useState<ConversionEdge>();
  const [showDiff, setShowDiff] = useState(false);
  const showTitle = conversionEdge.label && context !== "modal";

  useEffect(() => setCe(conversionEdge), [conversionEdge]);

  if (!ce) return null;

  const handleClick = () => {
    if (onClick && context === "list") onClick();
    else setShowDiff(!showDiff);
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
    <div className="ce-item__container">
      <div
        className="ce-item"
        onClick={handleClick}
        onKeyPress={handleClick}
        role="button"
        tabIndex={0}
      >
        {showTitle && <p className="ce-item__title">{conversionEdge.label}</p>}
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
