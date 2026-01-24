"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@mui/material/styles";
import { Icon } from "@iconify/react";
import { Box, Button, Stack, Typography } from "@mui/material";

import { NAV_ITEMS } from "@/constants/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useTranslations } from "@/contexts/LocaleContext";
import { useThemeSettings } from "@/contexts/ThemeSettingsContext";

export function Sidebar() {
const [opacityLabel, setOpacityLabel] = useState<number>(0);
const [titleLogo, setTitleLogo] = useState<"Portfolio" | "P">("Portfolio");



  const pathname = usePathname();
  const { custom, isNavOpen, setIsNavOpen , mode, navWidth} = useThemeSettings();
  const { logout } = useAuth();
  const t = useTranslations();

  const theme = useTheme();


  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    if (isNavOpen) {
      timeout = setTimeout(() => {
        setOpacityLabel(1);
        setTitleLogo("Portfolio");
      }, 100);
    } else {
      timeout = setTimeout(() => {
        setOpacityLabel(0);
        setTitleLogo("P");
      }, 0);
    }
    
    return () => clearTimeout(timeout);
  }, [isNavOpen]);

  return (
    <Box sx={{position: "fixed" , width: "fit-content",   height: "100%",
      top: 0,
      left: 0,
      zIndex: 1200, }}>
      <Box
        component="aside"
        sx={{
          width: navWidth,
          minWidth: navWidth,
          maxWidth: navWidth,
          flex: "0 0 " + navWidth + "px",
          boxShadow: `-4px 6px 24px ${custom.navbar.shadowColor}`,
          background: custom.navbar.bgColor,
          height: "100%",
          zIndex: 1200,
          overflowY: "auto",
          padding: isNavOpen ? "20px" : "10px",
          display: "flex",
          flexDirection: "column",
          userSelect: "none",
          overflowX: "hidden",
          gap: 3,
          transition: "all 0.3s ease",
        }}
      >
        <Stack direction="row" spacing={1.5} alignItems="flex-start" justifyContent="center" position={"relative"}>
        
        <Box sx={{height:"80px"}}>
          <Link href="/">
              <Typography color={theme.palette.primary.main} sx={{alignSelf: "center", fontWeight: 600 , cursor: "pointer" , transition: "all 0.4s ease",
                 ...(isNavOpen ? {marginTop: "0px", fontSize: "2.8rem"} : {marginTop: "10px", fontSize: "2.6rem" })}} >
                  {titleLogo}
                  </Typography>
          </Link>
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
                  paddingY: 1.25,
                  paddingX: 1.5,
                  borderRadius: 1.5,
                  minWidth: isNavOpen ? "auto" : "44px",
                  gap: 2,
                  color: active
                    ? custom.navbar.activeTextColor
                    : custom.navbar.textColor,
                  fontWeight: active ? 600 : 500,
                  backgroundColor: active
                    ? custom.navbar.activeBgColor
                    : "transparent",
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
                {isNavOpen ? <>
                  <Icon icon={item.icon} width={22} height={22} />
                  <Typography  sx={{whiteSpace: "nowrap", transition: "all 0.4s ease", opacity: opacityLabel,}}>{t(item.labelKey)}</Typography>
                </> :
                <Icon icon={item.icon} width={22} height={22} />
              }
              </Box>
            );
          })}
        </Stack>

        <Stack spacing={1} marginTop="auto">

         {isNavOpen ? <Button
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
              whiteSpace: "nowrap",
            }}
          >
            {t("nav.logout")}
          </Button> : 
          <Icon icon="solar:logout-3-line-duotone" width={20} height={20} onClick={logout} style={{cursor: "pointer", marginLeft: "10px", marginBottom: "16px"}}/>}
        </Stack>
      </Box>

      <Box sx={{cursor: "pointer", position: "absolute", right: "0px", top: "50%", transform: "translateY(-50%) translateX(100%)", zIndex: 1400,
       padding: "6px",
       paddingLeft: "0px",
       height: "60px",
       display: "flex",
       alignItems: "center",
       justifyContent: "center",
       bgcolor: mode === "light" ? "#c6e0f5" : "#111827",
       borderRadius: "0px 50px 50px 0px",
      }} onClick={() => setIsNavOpen(!isNavOpen)} >  
              <Icon icon="simple-line-icons:arrow-right" width={20} height={20} style={{transform: isNavOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.25s ease"}}/>
      </Box>
    </Box>
  );
}
