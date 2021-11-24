import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FiClock, FiMinus, FiPlus } from 'react-icons/fi';
import { IconButtonComponent } from '.';
import { SimulatorNode } from '../context';

type SimulatorItemProps = {
  node: SimulatorNode;
};

const SimulatorItemComponent = ({ node }:
  SimulatorItemProps): JSX.Element | null => {
  const { t } = useTranslation();
  const [showInfo, setShowInfo] = useState(false);

  if (!node) return null;

  return (
    <li className="simulator-item">
      <div className="simulator-item__button" onClick={() => setShowInfo(!showInfo)} onKeyPress={() => null} role="button" tabIndex={0}>
        <span>{node.id}</span> <span>{node.amount}</span>
      </div>
      {showInfo && (
      <div className="simulator-item__options">
        <IconButtonComponent Icon={FiMinus} translationKey={t('subtract')} className="simulator-item__button--icon" onClick={() => null} />
        <IconButtonComponent Icon={FiPlus} translationKey={t('add')} className="simulator-item__button--icon" onClick={() => null} />
        <IconButtonComponent Icon={FiClock} translationKey={t('timer')} className="simulator-item__button--icon" />
        <span>{node.timer}</span>
      </div>
      )}
    </li>
  );
};

export default SimulatorItemComponent;
