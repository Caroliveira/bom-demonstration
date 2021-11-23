import { useTranslation } from 'react-i18next';
import { IconType } from 'react-icons';

type IconButtonProps = {
  translationKey: string;
  Icon: IconType
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const IconButtonComponent = ({
  translationKey, Icon, type = 'button', className, ...props
}: IconButtonProps): JSX.Element => {
  const { t } = useTranslation();

  return (
    <button type={type} className={`icon-button ${className}`} {...props}>
      <Icon className="icon-button__inside" />
    </button>
  );
};

export default IconButtonComponent;
