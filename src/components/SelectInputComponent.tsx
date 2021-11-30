import React from "react";
import { useTranslation } from "react-i18next";
import { FiAlertTriangle } from "react-icons/fi";

type SelectInputProps = {
  error?: string;
  hideLabel?: boolean;
  translationKey: string;
  children: React.ReactNode;
  divStyle?: React.CSSProperties;
} & React.SelectHTMLAttributes<HTMLSelectElement>;

const SelectInputComponent = ({
  error,
  hideLabel,
  children,
  translationKey,
  divStyle,
  className,
  ...props
}: SelectInputProps): JSX.Element => {
  const { t } = useTranslation();

  return (
    <div className="input" style={divStyle}>
      {!hideLabel && (
        <label htmlFor={translationKey} className="input__label">
          {t(translationKey)}
        </label>
      )}
      <select
        aria-labelledby={translationKey}
        className={`input__box ${className}`}
        {...props}
      >
        {children}
      </select>
      {!!error && (
        <span className="input__error">
          <FiAlertTriangle style={{ marginRight: 8 }} />
          {t(error)}
        </span>
      )}
    </div>
  );
};

export default SelectInputComponent;
