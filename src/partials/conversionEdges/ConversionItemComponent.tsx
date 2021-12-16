import React, { useContext, useState } from "react";
import { FaPlay } from "react-icons/fa";
import { FiDelete } from "react-icons/fi";
import { IconButtonComponent } from "../../components";
import { ConversionEdge, ProjectContext } from "../../context";
import { colors } from "../../utils";

type ConversionItemPartial =
  | { context?: "list"; updateConversionEdge?: never; onClick?: never }
  | {
      context: "modal";
      updateConversionEdge: (ce: ConversionEdge) => void;
      onClick?: never;
    }
  | {
      context: "page";
      updateConversionEdge?: never;
      onClick?: () => void;
    };

type ConversionItemProps = {
  conversionEdge: ConversionEdge;
} & ConversionItemPartial;

const ConversionItemComponent = ({
  context = "list",
  conversionEdge,
  updateConversionEdge,
  onClick,
}: ConversionItemProps): JSX.Element => {
  const { nodes } = useContext(ProjectContext);
  const [showDiff, setShowDiff] = useState(false);
  const showTitle = conversionEdge.label && context === "list";

  const handleClick = () => {
    if (onClick) onClick();
    else setShowDiff(true);
  };

  const deleteDep = (type: "sources" | "targets", id: string) => {
    const ce = { ...conversionEdge };
    delete ce[type][id];
    updateConversionEdge?.(ce);
  };

  const renderDepList = (type: "sources" | "targets") => {
    const depArr = Object.entries(conversionEdge[type]);
    if (!depArr.length) return <span>-</span>;
    return (
      <div>
        {depArr.map(([id, amount]) => (
          <span key={id} className="ce-item__text">
            {amount} - {nodes[id].label}
            {context === "modal" && (
              <IconButtonComponent
                Icon={FiDelete}
                translationKey="deleteItem"
                onClick={() => deleteDep(type, id)}
                style={{ background: "none", border: "none", height: 16 }}
                iconProps={{
                  style: { color: colors.error, width: 16, height: 16 },
                }}
              />
            )}
          </span>
        ))}
      </div>
    );
  };

  return (
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
  );
};
export default ConversionItemComponent;
