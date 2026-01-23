"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import {
  Avatar,
  Card,
  CardContent,
  Stack,
  Typography,
  Box,
} from "@mui/material";
import { useTranslations } from "@/contexts/LocaleContext";
import { useThemeSettings } from "@/contexts/ThemeSettingsContext";

const statsConfig = [
  {
    title: "dashboard.stats.title.companies",
    value: "3",
    subtitle: "dashboard.stats.subtitle.companies",
    icon: "solar:chart-square-line-duotone",
  },
  {
    title: "dashboard.stats.title.projects",
    value: "8",
    subtitle: "dashboard.stats.subtitle.projects",
    icon: "solar:ribbon-star-line-duotone",
  },
  {
    title: "dashboard.stats.title.notifications",
    value: "5",
    subtitle: "dashboard.stats.subtitle.notifications",
    icon: "solar:pie-chart-2-line-duotone",
  },
  {
    title: "dashboard.stats.title.wallets",
    value: "2",
    subtitle: "dashboard.stats.subtitle.wallets",
    icon: "solar:shield-user-line-duotone",
  },
];

export function StatHighlights() {

  const [urgentNotifications] = useState(1);


  const t = useTranslations();
  const { colors, custom } = useThemeSettings();

  return (
    <Box
      sx={{
        display: "grid",
        gap: 3,
        gridTemplateColumns: {
          xs: "repeat(1, minmax(0, 1fr))",
          md: "repeat(2, minmax(0, 1fr))",
          xl: "repeat(4, minmax(0, 1fr))",
        },
      }}
    >
      {statsConfig.map((stat) => (
        <Card key={stat.title}>
          <CardContent>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="flex-start"
            >
              <Stack spacing={1}>
              <Typography variant="h5" fontWeight={700}>
                  {stat.value}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {t(stat.title)}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color:
                      stat.title === "dashboard.stats.title.notifications"
                        ? custom.response.error
                        : "success.main",
                  }}
                >
                  {stat.title === "dashboard.stats.title.notifications"
                    ? t(stat.subtitle, { number_urgent: urgentNotifications })
                    : t(stat.subtitle)}
                </Typography>
              </Stack>
              <Avatar
                sx={{
                  backgroundColor: colors.primary,
                  color: colors.background,
                  width: 48,
                  height: 48,
                }}
              >
                <Icon icon={stat.icon} width={24} height={24} />
              </Avatar>
            </Stack>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}
