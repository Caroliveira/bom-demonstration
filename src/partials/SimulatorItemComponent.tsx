import React, { useState, useContext, useMemo } from "react";
import { FiMinus, FiPlus } from "react-icons/fi";

import { IconButtonComponent } from "../components";
import { Node, ProjectContext } from "../context";

type SimulatorItemProps = {
  nodeId: string;
  node: Node;
  allowForcedOperations: boolean;
};

const SimulatorItemComponent = ({
  nodeId,
  node,
  allowForcedOperations,
}: SimulatorItemProps): JSX.Element | null => {
  const [showInfo, setShowInfo] = useState(false);
  const { nodes, edges, setNodes } = useContext(ProjectContext);
  const isSubtractDisabled = !allowForcedOperations && node.amount <= 0;

  const available = useMemo(() => {
    let isAvailable = true;
    Object.entries(edges).forEach(([edgeId, label]) => {
      const [source, target] = edgeId.split("-");
      const { amount } = nodes[source];
      if (target === nodeId && amount < label) isAvailable = false;
    });
    return isAvailable;
  }, [nodes]);

  const handleClick = () => {
    if ((available || allowForcedOperations) && !node.blocked) {
      setShowInfo(!showInfo);
    }
  };

  const handleNodeAmountChange = (type: "add" | "subtract") => {
    const auxNodes = { ...nodes };
    if (type === "add") {
      auxNodes[nodeId].amount += 1;
      Object.entries(edges)
        .filter(([edgeId]) => {
          const [_, target] = edgeId.split("-");
          return target === nodeId;
        })
        .forEach(([edgeId, amount]) => {
          const [source] = edgeId.split("-");
          auxNodes[source].amount -= amount;
        });
    } else auxNodes[nodeId].amount -= 1;
    setNodes(auxNodes);
  };

  const handleInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const auxNodes = { ...nodes };
    const { value } = evt.target;
    if (value.match("[0-9]+")) auxNodes[nodeId].amount = parseInt(value, 10);
    setNodes(auxNodes);
  };

  const renderItemInfo = () => (
    <div className="simulator-item__options">
      <IconButtonComponent
        disabled={isSubtractDisabled}
        Icon={FiMinus}
        translationKey="subtract"
        className="simulator-item__button--icon"
        onClick={() => handleNodeAmountChange("subtract")}
      />
      <input
        value={node.amount}
        onChange={handleInputChange}
        className="simulator-item__input"
      />
      <IconButtonComponent
        disabled={allowForcedOperations ? false : !available}
        Icon={FiPlus}
        translationKey="add"
        className="simulator-item__button--icon"
        onClick={() => handleNodeAmountChange("add")}
      />
    </div>
  );

  return (
    <li
      className={`simulator-item ${
        (!available || node.blocked) && "simulator-item--disabled"
      }`}
    >
      <div
        className="simulator-item__button"
        onClick={handleClick}
        onKeyPress={handleClick}
        role="button"
        tabIndex={0}
      >
        <span>{node.label}</span> <span>{node.amount}</span>
      </div>
      {showInfo && renderItemInfo()}
    </li>
  );
};

export default SimulatorItemComponent;
