"use client";

import Image from "next/image";
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
        <Box sx={{display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "50%" , overflow: "hidden", width: "160px", height: "160px" , alignSelf: "center"}}>
            <Image src="/images/profile.jpeg" alt="logo" width={160} height={160} style={{objectFit: "cover"}} />
        </Box>
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
            sx={{ alignSelf: "center" , fontSize: {xs: "1.8rem", md: "2.2rem", lg: "3rem"}}}
          >
            {t("dashboard.hello")}
          </Typography>
          <Box sx={{mx: 6}}>
            <Typography color="text.primary">{t("dashboard.aboutMe")}</Typography>
            <Typography color="text.primary">{t("dashboard.aboutMe2")}</Typography>
            <Typography color="text.primary">{t("dashboard.aboutMe3")}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
