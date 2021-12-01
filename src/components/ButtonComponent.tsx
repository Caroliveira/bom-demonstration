import React from "react";
import { useTranslation } from "react-i18next";

export type ButtonParcial =
  | { label?: string; translationKey?: never }
  | { label?: never; translationKey: string };

export type ButtonProps = {
  outlined?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement> &
  ButtonParcial;

const ButtonComponent = ({
  label,
  translationKey,
  outlined = false,
  type = "button",
  className,
  disabled,
  ...props
}: ButtonProps): JSX.Element => {
  const { t } = useTranslation();
  const buttonType = outlined ? "outlined" : "filled";
  const buttonStyle = `button--${disabled ? "disabled" : buttonType}`;

  return (
    <button
      type={type}
      disabled={disabled}
      className={`button ${buttonStyle} ${className}`}
      {...props}
    >
      {translationKey ? t(translationKey) : label}
    </button>
  );
};

export default ButtonComponent;
