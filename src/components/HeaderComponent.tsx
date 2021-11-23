import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { SwitchLanguageComponent } from '.';

const HeaderComponent = (): JSX.Element => {
  const { t } = useTranslation();
  const { location } = useHistory();

  return (
    <header className="header">
      <span className="header__title">BOM - Bill Of Materials</span>
      {location.pathname !== '/' && (
      <nav>
        <a href="/diagram">{t('diagram')}</a> |
        <a href="/simulator">{t('simulator')}</a>
      </nav>
      )}
      <SwitchLanguageComponent />
    </header>
  );
};

export default HeaderComponent;
