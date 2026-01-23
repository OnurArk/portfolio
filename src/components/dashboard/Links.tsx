"use client";

import { Icon } from "@iconify/react";
import { Box, Stack, Card } from "@mui/material";
import { useThemeSettings } from "@/contexts/ThemeSettingsContext";

export function Links() {
  const { mode } = useThemeSettings();

  return (
    <Box sx={{display: "flex", justifyContent:"center", alignItems:"center"}}>
    <Stack direction="row" spacing={2} sx={{justifyContent:"center", alignItems:"center"}}>
    <Card sx={{width: "fit-content", p: 2 }}>
             <Icon icon="solar:link-line-duotone" width={24} height={24} />
       </Card>
    <Card sx={{width: "fit-content", p: 2 }}>
             <Icon icon="solar:link-line-duotone" width={24} height={24} />
      </Card>
    <Card sx={{width: "fit-content", p: 2 }}>
           <Icon icon="solar:link-line-duotone" width={24} height={24} />
      </Card>
      <Card sx={{width: "fit-content", p: 2 }}>
           <Icon icon="solar:link-line-duotone" width={24} height={24} />
      </Card>
    </Stack>
    </Box>
  );
}