"use client";

import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useMemo,
} from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";

import {
  DEFAULT_THEME_COLORS,
  DEFAULT_THEME_CUSTOM,
  CustomColorKey,
  ThemeMode,
} from "@/constants/theme";
import type { CustomColors } from "@/constants/theme";
import { useThemeState } from "@/hooks/useThemeState";
import { useThemeStorage } from "@/hooks/useThemeStorage";
import { useThemePalette } from "@/hooks/useThemePalette";
import { useNavigation } from "@/hooks/useNavigation";
import { useThemeCSSVariables } from "@/hooks/useThemeCSSVariables";

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
  isNavOpen: boolean;
  setIsNavOpen: Dispatch<SetStateAction<boolean>>;
  navWidth: number;
  isNavHover: boolean;
  setIsNavHover: Dispatch<SetStateAction<boolean>>;
  isUnderSmall: boolean;
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
  isNavOpen: false, 
  setIsNavOpen: () => undefined,
  navWidth: 260,
  isNavHover: false,
  setIsNavHover: () => undefined,
  isUnderSmall: false,
});

export function ThemeSettingsProvider({ children }: PropsWithChildren) {
  const {
    state,
    setState,
    setMode,
    updateCustomColor,
    resetColors,
    saveTheme,
    resetCustomSection,
    setSectionOverrides,
  } = useThemeState();

  const { hydrated } = useThemeStorage(state, setState);

  const { palette, customPalette, workingCustomPalette, theme } =
    useThemePalette(state);

  const {
    isNavOpen,
    setIsNavOpen,
    isNavHover,
    setIsNavHover,
    navWidth,
    isUnderSmall,
  } = useNavigation();

  useThemeCSSVariables(palette, customPalette, hydrated);

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
      isNavOpen,
      setIsNavOpen,
      navWidth,
      isNavHover,
      setIsNavHover,
      isUnderSmall,
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
      isNavOpen,
      setIsNavOpen,
      navWidth,
      isNavHover,
      setIsNavHover,
      isUnderSmall,
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
