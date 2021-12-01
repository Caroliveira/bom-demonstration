import React from "react";
import { useTranslation } from "react-i18next";
import { IconBaseProps, IconType } from "react-icons";
import { ButtonProps, ButtonParcial } from "./ButtonComponent";

type IconButtonProps = {
  Icon: IconType;
  iconProps?: IconBaseProps;
} & ButtonProps &
  ButtonParcial;

const IconButtonComponent = ({
  Icon,
  label,
  translationKey,
  type = "button",
  className,
  disabled,
  iconProps,
  ...props
}: IconButtonProps): JSX.Element => {
  const { t } = useTranslation();

  return (
    <button
      type={type}
      title={translationKey ? t(translationKey) : label}
      className={`icon-button ${
        disabled && "icon-button--disabled"
      } ${className}`}
      disabled={disabled}
      {...props}
    >
      <Icon className="icon-button__inside" {...iconProps} />
    </button>
  );
};

export default IconButtonComponent;
