import React from 'react';
import { useTranslation } from 'react-i18next';
import '../assets/scss/App.scss';

const App = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <div className="App">
      <header className="App-header">
        <p>{t('welcomeTitle')}</p>
      </header>
    </div>
  );
};

export default App;
