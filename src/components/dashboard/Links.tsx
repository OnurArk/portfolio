"use client";

import { Icon } from "@iconify/react";
import { Box, Stack, Card, alpha } from "@mui/material";
import { useThemeSettings } from "@/contexts/ThemeSettingsContext";



export function Links() {
  const { mode } = useThemeSettings();

  const links = [
    {
      id: 1,
      icon: "mdi:github",
      href: "https://github.com/OnurArk",
      color: mode === "light" ? "#dee056" : "#f1fba9"
    },
    {
      id: 2,
      icon: "mdi:linkedin",
      href: "https://www.linkedin.com/in/mehmet-onur-arik-5b589b249/",
      color: mode === "light" ? "#0077B5" : "#05a2f6"
    },
    {
      id: 3,
      icon: "bx:mail-send",
      href: "mailto:onurark11@gmail.com",
      color: mode === "light" ? "#D44638" : "#D44638"
    },
    {
      id: 4,
      icon: "mdi:file-pdf-box",
      href: "/CV.pdf",
      color: mode === "light" ? "#DC143C" : "#FF6B6B"
    }
  ];

  return (
    <Box sx={{position: "relative", display: "flex", justifyContent:"center", alignItems:"center"}}>
    <Stack direction="row"  sx={{justifyContent:"center", alignItems:"center", flexWrap: "wrap", gap: 2}}>
     {links.map((link) => (
      <Card 
        key={link.id} 
        sx={{
          width: "fit-content", 
          px: 1.2,
          py: 0.5,
          cursor: "pointer",
          transition: "transform 0.3s ease-in-out",
          "&:hover": {
            transform: "translateY(-8px)",
            boxShadow: `0 12px 30px ${alpha(link.color, 0.2)}`,
          }
        }} 
        onClick={() => window.open(link.href, "_blank")}
      >
        <Icon icon={link.icon} width={36} height={36} />
      </Card>
     ))}
    </Stack>
    </Box>
  );
}