import type { ThemeOptions } from "@mui/material/styles";

export function buildTypography(): ThemeOptions["typography"] {
  return {
    fontFamily: [
      "Inter",
      "Geist",
      "-apple-system",
      "BlinkMacSystemFont",
      "Segoe UI",
      "sans-serif",
    ].join(","),
  };
}

