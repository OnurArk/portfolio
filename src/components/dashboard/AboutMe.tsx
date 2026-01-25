"use client";

import Image from "next/image";
import { Card, Box, CardContent, Typography, } from "@mui/material";
import { useTranslations } from "@/contexts/LocaleContext";
import { useThemeSettings } from "@/contexts/ThemeSettingsContext";

type AboutMeProps = {
  isLarge: boolean;
  isMd: boolean;
  isSm: boolean;
}

export function AboutMe({ isLarge, isMd, isSm }: AboutMeProps) {
  const t = useTranslations();
  const { custom } = useThemeSettings();
  
  const imageSize = isLarge ? 200 : isMd ? 160 : isSm ? 120 : 100;

  return (
    <Card sx={{overflow: "visible"}}>
      <CardContent
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          gap: 2,
          p: {xs: 0.8, sm: 1.8, md: 2.6, lg: 3.5}
        }}
      >
        <Box sx={{display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "50%" , overflow: "hidden", width: `${imageSize}px`, height: `${imageSize}px` , alignSelf: "center"}}>
            <Image src="/images/profile.jpeg" alt="logo" width={imageSize} height={imageSize} style={{objectFit: "cover"}} />
        </Box>
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            p: {xs: 1.2, sm: 1.5, md: 2, lg: 2.5},
            backgroundColor: "primary.main",
            boxShadow: `0 12px 30px ${custom.card.shadowColor}`,
            borderRadius: "0 20px 0 20px",
            transform: "translateY(-50%)",
          }}
        >
          <Typography color="text.invertedText" sx={{ alignSelf: "center" , fontSize: {xs: "0.6rem", sm: "0.8rem", md: "1rem", lg: "1.2rem"}}}>
            {t("dashboard.aboutMeTitle")}
          </Typography>
        </Box>

        <Box sx={{mx: {xs: 2, sm: 3, md: 4, lg: 6}}}>
          <Typography
            variant="h3"
            color="text.primary"
            sx={{ alignSelf: "center", textAlign: "center" , fontSize: {xs: "1.4rem", sm: "1.8rem", md: "2.2rem", lg: "3rem"}}}
          >
            {t("dashboard.hello")}
          </Typography>
          
            <Typography color="text.primary" sx={{fontSize: {xs: "0.8rem" , sm: "0.9rem", md: "1rem", lg: "1.2"}}}>{t("dashboard.aboutMe")}</Typography>
            <Typography color="text.primary" sx={{fontSize: {xs: "0.8rem" , sm: "0.9rem", md: "1rem", lg: "1.2"}}}>{t("dashboard.aboutMe2")}</Typography>
            <Typography color="text.primary" sx={{fontSize: {xs: "0.8rem" , sm: "0.9rem", md: "1rem", lg: "1.2"}}}>{t("dashboard.aboutMe3")}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
