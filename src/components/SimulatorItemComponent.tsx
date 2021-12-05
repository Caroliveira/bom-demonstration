import React, { useState, useMemo } from "react";
import { FiClock, FiMinus, FiPlus } from "react-icons/fi";

import { IconButtonComponent } from ".";
import { CustomNode } from "../context";
import { useSimulation } from "../hooks";

type SimulatorItemProps = {
  node: CustomNode;
};

const SimulatorItemComponent = ({
  node,
}: SimulatorItemProps): JSX.Element | null => {
  const [showInfo, setShowInfo] = useState(false);
  const { allowForcedOperations, isAvailable } = useSimulation();
  const available = useMemo(() => isAvailable(node), [node]);
  const isDisabled = !available && !allowForcedOperations;

  const handleClick = () => setShowInfo(!showInfo);

  const changeNodeAmount = (type: "add" | "subtract") => {
    if (!node) return;
    const item = node;
    if (type === "add") item.amount += 1;
    else item.amount -= 1;
  };

  const renderItemInfo = () => (
    <div className="simulator-item__options">
      <IconButtonComponent
        disabled={isDisabled}
        Icon={FiMinus}
        translationKey="subtract"
        className="simulator-item__button--icon"
        onClick={() => changeNodeAmount("subtract")}
      />
      <IconButtonComponent
        disabled={isDisabled}
        Icon={FiPlus}
        translationKey="add"
        className="simulator-item__button--icon"
        onClick={() => changeNodeAmount("add")}
      />
      <IconButtonComponent
        Icon={FiClock}
        translationKey="timer"
        className="simulator-item__button--icon"
      />
      <span>{node.timer}</span>
    </div>
  );

  if (!node) return null;

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
        <span>{node.data.label}</span> <span>{node.amount}</span>
      </div>
      {showInfo && renderItemInfo()}
    </li>
  );
};

export default SimulatorItemComponent;
