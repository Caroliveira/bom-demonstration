import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FiClock, FiMinus, FiPlus } from 'react-icons/fi';
import { IconButtonComponent } from '.';

const SimulatorItemComponent = (): JSX.Element => {
  const { t } = useTranslation();
  const [showInfo, setShowInfo] = useState(false);

  return (
    <li className="simulator-item">
      <div className="simulator-item__button" onClick={() => setShowInfo(!showInfo)} onKeyPress={() => null} role="button" tabIndex={0}>
        <span>test</span> <span>0</span>
      </div>
      {showInfo && (
      <div className="simulator-item__options">
        <IconButtonComponent Icon={FiMinus} translationKey={t('subtract')} className="simulator-item__button--icon" />
        <IconButtonComponent Icon={FiPlus} translationKey={t('add')} className="simulator-item__button--icon" />
        <IconButtonComponent Icon={FiClock} translationKey={t('timer')} className="simulator-item__button--icon" />
        <span>10</span>
      </div>
      )}
    </li>
  );
};

export default SimulatorItemComponent;
