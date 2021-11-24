import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ButtonComponent } from '../components';
import { MainContext } from '../context';

const HomeScreen = (): JSX.Element => {
  const { t } = useTranslation();
  const history = useHistory();
  const { setShowImportModal } = useContext(MainContext);

  return (
    <div className="home">
      <h1 className="home__title">{t('welcomeTitle')}</h1>
      <div className="home__buttons">
        <ButtonComponent outlined translationKey="import" onClick={() => setShowImportModal(true)} style={{ marginRight: 32 }} />
        <ButtonComponent translationKey="start" onClick={() => history.push('/diagram')} />
      </div>
    </div>
  );
};

export default HomeScreen;
