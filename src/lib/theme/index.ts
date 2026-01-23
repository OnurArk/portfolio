import { createTheme } from "@mui/material/styles";

import {
  ThemeColorOverrides,
  ThemeCustomOverrides,
  ThemeMode,
} from "@/constants/theme";

import { buildComponentOverrides } from "./components";
import { buildPalette } from "./palette";
import { shape } from "./shape";
import { getShadows } from "./shadows";
import { buildTypography } from "./typography";

export function buildTheme(
  mode: ThemeMode,
  overrides?: ThemeColorOverrides,
  customOverrides?: ThemeCustomOverrides
) {
  const { palette, colors, custom } = buildPalette(
    mode,
    overrides,
    customOverrides
  );

  return createTheme({
    palette,
    typography: buildTypography(),
    components: buildComponentOverrides(colors, custom),
    shape,
    shadows: getShadows(mode),
  });
}

export { mergeColors, mergeCustomColors } from "./colors";
