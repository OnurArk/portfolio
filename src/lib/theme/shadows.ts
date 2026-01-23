import { Shadows } from "@mui/material/styles";

import { ThemeMode } from "@/constants/theme";

const shadowTemplates = [
  "none",
  "0px 1px 3px COLOR",
  "0px 4px 8px COLOR",
  "0px 6px 12px COLOR",
  "0px 8px 16px COLOR",
  "0px 10px 20px COLOR",
  "0px 12px 24px COLOR",
  "0px 14px 28px COLOR",
  "0px 16px 32px COLOR",
  "0px 18px 36px COLOR",
  "0px 20px 40px COLOR",
  "0px 22px 44px COLOR",
  "0px 24px 48px COLOR",
  "0px 26px 52px COLOR",
  "0px 28px 56px COLOR",
  "0px 30px 60px COLOR",
  "0px 32px 64px COLOR",
  "0px 34px 68px COLOR",
  "0px 36px 72px COLOR",
  "0px 38px 76px COLOR",
  "0px 40px 80px COLOR",
  "0px 42px 84px COLOR",
  "0px 44px 88px COLOR",
  "0px 46px 92px COLOR",
  "0px 48px 96px COLOR",
] as const;

const buildShadows = (color: string): Shadows =>
  shadowTemplates.map((shadow) =>
    shadow === "none" ? shadow : shadow.replace("COLOR", color)
  ) as Shadows;

const lightShadows = buildShadows("rgba(15,23,42,0.08)");
const darkShadows = buildShadows("rgba(0,0,0,0.35)");

export function getShadows(mode: ThemeMode): Shadows {
  return mode === "light" ? lightShadows : darkShadows;
}
