import { useTranslation } from 'react-i18next';

type ButtonProps = {
  translationKey: string;
  outlined?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const ButtonComponent = ({
  translationKey, outlined = false, type = 'button', className, ...props
}: ButtonProps): JSX.Element => {
  const { t } = useTranslation();

  return (
    <button className={`button button--${outlined ? 'outlined' : 'filled'} ${className}`} type={type} {...props}>
      {t(translationKey)}
    </button>
  );
};

export default ButtonComponent;
