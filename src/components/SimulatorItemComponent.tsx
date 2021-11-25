import { useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { FiClock, FiMinus, FiPlus } from 'react-icons/fi';
import { IconButtonComponent } from '.';
import { CustomNodeType, SimulatorContext } from '../context';

type SimulatorItemProps = {
  node: CustomNodeType;
};

const SimulatorItemComponent = ({ node }:
  SimulatorItemProps): JSX.Element | null => {
  const { t } = useTranslation();
  const [showInfo, setShowInfo] = useState(false);
  const { layers, setLayers, allowForcedOperations } = useContext(SimulatorContext);
  const isDisabled = !node.available && !allowForcedOperations;

  const handleClick = () => setShowInfo(!showInfo);

  const changeNodeAmount = (type: 'add' | 'subtract') => {
    if (!node) return;
    const item = node;
    const itemList = [...layers];

    if (type === 'add') item.amount += 1;
    else item.amount -= 1;

    setLayers(itemList);
  };

  if (!node) return null;

  return (
    <li className={`simulator-item ${!node.available && 'simulator-item--disabled'}`}>
      <div className="simulator-item__button" onClick={handleClick} onKeyPress={handleClick} role="button" tabIndex={0}>
        <span>{node.id}</span> <span>{node.amount}</span>
      </div>
      {showInfo && (
      <div className="simulator-item__options">
        <IconButtonComponent disabled={isDisabled} Icon={FiMinus} translationKey={t('subtract')} className="simulator-item__button--icon" onClick={() => changeNodeAmount('subtract')} />
        <IconButtonComponent disabled={isDisabled} Icon={FiPlus} translationKey={t('add')} className="simulator-item__button--icon" onClick={() => changeNodeAmount('add')} />
        <IconButtonComponent Icon={FiClock} translationKey={t('timer')} className="simulator-item__button--icon" />
        <span>{node.timer}</span>
      </div>
      )}
    </li>
  );
};

export default SimulatorItemComponent;
