import { useTranslation } from 'react-i18next';

const FooterComponent = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <div className="footer">
      <span className="footer__text">
        {t('madeBy')} Caroliveira
      </span>
    </div>
  );
};

export default FooterComponent;
