import React from "react";
import { useTranslation } from "react-i18next";
import { CgTrash } from "react-icons/cg";

import { ButtonComponent, IconButtonComponent } from ".";
import { ButtonProps } from "./ButtonComponent";

type ModalProps = {
  show: boolean;
  title: string;
  deleteButton?: ButtonProps;
  secondaryButton?: ButtonProps;
  submitButton?: ButtonProps;
  onSubmit?: (evt: React.FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
};

const ModalComponent = ({
  show,
  title,
  deleteButton,
  secondaryButton,
  submitButton,
  onSubmit,
  children,
}: ModalProps): JSX.Element | null => {
  const { t } = useTranslation();

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    onSubmit?.(evt);
  };

  if (!show) return null;

  return (
    <div className="modal__background">
      <form className="modal" role="dialog" onSubmit={handleSubmit}>
        <div className="modal__header">
          <h2 className="modal__title">{t(title)}</h2>
          {deleteButton && (
            <IconButtonComponent
              Icon={CgTrash}
              className="modal__icon"
              iconProps={{ color: "#821d1d" }}
              {...deleteButton}
            />
          )}
        </div>

        {children}

        <div className="modal__buttons">
          {secondaryButton && (
            <ButtonComponent
              className="modal__cancel-button"
              {...secondaryButton}
            />
          )}
          {submitButton && (
            <ButtonComponent {...submitButton} outlined type="submit" />
          )}
        </div>
      </form>
    </div>
  );
};

export default ModalComponent;
