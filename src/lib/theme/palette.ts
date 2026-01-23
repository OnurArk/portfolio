import { alpha, PaletteOptions } from "@mui/material/styles";

import {
  ThemeColorOverrides,
  ThemeCustomOverrides,
  ThemeMode,
  SurfaceColors,
  CardColors,
  NavbarColors,
  ButtonColors,
  InputColors,
  SelectColors,
  CheckboxColors,
  ResponseColors,
} from "@/constants/theme";

import { mergeColors, mergeCustomColors } from "./colors";

declare module "@mui/material/styles" {
  interface CustomPalette {
    paper: SurfaceColors;
    card: CardColors;
    navbar: NavbarColors;
    buttons: ButtonColors;
    inputs: InputColors;
    selects: SelectColors;
    checkboxes: CheckboxColors;
    response: ResponseColors;
  }

  interface Palette {
    custom: CustomPalette;
  }
  interface PaletteOptions {
    custom?: Partial<CustomPalette>;
  }

  interface TypeText {
    primary: string;
    secondary: string;
    disabled: string;
    invertedText: string;
  }
}

export type PaletteBuild = {
  palette: PaletteOptions;
  colors: ReturnType<typeof mergeColors>;
  custom: ReturnType<typeof mergeCustomColors>;
};

export function buildPalette(
  mode: ThemeMode,
  overrides?: ThemeColorOverrides,
  customOverrides?: ThemeCustomOverrides
): PaletteBuild {
  const colors = mergeColors(mode, overrides);
  const custom = mergeCustomColors(mode, customOverrides);
  const palette: PaletteOptions = {
    mode,
    primary: {
      main: colors.primary,
    },
    background: {
      default: custom.paper.default,
      paper: custom.paper.paper,
    },
    text: {
      primary: colors.text,
      secondary: alpha(colors.text, 0.7),
      invertedText: colors.invertedText,
    },
    action: {
      disabled: colors.disabled,
      hover: alpha(colors.primary, 0.08),
      selected: alpha(colors.primary, 0.16),
    },
    custom: {
      response: {
        success: custom.response.success,
        error: custom.response.error,
        warning: custom.response.warning,
        info: custom.response.info,
      },
      paper: {
        default: custom.paper.default,
        paper: custom.paper.paper,
      },
      card: {
        borderSize: custom.card.borderSize,
        borderColor: custom.card.borderColor,
        shadowColor: custom.card.shadowColor,
        primaryColor: custom.card.primaryColor,
        secondaryColor: custom.card.secondaryColor,
        ternaryColor: custom.card.ternaryColor,
        bgColor: custom.card.bgColor,
        borderRadius: custom.card.borderRadius,
      },
      navbar: {
        bgColor: custom.navbar.bgColor,
        textColor: custom.navbar.textColor,
        activeBgColor: custom.navbar.activeBgColor,
        activeTextColor: custom.navbar.activeTextColor,
        hoverBgColor: custom.navbar.hoverBgColor,
        hoverTextColor: custom.navbar.hoverTextColor,
        shadowColor: custom.navbar.shadowColor,
      },
      buttons: custom.buttons,
      inputs: custom.inputs,
      selects: custom.selects,
      checkboxes: custom.checkboxes,
    },
  };

  return { palette, colors, custom };
}
