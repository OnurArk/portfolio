"use client";

import { AppBar as MuiAppBar, Box, IconButton, Toolbar, Typography, alpha, useTheme, useMediaQuery} from "@mui/material";
import { usePathname } from "next/navigation";

import { useThemeSettings } from "@/contexts/ThemeSettingsContext";
import { useTranslations } from "@/contexts/LocaleContext";
import { NAV_ITEMS } from "@/constants/navigation";
import { Icon } from "@iconify/react";

export function AppBar() {
  const pathname = usePathname();
  const { mode, setMode, colors, setIsNavOpen , isUnderSmall} = useThemeSettings();
  const t = useTranslations();
  const theme = useTheme();
  const isLarge = useMediaQuery(theme.breakpoints.up("lg"));
  const isMd = useMediaQuery(theme.breakpoints.between("md", "lg"));
  const isSm = useMediaQuery(theme.breakpoints.between("sm", "md"));

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
    >
     
      <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center", paddingX: {xs: 0.6, sm: 1, md: 1.5, lg: 2}}}>
       <Toolbar >
         <Box  sx={{display: "flex", flexDirection: "row", alignItems: "center", gap: 1}}>
          {isUnderSmall && <Icon icon="material-symbols:menu" width={24} height={24} onClick={() => setIsNavOpen(pre => !pre)} />}
          <Typography  sx={{ fontWeight: 600, fontSize: {xs: "1.2rem", sm: "1.3rem", md: "1.4rem", lg: "1.6rem"}}}>{t(NAV_ITEMS.find((item) => item.href === pathname)?.labelKey ?? "nav.home")}</Typography>
        </Box>
      </Toolbar>

        <Box sx={{display: "flex", alignItems: "center", bgcolor: "background.default", borderRadius: 1, padding: {xs: 0.4, sm: 0.8, md: 0.9, lg: 1}, cursor: "pointer"}} onClick={toggleTheme}>
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
            width={isLarge ? 24 : isMd ? 22 : isSm ? 20 : 16}
            height={isLarge ? 24 : isMd ? 22 : isSm ? 20 : 16}
          />
        </IconButton>
        </Box>
      </Box>
    </MuiAppBar>
  );
}