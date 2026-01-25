"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@mui/material/styles";
import { Icon } from "@iconify/react";
import { Box, Stack, Typography } from "@mui/material";

import { NAV_ITEMS } from "@/constants/navigation";
import { useTranslations } from "@/contexts/LocaleContext";
import { useThemeSettings } from "@/contexts/ThemeSettingsContext";

export function Sidebar() {
const [opacityLabel, setOpacityLabel] = useState<number>(0);
const [titleLogo, setTitleLogo] = useState<"Portfolio" | "P">("Portfolio");



  const pathname = usePathname();
  const {mode, custom, isNavOpen, setIsNavOpen ,navWidth, isNavHover, setIsNavHover, isUnderSmall} = useThemeSettings();
  const t = useTranslations();

  const theme = useTheme();

  const isFullSize = isNavOpen || isNavHover;


  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    if (isNavOpen || isNavHover) {
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
  }, [isNavOpen, isNavHover]);

  return (
    <>
      <Box
        component="aside"
        sx={{
          width: navWidth,
          minWidth: navWidth,
          maxWidth: navWidth,
          height: "100%",
          position: "fixed" , 
          top: 0,
          left: 0,
          zIndex: 1200,
          flex: "0 0 " + navWidth + "px",
          boxShadow: `-4px 6px 24px ${custom.navbar.shadowColor}`,
          background: custom.navbar.bgColor,
          overflowY: "auto",
          padding: isFullSize ? "20px" : "10px",
          display: "flex",
          flexDirection: "column",
          userSelect: "none",
          overflowX: "hidden",
          gap: 3,
          transition: "all 0.3s ease",
          ...(isUnderSmall && !isNavOpen && {
            display: "none",
          }),
        }}
        onMouseEnter={() => !isNavOpen && setIsNavHover(true)}
        onMouseLeave={() => !isNavOpen && setIsNavHover(false)}
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

      {!isUnderSmall && <Box sx={{cursor: "pointer", position: "absolute", right: "-10px", top: "50%", transform: "translateY(-50%)", zIndex: 1400,
     
      }} onClick={() => setIsNavOpen(!isNavOpen)} >  
             {isNavOpen &&  <Icon icon="fluent:radio-button-16-filled" width={24} height={24}/>  }
             {!isNavOpen && isNavHover && <Icon icon="fluent:radio-button-16-regular" width={24} height={24}/>}
      </Box>}
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
                  minWidth: isFullSize ? "auto" : "44px",
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
                {isFullSize ? <>
                  <Icon icon={item.icon} width={22} height={22} />
                  <Typography  sx={{whiteSpace: "nowrap", transition: "all 0.4s ease", opacity: opacityLabel,}}>{t(item.labelKey)}</Typography>
                </> :
                <Icon icon={item.icon} width={22} height={22} />
              }
              </Box>
            );
          })}
        </Stack>
      </Box>

    {isUnderSmall && isNavOpen && (
      <Box sx={{position: "fixed", inset: 0,  backgroundColor: mode === "light" ? "rgba(0, 0, 0, 0.5)" : "rgba(255, 255, 255, 0.5)", opacity: 0.5, zIndex: 900}} onClick={() => setIsNavOpen(false)} />
    )}

      </>
    
  );
}
