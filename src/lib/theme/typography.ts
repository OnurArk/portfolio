import { TypographyOptions } from "@mui/material/styles/createTypography";

export function buildTypography(): TypographyOptions {
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

