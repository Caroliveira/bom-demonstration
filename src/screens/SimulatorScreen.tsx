import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  FiArrowLeft, FiRotateCcw, FiShield, FiShieldOff,
} from 'react-icons/fi';
import { IconButtonComponent, SimulatorItemComponent } from '../components';
import { SimulatorContext, SimulatorContextProvider } from '../context';

const SimulatorScreen = (): JSX.Element => {
  const { t } = useTranslation();
  const history = useHistory();
  const {
    layers, setLayers, allowForcedOperations, setAllowForcedOperations,
  } = useContext(SimulatorContext);

  return (
    <div className="simulator">
      <div className="simulator__header">
        <div className="simulator__header--left">
          <IconButtonComponent Icon={FiArrowLeft} translationKey="back" onClick={() => history.push('/diagram')} />
          <h1 className="simulator__title">{t('simulator')}</h1>
        </div>
        <IconButtonComponent
          Icon={allowForcedOperations ? FiShieldOff : FiShield}
          translationKey={t('allowForcedOperations', { state: allowForcedOperations ? t('on') : t('off') })}
          onClick={() => setAllowForcedOperations(!allowForcedOperations)}
        />
      </div>
      <div className="simulator__content">
        {!layers[0] && <p className="simulator__empty">{t('noData')}</p>}
        {layers?.map((layer, index) => (
          <ul key={`layer${index + 1}`} className="simulator__list">
            {layer?.map((node) => (
              node ? <SimulatorItemComponent node={node} key={node.id} /> : null
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
};

const ConnectedSimulatorScreen = (): JSX.Element => {
  return (
    <SimulatorContextProvider>
      <SimulatorScreen />
    </SimulatorContextProvider>
  );
};

export default ConnectedSimulatorScreen;
