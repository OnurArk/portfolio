"use client";

import { Icon } from "@iconify/react";
import {
  Box,
  Card,
  CardContent,
  Stack,
  Typography,
  alpha,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { LoginForm } from "@/components/forms/LoginForm";
import { useAuth } from "@/contexts/AuthContext";
import { useTranslations } from "@/contexts/LocaleContext";
import { useThemeSettings } from "@/contexts/ThemeSettingsContext";

export function LoginView() {
  const { isAuthenticated, hydrated } = useAuth();
  const { colors } = useThemeSettings();
  const t = useTranslations();
  const router = useRouter();

  useEffect(() => {
    if (hydrated && isAuthenticated) {
      router.replace("/");
    }
  }, [hydrated, isAuthenticated, router]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 3,
        background: `radial-gradient(circle at top, ${alpha(
          colors.primary,
          0.2
        )}, transparent 60%)`,
      }}
    >
      <Card sx={{ maxWidth: 420, width: "100%" }}>
        <CardContent>
          <Stack spacing={3}>
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  backgroundColor: colors.primary,
                  display: "grid",
                  placeItems: "center",
                  color: colors.background,
                }}
              >
                <Icon icon="solar:shield-user-line-duotone" width={26} />
              </Box>
              <Stack>
                <Typography variant="h6" fontWeight={700}>
                  {t("auth.loginTitle")}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {t("auth.loginSubtitle")}
                </Typography>
              </Stack>
            </Stack>
            <LoginForm />
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}
