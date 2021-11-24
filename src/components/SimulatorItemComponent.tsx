import { useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { FiClock, FiMinus, FiPlus } from 'react-icons/fi';
import { IconButtonComponent } from '.';
import { SimulatorContext, SimulatorNode } from '../context';

type SimulatorItemProps = {
  node: SimulatorNode;
};

const SimulatorItemComponent = ({ node }:
  SimulatorItemProps): JSX.Element | null => {
  const { t } = useTranslation();
  const [showInfo, setShowInfo] = useState(false);
  const { allLayers, availableLayers, setAvailableLayers } = useContext(SimulatorContext);

  const changeNodeAmount = (type: 'add' | 'subtract') => {
    if (!node) return;
    const item = node;
    const itemList = [...availableLayers];

    if (type === 'add') item.amount += 1;
    else item.amount -= 1;

    setAvailableLayers(itemList);
  };

  const handleClick = () => setShowInfo(!showInfo);

  if (!node) return null;

  return (
    <li className="simulator-item">
      <div className="simulator-item__button" onClick={handleClick} onKeyPress={handleClick} role="button" tabIndex={0}>
        <span>{node.id}</span> <span>{node.amount}</span>
      </div>
      {showInfo && (
      <div className="simulator-item__options">
        <IconButtonComponent Icon={FiMinus} translationKey={t('subtract')} className="simulator-item__button--icon" onClick={() => changeNodeAmount('subtract')} />
        <IconButtonComponent Icon={FiPlus} translationKey={t('add')} className="simulator-item__button--icon" onClick={() => changeNodeAmount('add')} />
        <IconButtonComponent Icon={FiClock} translationKey={t('timer')} className="simulator-item__button--icon" />
        <span>{node.timer}</span>
      </div>
      )}
    </li>
  );
};

export default SimulatorItemComponent;
