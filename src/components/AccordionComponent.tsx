import React from "react";
import { useTranslation } from "react-i18next";

export type AccordionProps = {
  translationKey: string;
};

const AccordionComponent = ({
  translationKey,
}: AccordionProps): JSX.Element => {
  const { t } = useTranslation();

  return <div>{t(translationKey)}</div>;
};

export default AccordionComponent;
