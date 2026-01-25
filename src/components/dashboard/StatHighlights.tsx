"use client";

import {
  Stack,
  Typography,
  Box,
  Tooltip,
} from "@mui/material";
import { useTranslations } from "@/contexts/LocaleContext";
import { useTheme } from "@mui/material/styles";
import { Icon } from "@iconify/react";

type Skill = {
  icon: string;
  tooltip: string;
};

const skills: Skill[] = [
  {
    icon: "vscode-icons:file-type-js-official",
    tooltip: "JavaScript (ES6+)",
  },
  {
    icon: "devicon:typescript",
    tooltip: "TypeScript",
  },
  {
    icon: "devicon:reactnative",
    tooltip: "React.js",
  },
  {
    icon: "devicon:nextjs",
    tooltip: "Next.js",
  },
  {
    icon: "vscode-icons:file-type-preact",
    tooltip: "Preact",
  },
  {
    icon: "devicon:tailwindcss",
    tooltip: "Tailwind CSS",
  },
  {
    icon: "skill-icons:css",
    tooltip: "CSS3",
  },
  {
    icon: "mdi:github",
    tooltip: "GitHub",
  },  
  {
    icon: "logos:docker-icon",
    tooltip: "Docker",
  },  
];

export function StatHighlights() {
  const t = useTranslations();
  const theme = useTheme();

  return (
    <>
    <Typography variant="h4" color={theme.palette.primary.light} sx={{ alignSelf: "center" , fontSize: {xs: "1.6rem", sm: "1.8rem", md: "2rem", lg: "2.2rem"}}}>
      {t("dashboard.stats.title")}
    </Typography>
   <Stack direction="row"  sx={{justifyContent:"center", alignItems:"center", flexWrap: "wrap", gap: 2}}>
      {skills.map((skill) => (   
        <Tooltip key={skill.tooltip} title={skill.tooltip} arrow>
          <Box 
            sx={{
              width: "fit-content", 
              cursor: "pointer",
              p: 1,
              pb: 0,
              borderRadius: "10px",
              transition: "transform 0.3s ease-in-out",
              "&:hover": {
                boxShadow: `0 12px 30px ${theme.palette.primary.light}`,
              }
            }} 
          >
            <Icon icon={skill.icon} width={36} height={36} />
          </Box>
        </Tooltip>
      ))}
    </Stack>
    </>
   
  );
}
