export interface NavbarColors {
  activeBgColor: string;
  activeTextColor: string;
  bgColor: string;
  textColor: string;
  hoverBgColor: string;
  hoverTextColor: string;
  shadowColor: string;
}

export interface CardColors {
  borderRadius: number;
  borderSize: number;
  borderColor: string;
  shadowColor: string;
  bgColor: string;
  primaryColor: string;
  secondaryColor: string;
  ternaryColor: string;
}

export interface ButtonVariantColors {
  bgColor: string;
  textColor: string;
  borderColor: string;
  hoverBgColor: string;
  hoverTextColor: string;
}

export interface ButtonColors {
  contained: ButtonVariantColors;
  outlined: ButtonVariantColors;
  text: ButtonVariantColors;
}

export interface InputColors {
  bgColor: string;
  borderColor: string;
  hoverBorderColor: string;
  focusBorderColor: string;
  textColor: string;
  placeholderColor: string;
}

export interface SelectColors {
  bgColor: string;
  borderColor: string;
  hoverBorderColor: string;
  focusBorderColor: string;
  textColor: string;
  placeholderColor: string;
  iconColor: string;
}

export interface CheckboxColors {
  checkColor: string;
  borderColor: string;
  hoverBorderColor: string;
  disabledCheckedColor: string;
  disabledUncheckedColor: string;
}

export interface ResponseColors {
  success: string;
  error: string;
  warning: string;
  info: string;
}

export interface SurfaceColors {
  default: string;
  paper: string;
}

export interface CustomColors {
  paper: SurfaceColors;
  card: CardColors;
  navbar: NavbarColors;
  buttons: ButtonColors;
  inputs: InputColors;
  selects: SelectColors;
  checkboxes: CheckboxColors;
  response: ResponseColors;
}

export type ThemeMode = "light" | "dark";

export type ThemeColorKey = "primary" | "text" | "invertedText" | "background" | "disabled";

export type NavbarCustomKey = keyof NavbarColors;
export type SurfaceCustomKey = keyof SurfaceColors;
export type CustomColorKey = keyof CustomColors;

export type ThemeColorOverrides = Partial<Record<ThemeColorKey, string>>;
export type ThemeCustomOverrides = Partial<{
  paper: Partial<SurfaceColors>;
  card: Partial<CardColors>;
  navbar: Partial<NavbarColors>;
  buttons: Partial<ButtonColors>;
  inputs: Partial<InputColors>;
  selects: Partial<SelectColors>;
  checkboxes: Partial<CheckboxColors>;
  response: Partial<ResponseColors>;
}>;

export const THEME_STORAGE_KEY = "base_next_theme";

export const DEFAULT_THEME_COLORS: Record<
  ThemeMode,
  Record<ThemeColorKey, string>
> = {
  light: {
    primary: "#0054d1",
    text: "#0f172a",
    invertedText: "#f8fafc",
    background: "#f8fafc",
    disabled: "#94a3b8",
  },
  dark: {
    primary: "#60a5fa",
    text: "#f8fafc",
    invertedText: "#0f172a",
    background: "#020617",
    disabled: "#475569",
  },
};

export const DEFAULT_THEME_CUSTOM: Record<ThemeMode, CustomColors> = {
  light: {
    paper: {
      default: "#f8fafc",
      paper: "#ffffff",
    },
    card: {
      borderRadius: 20,
      borderSize: 1,
      borderColor: "rgba(15, 23, 42, 0.08)",
      shadowColor: "rgba(15, 23, 42, 0.2)",
      bgColor: "#ffffff",
      primaryColor: "#0f172a",
      secondaryColor: "#334155",
      ternaryColor: "#64748b",
    },
    navbar: {
      bgColor: "#f1f5f9",
      textColor: "#0f172a",
      activeBgColor: "#e2e8f0",
      activeTextColor: "#0f172a",
      hoverBgColor: "#0b8bed",
      hoverTextColor: "#f8fafc",
      shadowColor: "rgba(15, 23, 42, 0.18)",
    },
    buttons: {
      contained: {
        bgColor: "#0054d1",
        textColor: "#f8fafc",
        borderColor: "#0054d1",
        hoverBgColor: "#0042a6",
        hoverTextColor: "#f8fafc",
      },
      outlined: {
        bgColor: "transparent",
        textColor: "#0054d1",
        borderColor: "#0054d1",
        hoverBgColor: "rgba(0, 84, 209, 0.08)",
        hoverTextColor: "#0054d1",
      },
      text: {
        bgColor: "transparent",
        textColor: "#0054d1",
        borderColor: "transparent",
        hoverBgColor: "rgba(0, 84, 209, 0.08)",
        hoverTextColor: "#0054d1",
      },
    },
    inputs: {
      bgColor: "#ffffff",
      borderColor: "#cbd5e1",
      hoverBorderColor: "#94a3b8",
      focusBorderColor: "#0054d1",
      textColor: "#0f172a",
      placeholderColor: "#94a3b8",
    },
    selects: {
      bgColor: "#ffffff",
      borderColor: "#cbd5e1",
      hoverBorderColor: "#94a3b8",
      focusBorderColor: "#0054d1",
      textColor: "#0f172a",
      placeholderColor: "#94a3b8",
      iconColor: "#334155",
    },
    checkboxes: {
      checkColor: "#0054d1",
      borderColor: "#94a3b8",
      hoverBorderColor: "#0054d1",
      disabledCheckedColor: "#cbd5e1",
      disabledUncheckedColor: "#cbd5e1",
    },
    response: {
      success: "#10b981",
      error: "#ef4444",
      warning: "#f59e0b",
      info: "#3b82f6",
    },
  },
  dark: {
    paper: {
      default: "#020617",
      paper: "#0b1220",
    },
    card: {
      borderRadius: 20,
      borderSize: 1,
      borderColor: "rgba(248, 250, 252, 0.08)",
      shadowColor: "rgba(248, 250, 252, 0.2)",
      bgColor: "#0b1220",
      primaryColor: "#f8fafc",
      secondaryColor: "#cbd5f5",
      ternaryColor: "#94a3b8",
    },
    navbar: {
      bgColor: "#111827",
      textColor: "#f8fafc",
      activeBgColor: "#273549",
      activeTextColor: "#f8fafc",
      hoverBgColor: "#2a3361",
      hoverTextColor: "#f8fafc",
      shadowColor: "rgba(0, 0, 0, 0.35)",
    },
    buttons: {
      contained: {
        bgColor: "#60a5fa",
        textColor: "#0b1220",
        borderColor: "#60a5fa",
        hoverBgColor: "#4e8dd5",
        hoverTextColor: "#0b1220",
      },
      outlined: {
        bgColor: "transparent",
        textColor: "#60a5fa",
        borderColor: "#60a5fa",
        hoverBgColor: "rgba(96, 165, 250, 0.12)",
        hoverTextColor: "#60a5fa",
      },
      text: {
        bgColor: "transparent",
        textColor: "#60a5fa",
        borderColor: "transparent",
        hoverBgColor: "rgba(96, 165, 250, 0.12)",
        hoverTextColor: "#60a5fa",
      },
    },
    inputs: {
      bgColor: "#0b1220",
      borderColor: "#334155",
      hoverBorderColor: "#475569",
      focusBorderColor: "#60a5fa",
      textColor: "#f8fafc",
      placeholderColor: "#94a3b8",
    },
    selects: {
      bgColor: "#0b1220",
      borderColor: "#334155",
      hoverBorderColor: "#475569",
      focusBorderColor: "#60a5fa",
      textColor: "#f8fafc",
      placeholderColor: "#94a3b8",
      iconColor: "#cbd5f5",
    },
    checkboxes: {
      checkColor: "#60a5fa",
      borderColor: "#475569",
      hoverBorderColor: "#60a5fa",
      disabledCheckedColor: "#334155",
      disabledUncheckedColor: "#334155",
    },
    response: {
      success: "#34d399",
      error: "#f87171",
      warning: "#fbbf24",
      info: "#60a5fa",
    },
  },
};
