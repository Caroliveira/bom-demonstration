import { useTranslation } from 'react-i18next';
import { FiArrowLeft } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import { IconButtonComponent, SimulatorItemComponent } from '../components';
import { useSimulation } from '../hooks';

const SimulatorScreen = (): JSX.Element => {
  const { t } = useTranslation();
  const history = useHistory();
  const layers = useSimulation();

  return (
    <div className="simulator">
      <div className="simulator__header">
        <IconButtonComponent Icon={FiArrowLeft} translationKey={t('back')} onClick={() => history.push('/diagram')} />
        <h1 className="simulator__title">{t('simulator')}</h1>
      </div>
      <div className="simulator__content">
        {layers.map((layer, index) => (
          <ul title={`${t('layer')} ${index}`} className="simulator__list">
            {layer?.map((node) => <SimulatorItemComponent node={node} />)}
          </ul>
        ))}
      </div>
    </div>
  );
};

export default SimulatorScreen;
