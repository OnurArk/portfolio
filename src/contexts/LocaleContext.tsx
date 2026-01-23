"use client";

import {
  createContext,
  PropsWithChildren,
  startTransition,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { safeGetItem, safeSetItem } from "@/lib/storage";
import {
  FALLBACK_TRANSLATIONS,
  FALLBACK_LOCALE,
  LocaleKey,
  SUPPORTED_LOCALES,
  TranslationDictionary,
  loadTranslations,
} from "@/translations/messages";

const STORAGE_KEY = "base_next_locale";

type LocaleContextValue = {
  locale: LocaleKey;
  setLocale: (nextLocale: LocaleKey) => void;
  translate: (key: string, variables?: Record<string, string | number>) => string;
  hydrated: boolean;
};

const LocaleContext = createContext<LocaleContextValue>({
  locale: FALLBACK_LOCALE,
  setLocale: () => undefined,
  translate: (key, variables) => {
    let text = FALLBACK_TRANSLATIONS[key] ?? key;
    if (variables) {
      Object.entries(variables).forEach(([varKey, varValue]) => {
        text = text.replace(new RegExp(`{{\\s*${varKey}\\s*}}`, 'g'), String(varValue));
      });
    }
    return text;
  },
  hydrated: false,
});

export function LocaleProvider({ children }: PropsWithChildren) {
  const [locale, setLocale] = useState<LocaleKey>(FALLBACK_LOCALE);
  const [dictionary, setDictionary] = useState<TranslationDictionary>(
    FALLBACK_TRANSLATIONS
  );
  const [hydrated, setHydrated] = useState(false);
  const cacheRef = useRef<Partial<Record<LocaleKey, TranslationDictionary>>>({
    [FALLBACK_LOCALE]: FALLBACK_TRANSLATIONS,
  });

  useEffect(() => {
    const stored = safeGetItem(STORAGE_KEY, FALLBACK_LOCALE);
    if (SUPPORTED_LOCALES.includes(stored)) {
      startTransition(() => setLocale(stored));
    }
    startTransition(() => setHydrated(true));
  }, []);

  const persistLocale = useCallback(
    (nextLocale: LocaleKey) => {
      setLocale(nextLocale);
      safeSetItem(STORAGE_KEY, nextLocale);
    },
    [setLocale]
  );

  useEffect(() => {
    let cancelled = false;
    const cached = cacheRef.current[locale];

    if (cached) {
      setDictionary(cached);
      return () => {
        cancelled = true;
      };
    }

    loadTranslations(locale)
      .then((data) => {
        if (cancelled) return;
        cacheRef.current[locale] = data;
        setDictionary(data);
      })
      .catch(() => {
        if (cancelled) return;
        setDictionary(FALLBACK_TRANSLATIONS);
      });

    return () => {
      cancelled = true;
    };
  }, [locale]);

  const translate = useCallback(
    (key: string, variables?: Record<string, string | number>) => {
      let text = dictionary[key] ?? key;
      if (variables) {
        Object.entries(variables).forEach(([varKey, varValue]) => {
          text = text.replace(new RegExp(`{{\\s*${varKey}\\s*}}`, 'g'), String(varValue));
        });
      }
      return text;
    },
    [dictionary]
  );

  const value = useMemo(
    () => ({
      locale,
      setLocale: persistLocale,
      translate,
      hydrated,
    }),
    [locale, persistLocale, translate, hydrated]
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale() {
  return useContext(LocaleContext);
}

export function useTranslations() {
  const { translate } = useLocale();
  return translate;
}
