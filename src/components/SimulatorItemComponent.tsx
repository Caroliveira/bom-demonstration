import React, { useState, useContext } from "react";
import { FiClock, FiMinus, FiPlus } from "react-icons/fi";

import { IconButtonComponent } from ".";
import { CustomNode, SimulationContext } from "../context";

type SimulatorItemProps = {
  node: CustomNode;
};

const SimulatorItemComponent = ({
  node,
}: SimulatorItemProps): JSX.Element | null => {
  const [showInfo, setShowInfo] = useState(false);
  const { allowForcedOperations, changeNodeAmount, isAvailable } =
    useContext(SimulationContext);

  const available = isAvailable(node);
  const isSubtractDisabled = !allowForcedOperations && node.amount <= 0;

  const handleClick = () => setShowInfo(!showInfo);

  const renderItemInfo = () => (
    <div className="simulator-item__options">
      <IconButtonComponent
        disabled={isSubtractDisabled}
        Icon={FiMinus}
        translationKey="subtract"
        className="simulator-item__button--icon"
        onClick={() => changeNodeAmount(node, "subtract")}
      />
      <IconButtonComponent
        disabled={allowForcedOperations ? false : !available}
        Icon={FiPlus}
        translationKey="add"
        className="simulator-item__button--icon"
        onClick={() => changeNodeAmount(node, "add")}
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
        <span>{node.data.label}</span> <span>{node.amount}</span>
      </div>
      {showInfo && renderItemInfo()}
    </li>
  );
};

export default SimulatorItemComponent;
