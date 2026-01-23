"use client";

import { PropsWithChildren, useEffect } from "react";
import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

import { useAuth } from "@/contexts/AuthContext";
import { useTranslations } from "@/contexts/LocaleContext";

export function AuthGuard({ children }: PropsWithChildren) {
  const { isAuthenticated, hydrated } = useAuth();
  const router = useRouter();
  const t = useTranslations();

  useEffect(() => {
    if (hydrated && !isAuthenticated) {
      router.replace("/login");
    }
  }, [hydrated, isAuthenticated, router]);

  if (!hydrated || !isAuthenticated) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Stack spacing={2} alignItems="center">
          <CircularProgress />
          <Typography variant="body2" color="text.secondary">
            {t("general.loading")}
          </Typography>
        </Stack>
      </Box>
    );
  }

  return children;
}

