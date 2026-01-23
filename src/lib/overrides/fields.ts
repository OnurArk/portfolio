import { Components } from "@mui/material";

import { CheckboxColors, InputColors, SelectColors } from "@/constants/theme";

export function buildFieldOverrides(
  inputs: InputColors,
  selects: SelectColors,
  checkboxes: CheckboxColors
): Pick<Components, "MuiOutlinedInput" | "MuiInputLabel" | "MuiFormHelperText" | "MuiSelect" | "MuiCheckbox"> {
  const commonInput = {
    fontWeight: 500,
    backgroundColor: inputs.bgColor,
    borderColor: inputs.borderColor,
    hoverBorderColor: inputs.hoverBorderColor,
    focusBorderColor: inputs.focusBorderColor,
    textColor: inputs.textColor,
    placeholderColor: inputs.placeholderColor,
  };

  const commonSelect = {
    fontWeight: 500,
    backgroundColor: selects.bgColor,
    borderColor: selects.borderColor,
    hoverBorderColor: selects.hoverBorderColor,
    focusBorderColor: selects.focusBorderColor,
    textColor: selects.textColor,
    placeholderColor: selects.placeholderColor,
    iconColor: selects.iconColor,
  };

  return {
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ ownerState }) => {
          const isSelect = ownerState?.select;
          if (isSelect) {
            return {};
          }
          const palette = commonInput;
          return {
            backgroundColor: palette.backgroundColor ?? palette.bgColor,
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: palette.borderColor,
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: palette.hoverBorderColor,
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: palette.focusBorderColor,
              borderWidth: 2,
            },
            "& .MuiOutlinedInput-input": {
              color: palette.textColor,
              fontWeight: palette.fontWeight,
              "&::placeholder": {
                color: palette.placeholderColor,
                opacity: 1,
              },
            },
          };
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: inputs.placeholderColor,
          fontWeight: 600,
          "&.Mui-focused": {
            color: inputs.focusBorderColor,
          },
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          color: inputs.placeholderColor,
          fontWeight: 500,
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        icon: {
          color: selects.iconColor,
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: checkboxes.borderColor,
          "& .MuiSvgIcon-root": {
            color: checkboxes.borderColor,
          },
          "&.Mui-checked": {
            color: checkboxes.checkColor,
            "& .MuiSvgIcon-root": {
              color: checkboxes.checkColor,
            },
          },
          "&:hover": {
            color: checkboxes.hoverBorderColor,
            backgroundColor: "transparent",
          },
          "&.Mui-disabled": {
            color: checkboxes.disabledUncheckedColor,
            "& .MuiSvgIcon-root": {
              color: checkboxes.disabledUncheckedColor,
            },
            "&.Mui-checked": {
              color: checkboxes.disabledCheckedColor,
              "& .MuiSvgIcon-root": {
                color: checkboxes.disabledCheckedColor,
              },
            },
          },
        },
      },
    },
  };
}

