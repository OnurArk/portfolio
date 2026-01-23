import { alpha } from "@mui/material/styles";
import { Components } from "@mui/material";

import { CardColors } from "@/constants/theme";

export function buildCardOverrides(card: CardColors): Components["MuiCard"] {
  const borderSize =
    typeof card.borderSize === "number" && Number.isFinite(card.borderSize)
      ? Math.max(0, card.borderSize)
      : 1;
  const borderColor =
    card.borderColor && card.borderColor.trim().length > 0
      ? card.borderColor
      : alpha(card.primaryColor, 0.08);
  const shadowColor =
    card.shadowColor && card.shadowColor.trim().length > 0
      ? card.shadowColor
      : alpha(card.primaryColor, 0.2);

  return {
    styleOverrides: {
      root: {
        borderRadius: card.borderRadius,
        backgroundColor: card.bgColor,
        color: card.primaryColor,
        border: `${borderSize}px solid ${borderColor}`,
        boxShadow: `0 20px 45px ${shadowColor}`,
        "& .MuiCardHeader-root": {
          color: card.primaryColor,
        },
        "& .MuiCardHeader-subheader": {
          color: card.ternaryColor,
        },
        "& .MuiCardContent-root, & .MuiCardActions-root": {
          color: card.secondaryColor,
        },
      },
    },
  };
}
