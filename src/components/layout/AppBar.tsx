"use client";

import { AppBar as MuiAppBar, Box, IconButton, Toolbar, Typography, alpha, useTheme, useMediaQuery, FormControl, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import { usePathname } from "next/navigation";

import { useThemeSettings } from "@/contexts/ThemeSettingsContext";
import { useLocale, useTranslations } from "@/contexts/LocaleContext";
import { NAV_ITEMS } from "@/constants/navigation";
import { SUPPORTED_LOCALES } from "@/translations/messages";
import { Icon } from "@iconify/react";

const LABELS: Record<string, string> = {
  en: "English",
  tr: "Türkçe",
};

export function AppBar() {
  const pathname = usePathname();
  const { mode, setMode, colors, setIsNavOpen , isUnderSmall} = useThemeSettings();
  const { locale, setLocale } = useLocale();
  const t = useTranslations();
  const theme = useTheme();
  const isLarge = useMediaQuery(theme.breakpoints.up("lg"));
  const isMd = useMediaQuery(theme.breakpoints.between("md", "lg"));
  const isSm = useMediaQuery(theme.breakpoints.between("sm", "md"));

  const toggleTheme = () => setMode(mode === "light" ? "dark" : "light");

  const handleLanguageChange = (event: SelectChangeEvent) => {
    setLocale(event.target.value as typeof locale);
  };

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

      <Box sx={{display: "flex", alignItems: "center", gap: {xs: 0.5, sm: 1, md: 1.5}}}>
        <FormControl 
          sx={{ 
            minWidth: {xs: 80, sm: 100, md: 120, lg: 140},
            bgcolor: "background.default", 
            borderRadius: 1,
            "& .MuiOutlinedInput-root": {
              height: {xs: 32, sm: 36, md: 40, lg: 44},
              fontSize: {xs: "0.75rem", sm: "0.875rem", md: "0.9rem", lg: "1rem"},
            },
            "& .MuiInputLabel-root": {
              fontSize: {xs: "0.7rem", sm: "0.8rem", md: "0.85rem", lg: "0.9rem"},
            },
            "& .MuiSelect-select": {
              padding: {xs: "6px 32px 6px 12px", sm: "8px 36px 8px 14px", md: "10px 40px 10px 16px", lg: "12px 44px 12px 18px"},
            }
          }}
        >
          <Select 
            value={locale} 
            onChange={handleLanguageChange}
          >
            {SUPPORTED_LOCALES.map((code) => (
              <MenuItem key={code} value={code}>
                {LABELS[code]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

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
      </Box>
    </MuiAppBar>
  );
}