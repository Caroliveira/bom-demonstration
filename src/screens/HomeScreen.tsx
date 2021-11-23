import { useTranslation } from 'react-i18next';
import { FooterComponent } from '../components';
import ButtonComponent from '../components/ButtonComponent';

const HomeScreen = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <div className="home">
      <div className="home__container">
        <h1 className="home__title">{t('welcomeTitle')}</h1>
        <div className="home__buttons">
          <ButtonComponent outlined translationKey="import" onClick={() => console.log('teste')} style={{ marginRight: 32 }} />
          <ButtonComponent translationKey="start" onClick={() => console.log('teste')} />
        </div>
      </div>
      <FooterComponent />
    </div>
  );
};

export default HomeScreen;
