import { Components } from "@mui/material";

import { ButtonColors } from "@/constants/theme";

export function buildButtonOverrides(
  buttons: ButtonColors
): Components["MuiButton"] {
  const base = {
    borderRadius: 999,
    textTransform: "none",
    fontWeight: 600,
    transition: "all 120ms ease",
    boxShadow: "none",
  } as const;

  return {
    styleOverrides: {
      root: {
        ...base,
      },
      contained: {
        ...base,
        backgroundColor: buttons.contained.bgColor,
        color: buttons.contained.textColor,
        border: `1px solid ${buttons.contained.borderColor}`,
        boxShadow: "none",
        "&:hover": {
          backgroundColor: buttons.contained.hoverBgColor,
          color: buttons.contained.hoverTextColor,
          boxShadow: "none",
        },
      },
      outlined: {
        ...base,
        backgroundColor: "transparent",
        color: buttons.outlined.textColor,
        border: `1px solid ${buttons.outlined.borderColor}`,
        "&:hover": {
          backgroundColor: buttons.outlined.hoverBgColor,
          color: buttons.outlined.hoverTextColor,
        },
      },
      text: {
        ...base,
        backgroundColor: buttons.text.bgColor,
        color: buttons.text.textColor,
        border: "none",
        "&:hover": {
          backgroundColor: buttons.text.hoverBgColor,
          color: buttons.text.hoverTextColor,
        },
      },
    },
  };
}
