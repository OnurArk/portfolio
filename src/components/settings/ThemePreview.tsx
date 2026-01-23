import { useMemo, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Checkbox,
  Divider,
  FormControlLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import { useThemeSettings } from "@/contexts/ThemeSettingsContext";

export function ThemePreview() {
  const { previewCustom: custom } = useThemeSettings();
  const [selectValue, setSelectValue] = useState("");

  const inputSx = useMemo(
    () => ({
      "& .MuiOutlinedInput-root": {
        backgroundColor: custom.inputs.bgColor,
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: custom.inputs.borderColor,
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: custom.inputs.hoverBorderColor,
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: custom.inputs.focusBorderColor,
          borderWidth: 2,
        },
        "& .MuiOutlinedInput-input": {
          color: custom.inputs.textColor,
          fontWeight: 600,
          "&::placeholder": {
            color: custom.inputs.placeholderColor,
            opacity: 1,
          },
        },
      },
      "& .MuiInputLabel-root": {
        color: custom.inputs.placeholderColor,
        fontWeight: 600,
        "&.Mui-focused": {
          color: custom.inputs.focusBorderColor,
        },
      },
    }),
    [custom]
  );

  return (
    <Card variant="outlined">
      <CardContent>
        <Stack spacing={2.5} sx={{ maxWidth: 1100, mx: "auto" }}>
          <Stack spacing={0.5}>
            <Typography variant="h6" fontWeight={700}>
              Theme preview
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Görsel örnek: navbar, kart, buton ve form elemanları.
            </Typography>
          </Stack>

          <Box
            sx={{
              backgroundColor: custom.paper.default,
              p: { xs: 0, md: 0 },
              borderRadius: 2,
              overflow: "hidden",
              border: `1px solid ${custom.card.borderColor}`,
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              minHeight: 360,
            }}
          >
            {/* Sidebar navbar */}
            <Box
              sx={{
                width: { xs: "100%", md: 220 },
                backgroundColor: custom.navbar.bgColor,
                color: custom.navbar.textColor,
                boxShadow: `-4px 6px 24px ${custom.navbar.shadowColor}`,
                display: "flex",
                flexDirection: "column",
                gap: 0.5,
                p: 1.5,
              }}
            >
              {["Overview", "Analytics", "Settings"].map((label, idx) => {
                const isActive = idx === 2;
                const isHoverable = !isActive;
                return (
                  <Box
                    key={label}
                    sx={{
                      px: 1.25,
                      py: 1,
                      borderRadius: 1.25,
                      fontWeight: 700,
                      cursor: "pointer",
                      backgroundColor: isActive
                        ? custom.navbar.activeBgColor
                        : "transparent",
                      color: isActive
                        ? custom.navbar.activeTextColor
                        : custom.navbar.textColor,
                      "&:hover": isHoverable
                        ? {
                            backgroundColor: custom.navbar.hoverBgColor,
                            color: custom.navbar.hoverTextColor,
                          }
                        : undefined,
                    }}
                  >
                    {label}
                  </Box>
                );
              })}
            </Box>

            <Box
              sx={{
                p: 2,
                display: "grid",
                gap: 2,
                flex: 1,
                minWidth: 0,
              }}
            >
              {/* Card */}
              <Box
                sx={{
                  backgroundColor: custom.card.bgColor,
                  color: custom.card.primaryColor,
                  borderRadius: custom.card.borderRadius,
                  border: `${custom.card.borderSize}px solid ${custom.card.borderColor}`,
                  boxShadow: `0 12px 30px ${custom.card.shadowColor}`,
                  p: 2,
                }}
              >
                <Typography variant="subtitle1" fontWeight={700}>
                  Sample card
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 0.5 }}
                >
                  Kart gövdesi ve kenar/gölge renkleri burada görülür.
                </Typography>
              </Box>

              {/* Buttons */}
              <Stack direction="row" spacing={1} flexWrap="wrap">
                <Button
                  variant="contained"
                  disableElevation
                  sx={{
                    backgroundColor: custom.buttons.contained.bgColor,
                    color: custom.buttons.contained.textColor,
                    border: `1px solid ${custom.buttons.contained.borderColor}`,
                    "&:hover": {
                      backgroundColor: custom.buttons.contained.hoverBgColor,
                      color: custom.buttons.contained.hoverTextColor,
                    },
                  }}
                >
                  Contained
                </Button>
                <Button
                  variant="outlined"
                  sx={{
                    color: custom.buttons.outlined.textColor,
                    border: `1px solid ${custom.buttons.outlined.borderColor}`,
                    backgroundColor: "transparent",
                    "&:hover": {
                      backgroundColor: custom.buttons.outlined.hoverBgColor,
                      color: custom.buttons.outlined.hoverTextColor,
                    },
                  }}
                >
                  Outlined
                </Button>
                <Button
                  variant="text"
                  sx={{
                    color: custom.buttons.text.textColor,
                    border: "none",
                    backgroundColor: "transparent",
                    "&:hover": {
                      backgroundColor: custom.buttons.text.hoverBgColor,
                      color: custom.buttons.text.hoverTextColor,
                    },
                  }}
                >
                  Text
                </Button>
              </Stack>

              <Divider />

              {/* Inputs & Select */}
              <Stack direction="row" spacing={1.5} flexWrap="wrap">
                <TextField
                  size="small"
                  label="Input"
                  placeholder="Placeholder"
                  value="Hello"
                  onChange={() => {}}
                  sx={inputSx}
                />
                <TextField
                  size="small"
                  label="Number"
                  type="number"
                  value={42}
                  onChange={() => {}}
                  sx={{ width: 120, ...inputSx }}
                />
                <Select
                  size="small"
                  value={selectValue}
                  onChange={(e) => setSelectValue(String(e.target.value))}
                  displayEmpty
                  renderValue={(value) =>
                    value ? value : "Select placeholder"
                  }
                  sx={{
                    minWidth: 170,
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: custom.inputs.borderColor,
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: custom.inputs.hoverBorderColor,
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: custom.inputs.focusBorderColor,
                      borderWidth: 2,
                    },
                    "& .MuiSelect-select": {
                      color: custom.inputs.textColor,
                      fontWeight: 600,
                    },
                    backgroundColor: custom.inputs.bgColor,
                    "& .MuiSelect-icon": {
                      color: custom.selects.iconColor,
                    },
                  }}
                >
                  <MenuItem value="">
                    <em>Select placeholder</em>
                  </MenuItem>
                  <MenuItem value="Option one">Option one</MenuItem>
                  <MenuItem value="Option two">Option two</MenuItem>
                </Select>
              </Stack>

              {/* Checkboxes */}
              <Stack direction="row" spacing={1.5} flexWrap="wrap">
                <FormControlLabel
                  control={
                    <Checkbox
                      defaultChecked
                      sx={{
                        color: custom.checkboxes.borderColor,
                        "&.Mui-checked": {
                          color: custom.checkboxes.checkColor,
                        },
                      }}
                    />
                  }
                  label="Checked"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      sx={{
                        color: custom.checkboxes.borderColor,
                        "&.Mui-checked": {
                          color: custom.checkboxes.checkColor,
                        },
                      }}
                    />
                  }
                  label="Unchecked"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      defaultChecked
                      disabled
                      sx={{
                        color: custom.checkboxes.disabledCheckedColor,
                        "& .MuiSvgIcon-root": {
                          color: custom.checkboxes.disabledCheckedColor,
                        },
                      }}
                    />
                  }
                  label="Disabled checked"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      disabled
                      sx={{
                        color: custom.checkboxes.disabledUncheckedColor,
                        "& .MuiSvgIcon-root": {
                          color: custom.checkboxes.disabledUncheckedColor,
                        },
                      }}
                    />
                  }
                  label="Disabled"
                />
              </Stack>
            </Box>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}
