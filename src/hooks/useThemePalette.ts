import { useMemo } from "react";
import { ThemeMode, ThemeColorOverrides, ThemeCustomOverrides } from "@/constants/theme";
import { buildTheme, mergeColors, mergeCustomColors } from "@/lib/theme";
import { StoredThemeState } from "./useThemeState";
import { CustomColors } from "@/constants/theme";

export function useThemePalette(state: StoredThemeState) {
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

  return {
    palette,
    customPalette,
    workingCustomPalette,
    theme,
  };
}
