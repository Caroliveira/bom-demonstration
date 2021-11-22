import React from 'react';
import logo from './logo.svg';
import '../assets/scss/App.scss';
import { useTranslation } from 'react-i18next';

function App() {
  const { t } = useTranslation();
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{t('welcomeTitle')}</p>
      </header>
    </div>
  );
}

export default App;
