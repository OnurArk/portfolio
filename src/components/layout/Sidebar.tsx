"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@iconify/react";
import { Box, Button, Stack, Typography } from "@mui/material";

import { NAV_ITEMS } from "@/constants/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useTranslations } from "@/contexts/LocaleContext";
import { useThemeSettings } from "@/contexts/ThemeSettingsContext";

export function Sidebar() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const pathname = usePathname();
  const { custom, colors } = useThemeSettings();
  const { logout } = useAuth();
  const t = useTranslations();


  return (
    <Box
      component="aside"
      sx={{
        width: 260,
        minWidth: 260,
        maxWidth: 260,
        flex: "0 0 260px",
        boxShadow: `-4px 6px 24px ${custom.navbar.shadowColor}`,
        background: custom.navbar.bgColor,
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1200,
        overflowY: "auto",
        padding: 3,
        display: "flex",
        flexDirection: "column",
        userSelect: "none",
        gap: 3,
      }}
    >
      <Stack direction="row" spacing={1.5} alignItems="center">
        <Box sx={{cursor: "pointer"}} onClick={() => setIsNavOpen(!isNavOpen)} >
          {
            isNavOpen ? (
              <Icon icon="material-symbols:close" width={24} height={24} />
            ) : (
              <Icon icon="radix-icons:hamburger-menu" width={24} height={24} />
            )
          }
        </Box>
        
      </Stack>

      <Stack component="nav" spacing={1}>
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.href;
          return (
            <Box
              key={item.href}
              component={Link}
              href={item.href}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                paddingY: 1.25,
                paddingX: 1.5,
                borderRadius: 1.5,
                color: active
                  ? custom.navbar.activeTextColor
                  : custom.navbar.textColor,
                fontWeight: active ? 600 : 500,
                backgroundColor: active
                  ? custom.navbar.activeBgColor
                  : "transparent",
                transition: "all 0.2s ease",
                "&:hover": {
                  backgroundColor: active
                    ? custom.navbar.activeBgColor
                    : custom.navbar.hoverBgColor,
                  color: active
                    ? custom.navbar.activeTextColor
                    : custom.navbar.hoverTextColor,
                },
              }}
            >
              <Icon icon={item.icon} width={22} height={22} />
              {t(item.labelKey)}
            </Box>
          );
        })}
      </Stack>

      <Stack spacing={1} marginTop="auto">
 
        <Button
          variant="text"
          color="inherit"
          onClick={logout}
          startIcon={<Icon icon="solar:logout-3-line-duotone" />}
          sx={{
            justifyContent: "flex-start",
            color: custom.navbar.textColor,
            "&:hover": {
              color: custom.navbar.hoverTextColor,
              backgroundColor: custom.navbar.hoverBgColor,
            },
          }}
        >
          {t("nav.logout")}
        </Button>
      </Stack>
    </Box>
  );
}
