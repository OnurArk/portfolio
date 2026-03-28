"use client";

import { Icon } from "@iconify/react";
import {
  Box,
  Stack,
  Card,
  Tooltip,
  Typography,
  alpha,
  useTheme,
} from "@mui/material";
import { useThemeSettings } from "@/contexts/ThemeSettingsContext";
import { useLocale, useTranslations } from "@/contexts/LocaleContext";

export function Links() {
  const { mode } = useThemeSettings();
  const { locale } = useLocale();
  const t = useTranslations();
  const theme = useTheme();
  const resumeHref = locale === "tr" ? "/Resume-Türkçe.pdf" : "/Resume.pdf";

  const links = [
    {
      id: 1,
      icon: "mdi:github",
      href: "https://github.com/OnurArk",
      color: mode === "light" ? "#dee056" : "#f1fba9",
      tooltip: t("dashboard.links.tooltip.github"),
    },
    {
      id: 2,
      icon: "mdi:linkedin",
      href: "https://www.linkedin.com/in/mehmet-onur-arik-5b589b249/",
      color: mode === "light" ? "#0077B5" : "#05a2f6",
      tooltip: t("dashboard.links.tooltip.linkedin"),
    },
    {
      id: 3,
      icon: "bx:mail-send",
      href: "mailto:onurark11@gmail.com",
      color: mode === "light" ? "#D44638" : "#D44638",
      tooltip: t("dashboard.links.tooltip.email"),
    },
    {
      id: 4,
      icon: "mdi:file-pdf-box",
      href: resumeHref,
      color: mode === "light" ? "#14dc21" : "#00ff40",
      tooltip: t("dashboard.links.tooltip.resume"),
    },
  ];

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Stack sx={{ justifyContent: "center", alignItems: "center", gap: 2 }}>
        <Typography
          variant="h4"
          color={theme.palette.primary.light}
          sx={{
            alignSelf: "center",
            fontSize: { xs: "1.6rem", sm: "1.8rem", md: "2rem", lg: "2.2rem" },
          }}
        >
          {t("dashboard.links.title")}
        </Typography>
        <Stack
          direction="row"
          sx={{
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          {links.map((link) => (
            <Tooltip key={link.id} title={link.tooltip} arrow>
              <Card
                sx={{
                  width: "fit-content",
                  px: 1.2,
                  py: 0.5,
                  cursor: "pointer",
                  transition: "transform 0.3s ease-in-out",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: `0 12px 30px ${alpha(link.color, 0.2)}`,
                  },
                }}
                onClick={() => window.open(link.href, "_blank")}
              >
                <Icon icon={link.icon} width={36} height={36} />
              </Card>
            </Tooltip>
          ))}
        </Stack>
      </Stack>
    </Box>
  );
}
