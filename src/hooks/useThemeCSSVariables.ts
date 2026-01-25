import { useEffect } from "react";
import { CustomColors } from "@/constants/theme";

type ThemeColorOverrides = Record<string, string>;

export function useThemeCSSVariables(
  palette: ThemeColorOverrides,
  customPalette: CustomColors,
  hydrated: boolean
) {
  useEffect(() => {
    if (!hydrated) return;
    const root = document.documentElement;
    root.style.setProperty("--app-nav-bg", customPalette.navbar.bgColor);
    root.style.setProperty("--app-text-color", palette.text);
  }, [palette, customPalette, hydrated]);
}
