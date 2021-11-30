import React, { useState } from "react";
import { useTranslation } from "react-i18next";

export type AccordionProps = {
  translationKey: string;
} & React.HTMLAttributes<HTMLDivElement>;

const AccordionComponent = ({
  translationKey,
  children,
  id,
  ...props
}: AccordionProps): JSX.Element => {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);

  const handleClick = () => setShow(!show);

  return (
    <div
      className="accordion"
      onClick={handleClick}
      onKeyPress={handleClick}
      role="button"
      tabIndex={0}
      id={id}
      {...props}
    >
      <h3 className="accordion__label">{t(translationKey)}</h3>
      {/* TO DO: Add animation */}
      {show && <div className="accordion__content">{children}</div>}
    </div>
  );
};

export default AccordionComponent;
