import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enCommon from "@/i18n/locales/en/common.json";
import esCommon from "@/i18n/locales/es/common.json";
import type { LocaleCode } from "@/types/hifi";

void i18n.use(initReactI18next).init({
  resources: {
    es: { common: esCommon },
    en: { common: enCommon },
  },
  lng: "es" satisfies LocaleCode,
  fallbackLng: "es",
  defaultNS: "common",
  interpolation: { escapeValue: false },
});

export default i18n;
