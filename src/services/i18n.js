import i18next from "i18next";
import format from "./i18n-format";
import { initReactI18next } from "react-i18next";
import HttpApi from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

// "Inline" English and Arabic translations. 
// We can localize to any language and any number of languages.

i18next
  .use(initReactI18next)
  .use(HttpApi)                         // Registering the back-end plugin
  .use(LanguageDetector)                // Registering the detection plugin
  .init({
    //lng: "en",
    defaultNS: 'translation',
    supportedLngs: ["en", "fr", "ar"],  // Allowed languages
    nonExplicitSupportedLngs: true,     // Allows "en-US" and "en-UK" to be implcitly supported when "en" is supported
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
      format,
    },
    debug: process.env.NODE_ENV === "development",
  });

export default i18next;