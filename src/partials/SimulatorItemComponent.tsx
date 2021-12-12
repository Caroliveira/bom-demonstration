import React, { useState, useContext, useMemo } from "react";
import { FiClock, FiMinus, FiPlus } from "react-icons/fi";

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
    Object.entries(edges).forEach(([edgeId, { label }]) => {
      const [source, target] = edgeId.split("-");
      const { amount } = nodes[source];
      const intLabel = parseInt(label as string, 10);
      if (target === nodeId && amount < intLabel) isAvailable = false;
    });
    return isAvailable;
  }, [nodeId]);

  const handleClick = () => setShowInfo(!showInfo);

  const handleNodeAmountChange = (type: "add" | "subtract") => {
    const auxNodes = { ...nodes };
    if (type === "add") auxNodes[nodeId].amount += 1;
    else auxNodes[nodeId].amount -= 1;
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
      <IconButtonComponent
        disabled={allowForcedOperations ? false : !available}
        Icon={FiPlus}
        translationKey="add"
        className="simulator-item__button--icon"
        onClick={() => handleNodeAmountChange("add")}
      />
      <IconButtonComponent
        Icon={FiClock}
        translationKey="timer"
        className="simulator-item__button--icon"
      />
      <span>{node.timer}</span>
    </div>
  );

  return (
    <li
      className={`simulator-item ${!available && "simulator-item--disabled"}`}
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
