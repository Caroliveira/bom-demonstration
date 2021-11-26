import { useTranslation } from 'react-i18next';

type ButtonProps = {
  translationKey: string;
  outlined?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const ButtonComponent = ({
  translationKey, outlined = false, type = 'button', className, ...props
}: ButtonProps): JSX.Element => {
  const { t } = useTranslation();
  const buttonStyle = `button--${outlined ? 'outlined' : 'filled'}`;

  return (
    <button
      type={type}
      className={`button ${buttonStyle} ${className}`}
      {...props}
    >
      {t(translationKey)}
    </button>
  );
};

export default ButtonComponent;
