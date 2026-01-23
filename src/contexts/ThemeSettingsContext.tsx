"use client";

import {
  createContext,
  PropsWithChildren,
  startTransition,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { CssBaseline, ThemeProvider, useMediaQuery } from "@mui/material";

import {
  DEFAULT_THEME_COLORS,
  DEFAULT_THEME_CUSTOM,
  CustomColors,
  CustomColorKey,
  ThemeColorOverrides,
  ThemeCustomOverrides,
  ThemeMode,
  THEME_STORAGE_KEY,
} from "@/constants/theme";
import { safeGetItem, safeSetItem } from "@/lib/storage";
import { buildTheme, mergeColors, mergeCustomColors } from "@/lib/theme";

type StoredThemeState = {
  mode: ThemeMode;
  colors: Record<ThemeMode, ThemeColorOverrides>;
  custom: Record<ThemeMode, ThemeCustomOverrides>;
  workingCustom?: Record<ThemeMode, ThemeCustomOverrides>;
};

const defaultState: StoredThemeState = {
  mode: "light",
  colors: {
    light: {},
    dark: {},
  },
  custom: {
    light: {},
    dark: {},
  },
  workingCustom: {
    light: {},
    dark: {},
  },
};

const VALID_MODES: ThemeMode[] = ["light", "dark"];

const sanitizeState = (value: unknown): StoredThemeState | null => {
  if (!value || typeof value !== "object") return null;
  const candidate = value as Partial<StoredThemeState>;
  if (!candidate.mode || !VALID_MODES.includes(candidate.mode)) {
    return null;
  }
  return {
    mode: candidate.mode,
    colors: {
      light: candidate.colors?.light ?? {},
      dark: candidate.colors?.dark ?? {},
    },
    custom: {
      light: candidate.custom?.light ?? {},
      dark: candidate.custom?.dark ?? {},
    },
    workingCustom: {
      light: candidate.workingCustom?.light ?? candidate.custom?.light ?? {},
      dark: candidate.workingCustom?.dark ?? candidate.custom?.dark ?? {},
    },
  };
};

type ThemeSettingsContextValue = {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  colors: Record<string, string>;
  custom: CustomColors; // applied theme
  previewCustom: CustomColors; // working draft for preview/inputs
  updateCustomColor: (
    section: CustomColorKey,
    key: string,
    value: string | number
  ) => void;
  saveTheme: () => void;
  resetCustomSection: (section: CustomColorKey) => void;
  resetColors: () => void;
  setSectionOverrides: (
    section: CustomColorKey,
    values: Partial<CustomColors[CustomColorKey]>
  ) => void;
  hydrated: boolean;
};

const ThemeSettingsContext = createContext<ThemeSettingsContextValue>({
  mode: "light",
  setMode: () => undefined,
  colors: DEFAULT_THEME_COLORS.light,
  custom: DEFAULT_THEME_CUSTOM.light,
  previewCustom: DEFAULT_THEME_CUSTOM.light,
  updateCustomColor: () => undefined,
  saveTheme: () => undefined,
  resetCustomSection: () => undefined,
  resetColors: () => undefined,
  setSectionOverrides: () => undefined,
  hydrated: false,
});

export function ThemeSettingsProvider({ children }: PropsWithChildren) {
  const prefersDark = useMediaQuery("(prefers-color-scheme: dark)");
  const [state, setState] = useState<StoredThemeState>(defaultState);
  const [hydrated, setHydrated] = useState(false);

  const ensureWorkingCustom = useCallback(
    (working?: Record<ThemeMode, ThemeCustomOverrides>) =>
      working ?? { light: {}, dark: {} },
    []
  );

  useEffect(() => {
    const storedRaw = safeGetItem<StoredThemeState | null>(
      THEME_STORAGE_KEY,
      null
    );
    const stored = sanitizeState(storedRaw);
    if (stored) {
      startTransition(() => setState(stored));
    } else if (prefersDark) {
      startTransition(() => setState((prev) => ({ ...prev, mode: "dark" })));
    }
    startTransition(() => setHydrated(true));
  }, [prefersDark]);

  useEffect(() => {
    if (!hydrated) return;
    safeSetItem(THEME_STORAGE_KEY, state);
  }, [state, hydrated]);

  const setMode = useCallback(
    (mode: ThemeMode) =>
      setState((prev) => ({
        ...prev,
        mode,
      })),
    []
  );

  const updateCustomColor = useCallback(
    (section: CustomColorKey, key: string, value: string | number) =>
      setState((prev) => {
        const workingRecord = ensureWorkingCustom(prev.workingCustom);
        const workingCustom = workingRecord[prev.mode] ?? {};
        const workingSectionValues =
          (workingCustom[section] as Record<string, unknown>) ?? {};
        const shouldSyncSelectIcon =
          section === "inputs" && key === "iconColor";

        if (key.includes(".")) {
          const [nestedKey, prop] = key.split(".");
          if (!nestedKey || !prop) return prev;
          const workingNestedValues =
            (workingSectionValues[nestedKey] as Record<string, unknown>) ?? {};

          return {
            ...prev,
            workingCustom: {
              ...workingRecord,
              [prev.mode]: {
                ...workingCustom,
                [section]: {
                  ...workingSectionValues,
                  [nestedKey]: {
                    ...workingNestedValues,
                    [prop]: value,
                  },
                },
              },
            },
          };
        }

        return {
          ...prev,
          workingCustom: {
            ...workingRecord,
            [prev.mode]: {
              ...workingCustom,
              [section]: {
                ...workingSectionValues,
                [key]: value,
              },
              ...(shouldSyncSelectIcon
                ? {
                    selects: {
                      ...(workingCustom.selects as Record<string, unknown>),
                      iconColor: value,
                    },
                  }
                : {}),
            },
          },
        };
      }),
    [ensureWorkingCustom]
  );

  const resetColors = useCallback(
    () =>
      setState((prev) => {
        const workingRecord = ensureWorkingCustom(prev.workingCustom);
        return {
          ...prev,
          colors: {
            ...prev.colors,
            [prev.mode]: {},
          },
          workingCustom: {
            ...workingRecord,
            [prev.mode]: {},
          },
        };
      }),
    [ensureWorkingCustom]
  );

  const saveTheme = useCallback(
    () =>
      setState((prev) => {
        const working = ensureWorkingCustom(prev.workingCustom);
        return {
          ...prev,
          custom: {
            ...prev.custom,
            [prev.mode]: working[prev.mode] ?? {},
          },
        };
      }),
    [ensureWorkingCustom]
  );

  const resetCustomSection = useCallback(
    (section: CustomColorKey) =>
      setState((prev) => {
        const working = ensureWorkingCustom(prev.workingCustom);
        const current = working[prev.mode] ?? {};
        return {
          ...prev,
          workingCustom: {
            ...working,
            [prev.mode]: {
              ...current,
              [section]: {},
            },
          },
        };
      }),
    [ensureWorkingCustom]
  );

  const setSectionOverrides = useCallback(
    (section: CustomColorKey, values: Partial<CustomColors[CustomColorKey]>) =>
      setState((prev) => {
        const working = ensureWorkingCustom(prev.workingCustom);
        const current = working[prev.mode] ?? {};
        return {
          ...prev,
          workingCustom: {
            ...working,
            [prev.mode]: {
              ...current,
              [section]: values,
            },
          },
        };
      }),
    [ensureWorkingCustom]
  );

  const palette = useMemo(() => {
    const overrides = state.colors[state.mode] ?? {};
    return mergeColors(state.mode, overrides);
  }, [state]);

  const customPalette = useMemo(() => {
    const overrides = state.custom[state.mode] ?? {};
    return mergeCustomColors(state.mode, overrides);
  }, [state]);

  const workingCustomPalette = useMemo(() => {
    const overrides = state.workingCustom?.[state.mode] ?? {};
    return mergeCustomColors(state.mode, overrides);
  }, [state]);

  const theme = useMemo(() => {
    const overrides = state.colors[state.mode] ?? {};
    const customOverrides = state.custom[state.mode] ?? {};
    return buildTheme(state.mode, overrides, customOverrides);
  }, [state]);

  useEffect(() => {
    if (!hydrated) return;
    const root = document.documentElement;
    root.style.setProperty("--app-nav-bg", customPalette.navbar.bgColor);
    root.style.setProperty("--app-text-color", palette.text);
  }, [palette, customPalette, hydrated]);

  const value = useMemo(
    () => ({
      mode: state.mode,
      setMode,
      colors: palette,
      custom: customPalette,
      previewCustom: workingCustomPalette,
      updateCustomColor,
      saveTheme,
      resetCustomSection,
      resetColors,
      setSectionOverrides,
      hydrated,
    }),
    [
      palette,
      customPalette,
      workingCustomPalette,
      setMode,
      updateCustomColor,
      saveTheme,
      resetCustomSection,
      resetColors,
      setSectionOverrides,
      state.mode,
      hydrated,
    ]
  );

  return (
    <ThemeSettingsContext.Provider value={value}>
      <ThemeProvider theme={theme}>
        <CssBaseline enableColorScheme />
        {children}
      </ThemeProvider>
    </ThemeSettingsContext.Provider>
  );
}

export function useThemeSettings() {
  return useContext(ThemeSettingsContext);
}
