"use client";

import { AppBar as MuiAppBar, Box, IconButton, Toolbar, Typography, alpha } from "@mui/material";
import { usePathname } from "next/navigation";

import { useThemeSettings } from "@/contexts/ThemeSettingsContext";
import { useTranslations } from "@/contexts/LocaleContext";
import { NAV_ITEMS } from "@/constants/navigation";
import { Icon } from "@iconify/react";

export function AppBar() {
  const pathname = usePathname();
  const { mode, setMode, colors } = useThemeSettings();
  const t = useTranslations();

  const toggleTheme = () => setMode(mode === "light" ? "dark" : "light");

  return (
    <MuiAppBar
      component="header"
      position="static"
      sx={{
        background: `linear-gradient(135deg, ${alpha(
          colors.primary,
          0.16
        )}, ${alpha(colors.primary, 0.4)})`,
        boxShadow: "none",
        color: colors.text,
        userSelect: "none",
      }}
    ><Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center", paddingX: 2}}>
      <Toolbar >
        <Box  sx={{display: "flex", flexDirection: "column"}}>
          <Typography variant="h6">{t(NAV_ITEMS.find((item) => item.href === pathname)?.labelKey ?? "nav.home")}</Typography>
          <Typography  color="text.secondary">{t(NAV_ITEMS.find((item) => item.href === pathname)?.subTitleKey ?? "nav.home.subtitle")}</Typography>
        </Box>
      </Toolbar>

<Box sx={{display: "flex", alignItems: "center", bgcolor: "background.default", borderRadius: 1, padding: 1, cursor: "pointer"}} onClick={toggleTheme}>
      <IconButton
      
          aria-label={t("nav.toggleTheme")}
          sx={{ marginLeft: "auto" }}
        >
          <Icon
            icon={
              mode === "light"
                ? "solar:moon-line-duotone"
                : "solar:sun-2-line-duotone"
            }
          />
        </IconButton>
        </Box>
      </Box>
    </MuiAppBar>
  );
}