"use client";

import { Card, Box, CardContent, Typography } from "@mui/material";
import { useTranslations } from "@/contexts/LocaleContext";
import { useThemeSettings } from "@/contexts/ThemeSettingsContext";

export function AboutMe() {
  const t = useTranslations();
  const { custom } = useThemeSettings();

  return (
    <Card sx={{overflow: "visible"}}>
      <CardContent
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            p: 2,
            backgroundColor: "primary.main",
            boxShadow: `0 12px 30px ${custom.card.shadowColor}`,
            borderRadius: "0 20px 0 20px",
            transform: "translateY(-50%)",
          }}
        >
          <Typography color="text.invertedText" sx={{ alignSelf: "center" }}>
            {t("dashboard.aboutMeTitle")}
          </Typography>
        </Box>
        <Typography
          variant="h3"
          color="text.primary"
          sx={{ alignSelf: "center" }}
        >
          {t("dashboard.hello")}
        </Typography>
        <Typography color="text.primary">{t("dashboard.aboutMe")}</Typography>
        <Typography color="text.primary">{t("dashboard.aboutMe2")}</Typography>
        <Typography color="text.primary">{t("dashboard.aboutMe3")}</Typography>
      </CardContent>
    </Card>
  );
}
