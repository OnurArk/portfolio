"use client";

import { useMemo, useState } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControlLabel,
  IconButton,
  MenuItem,
  Select,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { Icon } from "@iconify/react";

import { useTranslations } from "@/contexts/LocaleContext";
import { useThemeSettings } from "@/contexts/ThemeSettingsContext";

import {
  CustomColorKey,
  CustomColors,
  DEFAULT_THEME_CUSTOM,
} from "@/constants/theme";
import { ColorField } from "../ui/ColorField";
import { NumberField } from "../ui/NumberField";

type FieldConfig = {
  key: string;
  labelKey: string;
  input: "color" | "number";
  min?: number;
  max?: number;
  step?: number;
  suffix?: string;
};

type SectionConfig = {
  key: CustomColorKey;
  titleKey: string;
  fields: FieldConfig[];
};

const NAVBAR_FIELDS: FieldConfig[] = [
  {
    key: "bgColor",
    labelKey: "settings.theme.colors.navbar.bg",
    input: "color",
  },
  {
    key: "textColor",
    labelKey: "settings.theme.colors.navbar.text",
    input: "color",
  },
  {
    key: "activeBgColor",
    labelKey: "settings.theme.colors.navbar.activeButtonBg",
    input: "color",
  },
  {
    key: "activeTextColor",
    labelKey: "settings.theme.colors.navbar.activeButtonText",
    input: "color",
  },
  {
    key: "hoverBgColor",
    labelKey: "settings.theme.colors.navbar.buttonHoverBg",
    input: "color",
  },
  {
    key: "hoverTextColor",
    labelKey: "settings.theme.colors.navbar.buttonHoverText",
    input: "color",
  },
  {
    key: "shadowColor",
    labelKey: "settings.theme.colors.navbar.shadow",
    input: "color",
  },
] as const;

const PAPER_FIELDS: FieldConfig[] = [
  {
    key: "default",
    labelKey: "settings.theme.colors.paper.default",
    input: "color",
  },
  {
    key: "paper",
    labelKey: "settings.theme.colors.paper.paper",
    input: "color",
  },
] as const;

const INPUT_FIELDS: FieldConfig[] = [
  {
    key: "bgColor",
    labelKey: "settings.theme.colors.inputs.bg",
    input: "color",
  },
  {
    key: "borderColor",
    labelKey: "settings.theme.colors.inputs.border",
    input: "color",
  },
  {
    key: "hoverBorderColor",
    labelKey: "settings.theme.colors.inputs.hoverBorder",
    input: "color",
  },
  {
    key: "focusBorderColor",
    labelKey: "settings.theme.colors.inputs.focusBorder",
    input: "color",
  },
  {
    key: "textColor",
    labelKey: "settings.theme.colors.inputs.text",
    input: "color",
  },
  {
    key: "placeholderColor",
    labelKey: "settings.theme.colors.inputs.placeholder",
    input: "color",
  },
  {
    key: "iconColor",
    labelKey: "settings.theme.colors.selects.icon",
    input: "color",
  },
] as const;

const CHECKBOX_FIELDS: FieldConfig[] = [
  {
    key: "checkColor",
    labelKey: "settings.theme.colors.checkboxes.check",
    input: "color",
  },
  {
    key: "borderColor",
    labelKey: "settings.theme.colors.checkboxes.border",
    input: "color",
  },
  {
    key: "hoverBorderColor",
    labelKey: "settings.theme.colors.checkboxes.hoverBorder",
    input: "color",
  },
  {
    key: "disabledCheckedColor",
    labelKey: "settings.theme.colors.checkboxes.disabledChecked",
    input: "color",
  },
  {
    key: "disabledUncheckedColor",
    labelKey: "settings.theme.colors.checkboxes.disabledUnchecked",
    input: "color",
  },
] as const;

const BUTTON_FIELDS: FieldConfig[] = [
  {
    key: "contained.bgColor",
    labelKey: "settings.theme.colors.buttons.contained.bg",
    input: "color",
  },
  {
    key: "contained.textColor",
    labelKey: "settings.theme.colors.buttons.contained.text",
    input: "color",
  },
  {
    key: "contained.borderColor",
    labelKey: "settings.theme.colors.buttons.contained.border",
    input: "color",
  },
  {
    key: "contained.hoverBgColor",
    labelKey: "settings.theme.colors.buttons.contained.hoverBg",
    input: "color",
  },
  {
    key: "contained.hoverTextColor",
    labelKey: "settings.theme.colors.buttons.contained.hoverText",
    input: "color",
  },
  {
    key: "outlined.textColor",
    labelKey: "settings.theme.colors.buttons.outlined.text",
    input: "color",
  },
  {
    key: "outlined.borderColor",
    labelKey: "settings.theme.colors.buttons.outlined.border",
    input: "color",
  },
  {
    key: "outlined.hoverBgColor",
    labelKey: "settings.theme.colors.buttons.outlined.hoverBg",
    input: "color",
  },
  {
    key: "outlined.hoverTextColor",
    labelKey: "settings.theme.colors.buttons.outlined.hoverText",
    input: "color",
  },
  {
    key: "text.textColor",
    labelKey: "settings.theme.colors.buttons.text.text",
    input: "color",
  },
  {
    key: "text.hoverTextColor",
    labelKey: "settings.theme.colors.buttons.text.hoverText",
    input: "color",
  },
] as const;

const CARD_FIELDS: FieldConfig[] = [
  {
    key: "borderRadius",
    labelKey: "settings.theme.colors.card.radius",
    input: "number",
    min: 0,
    max: 64,
    step: 1,
    suffix: "px",
  },
  {
    key: "borderSize",
    labelKey: "settings.theme.colors.card.borderSize",
    input: "number",
    min: 0,
    max: 16,
    step: 1,
    suffix: "px",
  },
  {
    key: "borderColor",
    labelKey: "settings.theme.colors.card.border",
    input: "color",
  },
  { key: "bgColor", labelKey: "settings.theme.colors.card.bg", input: "color" },
  {
    key: "primaryColor",
    labelKey: "settings.theme.colors.card.primary",
    input: "color",
  },
  {
    key: "secondaryColor",
    labelKey: "settings.theme.colors.card.secondary",
    input: "color",
  },
  {
    key: "ternaryColor",
    labelKey: "settings.theme.colors.card.ternary",
    input: "color",
  },
  {
    key: "shadowColor",
    labelKey: "settings.theme.colors.card.shadow",
    input: "color",
  },
] as const;

const SECTIONS: SectionConfig[] = [
  {
    key: "navbar",
    titleKey: "settings.theme.sections.navbar",
    fields: NAVBAR_FIELDS,
  },
  {
    key: "paper",
    titleKey: "settings.theme.sections.paper",
    fields: PAPER_FIELDS,
  },
  {
    key: "card",
    titleKey: "settings.theme.sections.card",
    fields: CARD_FIELDS,
  },
  {
    key: "buttons",
    titleKey: "settings.theme.sections.buttons",
    fields: BUTTON_FIELDS,
  },
  {
    key: "inputs",
    titleKey: "settings.theme.sections.inputs",
    fields: INPUT_FIELDS,
  },
  {
    key: "checkboxes",
    titleKey: "settings.theme.sections.checkboxes",
    fields: CHECKBOX_FIELDS,
  },
] as const;

export function ThemeControls() {
  const t = useTranslations();
  const {
    mode,
    setMode,
    previewCustom: custom,
    updateCustomColor,
    resetColors,
    saveTheme,
    resetCustomSection,
    setSectionOverrides,
  } = useThemeSettings();
  const [openSection, setOpenSection] = useState<CustomColorKey | null>(null);
  const [sectionSnapshot, setSectionSnapshot] = useState<Partial<
    CustomColors[CustomColorKey]
  > | null>(null);
  const [selectValue, setSelectValue] = useState("");

  const activeSection = useMemo(
    () => SECTIONS.find((section) => section.key === openSection) ?? null,
    [openSection]
  );

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

  const handleResetAndSave = () => {
    resetColors();
    saveTheme();
  };

  const handleOpenSection = (section: SectionConfig) => {
    setSectionSnapshot(custom[section.key]);
    setOpenSection(section.key);
  };

  const handleCloseSection = () => {
    if (openSection && sectionSnapshot) {
      setSectionOverrides(openSection, sectionSnapshot);
    }
    setOpenSection(null);
    setSectionSnapshot(null);
  };

  const handleSaveSection = () => {
    saveTheme();
    setOpenSection(null);
    setSectionSnapshot(null);
  };
  const getFieldValue = (sectionKey: CustomColorKey, fieldKey: string) => {
    const sectionValues = custom[sectionKey] as unknown as Record<
      string,
      string | number | Record<string, string | number>
    >;

    if (sectionKey === "inputs" && fieldKey === "iconColor") {
      const selectValues = custom.selects as unknown as Record<
        string,
        string | number
      >;
      return (
        sectionValues?.[fieldKey] ??
        (selectValues?.iconColor as string | number | undefined)
      );
    }

    if (fieldKey.includes(".")) {
      const [nested, prop] = fieldKey.split(".");
      if (!nested || !prop) return undefined;
      const nestedValues = sectionValues?.[nested] as
        | Record<string, string | number>
        | undefined;
      return nestedValues?.[prop];
    }

    return sectionValues?.[fieldKey];
  };

  const renderField = (sectionKey: CustomColorKey, field: FieldConfig) => {
    const value = getFieldValue(sectionKey, field.key);

    if (field.input === "number") {
      return (
        <NumberField
          label={t(field.labelKey)}
          value={typeof value === "number" ? value : Number(value) || 0}
          min={field.min}
          max={field.max}
          step={field.step}
          suffix={field.suffix}
          onChange={(next) => updateCustomColor(sectionKey, field.key, next)}
        />
      );
    }

    return (
      <ColorField
        label={t(field.labelKey)}
        value={typeof value === "string" ? value : String(value ?? "")}
        onChange={(next) => updateCustomColor(sectionKey, field.key, next)}
      />
    );
  };

  return (
    <>
      <Card>
        <CardContent>
          <Stack spacing={3}>
            <Stack spacing={1}>
              <Typography variant="h6" fontWeight={700}>
                {t("settings.theme.title")}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {t("settings.theme.description")}
              </Typography>
            </Stack>

            <Stack spacing={1}>
              <Typography variant="subtitle2" color="text.secondary">
                {t("settings.theme.mode.label")}
              </Typography>
              <ButtonGroup>
                <Button
                  variant={mode === "light" ? "contained" : "outlined"}
                  onClick={() => setMode("light")}
                >
                  {t("settings.theme.mode.light")}
                </Button>
                <Button
                  variant={mode === "dark" ? "contained" : "outlined"}
                  onClick={() => setMode("dark")}
                >
                  {t("settings.theme.mode.dark")}
                </Button>
              </ButtonGroup>
            </Stack>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                gap: 1,
              }}
            >
              {SECTIONS.map((section) => (
                <Box
                  key={section.key}
                  sx={{
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: 2,
                    px: 2,
                    py: 1.25,
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    justifyContent: "space-between",
                  }}
                >
                  <Stack spacing={0.5} sx={{ flex: 1, minWidth: 0 }}>
                    <Typography variant="subtitle1" fontWeight={700}>
                      {t(section.titleKey)}
                    </Typography>
                    <Box sx={{ display: "flex", gap: 0.75, flexWrap: "wrap" }}>
                      {renderSectionSwatches(section.key).map((swatch) => (
                        <Tooltip key={swatch.label} title={swatch.label}>
                          <Box
                            sx={{
                              width: 24,
                              height: 24,
                              borderRadius: "50%",
                              border: "1px solid",
                              borderColor: "divider",
                              backgroundColor: swatch.color,
                              boxShadow: "0 0 0 2px rgba(0,0,0,0.04)",
                            }}
                          />
                        </Tooltip>
                      ))}
                    </Box>
                  </Stack>

                  <Tooltip title={t("settings.theme.edit")}>
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => handleOpenSection(section)}
                    >
                      <Icon
                        icon="material-symbols:edit-outline"
                        width={20}
                        height={20}
                      />
                    </IconButton>
                  </Tooltip>
                </Box>
              ))}
            </Box>

            <Stack direction="row" spacing={1} justifyContent="flex-end">
              <Button
                variant="text"
                color="inherit"
                onClick={handleResetAndSave}
              >
                {t("settings.theme.resetAll")}
              </Button>
            </Stack>
          </Stack>
        </CardContent>
      </Card>

      <Dialog
        fullWidth
        maxWidth="lg"
        open={Boolean(activeSection)}
        onClose={handleCloseSection}
        PaperProps={{
          sx: { maxHeight: "82vh" },
        }}
      >
        <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography  fontWeight={700} sx={{ flex: 1 , fontSize: 20}}>
            {activeSection ? t(activeSection.titleKey) : ""}
          </Typography>
          <IconButton onClick={handleCloseSection} size="small">
            <Icon
              icon="material-symbols:close-rounded"
              width={20}
              height={20}
            />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Stack
            spacing={2}
            direction={{ xs: "column", md: "row" }}
            alignItems="stretch"
          >
            <Box
              sx={{
                flex: 1,
                minWidth: 0,
                p: 2,
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 2,
                bgcolor: "background.default",
              }}
            >
              {activeSection && renderSectionPreview(activeSection.key)}
            </Box>

            <Divider
              orientation="vertical"
              flexItem
              sx={{ display: { xs: "none", md: "block" } }}
            />

            <Box
              sx={{
                flex: 1,
                minWidth: 0,
                p: 2,
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 2,
                bgcolor: "background.paper",
              }}
            >
              <Stack
                direction="row"
                flexWrap="wrap"
                alignItems="flex-start"
                gap={1.5}
              >
                {activeSection?.fields.map((field) => (
                  <Box key={field.key}>
                    {renderField(activeSection.key, field)}
                  </Box>
                ))}
              </Stack>
            </Box>
          </Stack>
        </DialogContent>
        <DialogActions
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: 1,
          }}
        >
          <Button
            color="inherit"
            onClick={() =>
              activeSection && resetCustomSection(activeSection.key)
            }
          >
            {t("settings.theme.resetSection")}
          </Button>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button color="inherit" onClick={handleCloseSection}>
              {t("settings.theme.cancel")}
            </Button>
            <Button variant="contained" onClick={handleSaveSection}>
              {t("settings.theme.save")}
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    </>
  );

  function renderSectionPreview(sectionKey: CustomColorKey) {
    switch (sectionKey) {
      case "navbar":
        return (
          <Box
            sx={{
              backgroundColor: custom.navbar.bgColor,
              color: custom.navbar.textColor,
              borderRadius: 2,
              boxShadow: `0 12px 30px ${custom.navbar.shadowColor}`,
              p: 1.5,
              display: "flex",
              flexDirection: "column",
              gap: 0.75,
              maxWidth: 260,
            }}
          >
            {["Overview", "Analytics", "Settings"].map((label, idx) => {
              const isActive = idx === 1;
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
                    "&:hover": {
                      backgroundColor: custom.navbar.hoverBgColor,
                      color: custom.navbar.hoverTextColor,
                    },
                  }}
                >
                  {label}
                </Box>
              );
            })}
          </Box>
        );
      case "paper":
        return (
          <Stack spacing={1.5}>
            <Box
              sx={{
                p: 2,
                borderRadius: 2,
                backgroundColor: custom.paper.default,
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <Typography fontWeight={700}>
                {t("settings.theme.colors.paper.default")}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Background area preview.
              </Typography>
            </Box>
            <Box
              sx={{
                p: 2,
                borderRadius: 2,
                backgroundColor: custom.paper.paper,
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <Typography fontWeight={700}>
                {t("settings.theme.colors.paper.paper")}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Surface preview.
              </Typography>
            </Box>
          </Stack>
        );
      case "card":
        return (
          <Box
            sx={{
              backgroundColor: custom.card.bgColor,
              color: custom.card.primaryColor,
              borderRadius: `${Math.max(
                0,
                Math.min(64, Number(custom.card.borderRadius) || 0)
              )}px`,
              border: `${Math.max(
                0,
                Math.min(16, Number(custom.card.borderSize) || 0)
              )}px solid ${custom.card.borderColor}`,
              boxShadow: `0 12px 30px ${custom.card.shadowColor}`,
              p: 2,
              maxWidth: 360,
            }}
          >
            <Typography variant="subtitle1" fontWeight={700}>
              Sample card
            </Typography>
            <Typography variant="body2" sx={{ mt: 0.5 }}>
              Kart gövdesi ve kenar/gölge renkleri burada görülür.
            </Typography>
          </Box>
        );
      case "buttons":
        return (
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
              {t("settings.theme.preview.buttons.contained")}
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
              {t("settings.theme.preview.buttons.outlined")}
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
              {t("settings.theme.preview.buttons.text")}
            </Button>
          </Stack>
        );
      case "inputs":
        return (
          <Stack spacing={1.5}>
            <TextField
              size="small"
              label={t("settings.theme.preview.inputs.sampleText")}
              placeholder={t("settings.theme.preview.inputs.sampleText")}
              value={t("settings.theme.preview.inputs.sampleValue")}
              onChange={() => {}}
              sx={inputSx}
            />
            <TextField
              size="small"
              label={t("settings.theme.preview.inputs.sampleNumber")}
              type="number"
              value={42}
              onChange={() => {}}
              sx={{ width: 140, ...inputSx }}
            />
            <Select
              size="small"
              value={selectValue}
              onChange={(e) => setSelectValue(String(e.target.value))}
              displayEmpty
              renderValue={(value) =>
                value ? value : t("settings.theme.preview.selects.placeholder")
              }
              sx={{
                minWidth: 200,
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
                <em>{t("settings.theme.preview.selects.placeholder")}</em>
              </MenuItem>
              <MenuItem value={t("settings.theme.preview.selects.optionOne")}>
                {t("settings.theme.preview.selects.optionOne")}
              </MenuItem>
              <MenuItem value={t("settings.theme.preview.selects.optionTwo")}>
                {t("settings.theme.preview.selects.optionTwo")}
              </MenuItem>
            </Select>
          </Stack>
        );
      case "checkboxes":
        return (
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
              label={t("settings.theme.preview.checkboxes.sample")}
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
              label={t("settings.theme.preview.checkboxes.unchecked")}
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
              label={t("settings.theme.preview.checkboxes.disabledChecked")}
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
              label={t("settings.theme.preview.checkboxes.disabledUnchecked")}
            />
          </Stack>
        );
      default:
        return null;
    }
  }

  function renderSectionSwatches(sectionKey: CustomColorKey) {
    const safeColor = (val: unknown, fallback: string) =>
      typeof val === "string" && val ? val : fallback;

    const defaults = DEFAULT_THEME_CUSTOM[mode][sectionKey] as unknown as
      | Record<string, unknown>
      | undefined;

    const fields = (() => {
      const base = SECTIONS.find((s) => s.key === sectionKey)?.fields ?? [];
      if (sectionKey === "card") {
        const colorFields = base.filter((f) => f.input === "color");
        const reorder = [
          "borderColor",
          "bgColor",
          "primaryColor",
          "secondaryColor",
          "ternaryColor",
          "shadowColor",
        ];
        return [
          ...(reorder
            .map((key) => colorFields.find((f) => f.key === key))
            .filter(Boolean) as typeof colorFields),
          ...colorFields.filter((f) => !reorder.includes(f.key)),
        ];
      }
      return base;
    })();

    return fields
      .filter((field) => field.input === "color")
      .map((field) => {
        const defaultValue = (() => {
          if (!defaults) return "#e2e8f0";
          if (field.key.includes(".")) {
            const [nested, prop] = field.key.split(".");
            const nestedDefaults = defaults[nested] as
              | Record<string, unknown>
              | undefined;
            const nestedVal = nestedDefaults?.[prop] as string | undefined;
            return nestedVal ?? "#e2e8f0";
          }
          return (defaults[field.key] as string | undefined) ?? "#e2e8f0";
        })();

        const value = getFieldValue(sectionKey, field.key);

        return {
          label: t(field.labelKey),
          color: safeColor(value, defaultValue),
        };
      });
  }
}
