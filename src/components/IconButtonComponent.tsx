import React from "react";
import { useTranslation } from "react-i18next";
import { IconBaseProps, IconType } from "react-icons";
import { ButtonProps, ButtonParcial } from "./ButtonComponent";
import { ReactComponent as Elephant } from "../assets/images/elephant.svg";
import { colors } from "../utils";

export type IconButtonProps = {
  Icon: IconType;
  loading?: boolean;
  iconProps?: IconBaseProps;
} & ButtonProps &
  ButtonParcial;

const IconButtonComponent = ({
  Icon,
  label,
  loading,
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
      {loading ? (
        <Elephant
          width={30}
          height={30}
          strokeWidth={15}
          stroke={colors.neutral}
          style={{ padding: 2 }}
          className="loading"
        />
      ) : (
        <Icon className="icon-button__inside" {...iconProps} />
      )}
    </button>
  );
};

export default IconButtonComponent;
