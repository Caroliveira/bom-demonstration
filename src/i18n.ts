import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationEN from "./assets/locales/en/translation.json";
import translationBR from "./assets/locales/pt/translation.json";

const resources = {
  en: { translation: translationEN },
  pt: { translation: translationBR },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "pt",
  keySeparator: false,
  interpolation: { escapeValue: false },
});

export default i18n;
