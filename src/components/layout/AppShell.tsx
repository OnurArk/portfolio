"use client";

import { Box } from "@mui/material";

import { AuthGuard } from "@/components/auth/AuthGuard";
import { Sidebar } from "@/components/layout/Sidebar";
import { AppBar } from "@/components/layout/AppBar";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
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
            marginLeft: { xs: "260px", md: "260px" },
            width: { xs: "calc(100% - 260px)", md: "calc(100% - 260px)" },
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          <AppBar />
          {children}
        </Box>
        </Box>
      </Box>
    </AuthGuard>
  );
}

