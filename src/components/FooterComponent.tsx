import { useTranslation } from 'react-i18next';

const FooterComponent = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <span className="footer__text">
        {t('madeBy')} Caroliveira
      </span>
    </footer>
  );
};

export default FooterComponent;
