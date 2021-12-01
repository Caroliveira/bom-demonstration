import React, { useState, useContext } from "react";
import { useTranslation } from "react-i18next";
import { FiClock, FiMinus, FiPlus } from "react-icons/fi";

import { SimulatorContext, SimulatorNodeType } from "../context";
import { IconButtonComponent } from ".";

type SimulatorItemProps = {
  node: SimulatorNodeType;
};

const SimulatorItemComponent = ({
  node,
}: SimulatorItemProps): JSX.Element | null => {
  const { t } = useTranslation();
  const [showInfo, setShowInfo] = useState(false);
  const { layers, setLayers, allowForcedOperations } =
    useContext(SimulatorContext);
  const isDisabled = !node.available && !allowForcedOperations;

  const handleClick = () => setShowInfo(!showInfo);

  const changeNodeAmount = (type: "add" | "subtract") => {
    if (!node) return;

    const item = node;
    const itemList = [...layers];

    if (type === "add") item.amount += 1;
    else item.amount -= 1;
    setLayers(itemList);
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
      className={`simulator-item ${
        !node.available && "simulator-item--disabled"
      }`}
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
