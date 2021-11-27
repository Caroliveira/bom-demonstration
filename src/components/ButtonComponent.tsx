import { useTranslation } from 'react-i18next';

export type ButtonProps = {
  translationKey: string;
  outlined?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const ButtonComponent = ({
  translationKey, outlined = false, type = 'button', className, disabled, ...props
}: ButtonProps): JSX.Element => {
  const { t } = useTranslation();
  const buttonType = outlined ? 'outlined' : 'filled';
  const buttonStyle = `button--${disabled ? 'disabled' : buttonType}`;

  return (
    <button
      type={type}
      disabled={disabled}
      className={`button ${buttonStyle} ${className}`}
      {...props}
    >
      {t(translationKey)}
    </button>
  );
};

export default ButtonComponent;
