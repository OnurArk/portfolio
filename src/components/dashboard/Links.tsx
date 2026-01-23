"use client";

import { Icon } from "@iconify/react";
import { Box, Stack, Card } from "@mui/material";
import { useThemeSettings } from "@/contexts/ThemeSettingsContext";

const links = [
  {
    icon: "mdi:github",
    href: "https://github.com/OnurArk",
  },
  {
    icon: "mdi:linkedin",
    href: "https://www.linkedin.com/in/mehmet-onur-arik-5b589b249/",
  },
  {
    icon: "solar:link-line-duotone",
    href: "https://www.linkedin.com/in/your-profile",
  },
  {
    icon: "solar:link-line-duotone",
    href: "https://www.linkedin.com/in/your-profile",
  },
];

export function Links() {
  const { mode } = useThemeSettings();

  return (
    <Box sx={{display: "flex", justifyContent:"center", alignItems:"center"}}>
    <Stack direction="row" spacing={2} sx={{justifyContent:"center", alignItems:"center"}}>
     {links.map((link) => (
      <Card key={link.icon} sx={{width: "fit-content", p: 1.2 , cursor: "pointer"}} onClick={() => window.open(link.href, "_blank")}>
        <Icon icon={link.icon} width={36} height={36} />
      </Card>
     ))}
    </Stack>
    </Box>
  );
}