import React, { useContext } from "react";
import { FaPlay } from "react-icons/fa";
import { FiDelete } from "react-icons/fi";
import { IconButtonComponent } from "../../components";
import { ConversionEdge, ProjectContext } from "../../context";
import { colors } from "../../utils";

type ConversionItemPartial =
  | { context?: "list"; updateConversionEdge?: never }
  | { context: "modal"; updateConversionEdge: (ce: ConversionEdge) => void };

type ConversionItemProps = {
  conversionEdge: ConversionEdge;
} & ConversionItemPartial;

const ConversionItemComponent = ({
  context = "list",
  conversionEdge,
  updateConversionEdge,
}: ConversionItemProps): JSX.Element => {
  const { nodes } = useContext(ProjectContext);

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
    <div className="ce-item">
      {renderDepList("sources")}
      <FaPlay color={colors.primary} className="ce-item__icon" />
      {renderDepList("targets")}
    </div>
  );
};
export default ConversionItemComponent;
