import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ButtonComponent, FooterComponent, ImportModalComponent, SwitchLanguageComponent,
} from '../components';

const HomeScreen = (): JSX.Element => {
  const { t } = useTranslation();
  const [showImportModal, setShowImportModal] = useState(false);

  return (
    <div className="home">
      <SwitchLanguageComponent className="home__language-switch" />
      <div className="home__container">
        <h1 className="home__title">{t('welcomeTitle')}</h1>
        <div className="home__buttons">
          <ButtonComponent outlined translationKey="import" onClick={() => setShowImportModal(true)} style={{ marginRight: 32 }} />
          <ButtonComponent translationKey="start" onClick={() => setShowImportModal(true)} />
        </div>
      </div>
      <ImportModalComponent show={showImportModal} closeModal={() => setShowImportModal(false)} />
      <FooterComponent />
    </div>
  );
};

export default HomeScreen;
