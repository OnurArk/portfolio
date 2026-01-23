"use client";

import { Card, CardContent, Stack, Typography } from "@mui/material";

import { useTranslations } from "@/contexts/LocaleContext";

import { LanguageSelect } from "@/components/settings/LanguageSelect";
import { ThemeControls } from "@/components/settings/ThemeControls";

export function SettingsView() {
  const t = useTranslations();

  return (
    <Stack spacing={4}>
      <Stack spacing={1}>
        <Typography variant="h4" fontWeight={700}>
          {t("settings.title")}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {t("settings.theme.description")}
        </Typography>
      </Stack>

      <Stack spacing={3}>
        <ThemeControls />
        <Card>
          <CardContent>
            <Stack spacing={2}>
              <Typography variant="h6" fontWeight={700}>
                {t("settings.language.title")}
              </Typography>
              <LanguageSelect />
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </Stack>
  );
}
