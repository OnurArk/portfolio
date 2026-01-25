"use client";

import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from "@mui/material";

import { useLocale, useTranslations } from "@/contexts/LocaleContext";
import { SUPPORTED_LOCALES } from "@/translations/messages";

const LABELS: Record<string, string> = {
  en: "English",
  tr: "Türkçe",
};

export function LanguageSelect() {
  const { locale, setLocale } = useLocale();
  const t = useTranslations();

  const handleChange = (event: SelectChangeEvent) => {
    setLocale(event.target.value as typeof locale);
  };

  return (
    <Stack spacing={1.5}>
      <Typography variant="body2" color="text.secondary" sx={{ fontSize: {xs: "0.8rem", sm: "0.9rem", md: "1rem", lg: "1.1rem"}}}>
        {t("settings.language.description")}
      </Typography>
      <FormControl fullWidth>
        <InputLabel>{t("settings.language.label")}</InputLabel>
        <Select value={locale} label={t("settings.language.label")} onChange={handleChange}>
          {SUPPORTED_LOCALES.map((code) => (
            <MenuItem key={code} value={code}>
              {LABELS[code]}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Typography variant="caption" color="text.secondary">
        {t("settings.language.notice")}
      </Typography>
    </Stack>
  );
}

