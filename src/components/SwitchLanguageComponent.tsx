import { useTranslation } from 'react-i18next';

const SwitchLanguageComponent = ({ className, ...props }:
  React.SelectHTMLAttributes<HTMLSelectElement>): JSX.Element => {
  const { t, i18n } = useTranslation();

  const handleChange = (evt: React.ChangeEvent<HTMLSelectElement>) => {
    evt.preventDefault();
    i18n.changeLanguage(evt.target.value);
  };

  return (
    <select aria-label={t('selectLanguage')} className={`switch-language ${className}`} onChange={handleChange} value={i18n.language} {...props}>
      <option value="en">{t('english')}</option>
      <option value="pt-BR">{t('portuguese')}</option>
    </select>
  );
};

export default SwitchLanguageComponent;
