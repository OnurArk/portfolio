"use client";

import { Box } from "@mui/material";

import { Sidebar } from "@/components/layout/Sidebar";
import { AppBar } from "@/components/layout/AppBar";
import { useThemeSettings } from "@/contexts/ThemeSettingsContext";

export function AppShell({ children }: { children: React.ReactNode }) {
  const { navWidth, isUnderSmall } = useThemeSettings();

const width = isUnderSmall ? 0 : navWidth;

  return (
    
      <Box
        sx={{
          display: "flex",
          minHeight: "100vh",
          width: "100%",
          backgroundColor: "background.default",
        }}
      >
        <Sidebar />
        <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            padding: { xs: 3, md: 5 },
            maxWidth: "1800px",
            marginLeft: { xs: `${width}px`, md: `${width}px` },
            width: { xs: `calc(100% - ${width}px)`, md: `calc(100% - ${width}px)` },
            display: "flex",
            flexDirection: "column",
            transition: "all 0.3s ease",
            gap: 4,
          }}
        >
          <AppBar />
          {children}
        </Box>
        </Box>
      </Box>
   
  );
}

