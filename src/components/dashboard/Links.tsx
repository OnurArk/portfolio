"use client";

import { Icon } from "@iconify/react";
import { Box, Stack, Card } from "@mui/material";
import { useThemeSettings } from "@/contexts/ThemeSettingsContext";

const links = [
  {
    id: 1,
    icon: "mdi:github",
    href: "https://github.com/OnurArk",
  },
  {
    id: 2,
    icon: "mdi:linkedin",
    href: "https://www.linkedin.com/in/mehmet-onur-arik-5b589b249/",
  },
  {
    id: 3,
    icon: "bx:mail-send",
    href: "mailto:onurark11@gmail.com"
  }
];

export function Links() {
  const { mode } = useThemeSettings();

  return (
    <Box sx={{position: "relative", display: "flex", justifyContent:"center", alignItems:"center"}}>
    <Stack direction="row" spacing={2} sx={{justifyContent:"center", alignItems:"center"}}>
     {links.map((link) => (
      <Card key={link.id} sx={{width: "fit-content", p: 1.2 , cursor: "pointer"}} onClick={() => window.open(link.href, "_blank")}>
        <Icon icon={link.icon} width={36} height={36} />
      </Card>
     ))}
    </Stack>
    </Box>
  );
}