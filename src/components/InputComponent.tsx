import { useTranslation } from 'react-i18next';
import { FiAlertTriangle } from 'react-icons/fi';

type InputProps = {
  error?: string;
  translationKey: string;
  divStyle?: React.CSSProperties;
} & React.InputHTMLAttributes<HTMLInputElement>;

const InputComponent = ({
  error, translationKey, divStyle, className, ...props
}: InputProps): JSX.Element => {
  const { t } = useTranslation();

  return (
    <div className="input" style={divStyle}>
      <label htmlFor={translationKey} className="input__label">{t(translationKey)}</label>
      <input aria-labelledby={translationKey} className={`input__box ${className}`} {...props} />
      {!!error && (
      <span className="input__error">
        <FiAlertTriangle style={{ marginRight: 8 }} />
        {t(error)}
      </span>
      )}
    </div>
  );
};

export default InputComponent;
