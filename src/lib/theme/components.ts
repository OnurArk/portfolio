import { alpha } from "@mui/material/styles";
import { Components } from "@mui/material";

import { CustomColors, ThemeColorKey } from "@/constants/theme";
import { buildCardOverrides } from "../overrides/card";
import { buildButtonOverrides } from "../overrides/button";
import { buildFieldOverrides } from "../overrides/fields";

type ColorMap = Record<ThemeColorKey, string>;

export function buildComponentOverrides(
  colors: ColorMap,
  custom: CustomColors
): Components {
  return {
    MuiButton: buildButtonOverrides(custom.buttons),
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          border: `1px solid ${alpha(colors.text, 0.08)}`,
          boxShadow: "0 10px 40px rgba(10, 37, 64, 0.08)",
        },
      },
    },
    MuiCard: buildCardOverrides(custom.card),
    ...buildFieldOverrides(custom.inputs, custom.selects, custom.checkboxes),
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiLink: {
      defaultProps: {
        underline: "hover",
      },
      styleOverrides: {
        root: {
          fontWeight: 600,
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          minHeight: "100vh",
          backgroundColor: colors.background,
        },
      },
    },
  };
}
