import { useTranslation } from 'react-i18next';
import { FiArrowLeft } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import { IconButtonComponent } from '../components';

const SimulatorScreen = (): JSX.Element => {
  const { t } = useTranslation();
  const history = useHistory();

  return (
    <div className="simulator">
      <div className="simulator__header">
        <IconButtonComponent Icon={FiArrowLeft} translationKey={t('back')} onClick={() => history.push('/diagram')} />
        <h1 className="simulator__title">{t('simulator')}</h1>
      </div>
    </div>
  );
};

export default SimulatorScreen;
