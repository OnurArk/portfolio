"use client";

import { Stack, Typography, Box } from "@mui/material";
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
    tooltip: "React",
  },
  {
    icon: "devicon:nextjs",
    tooltip: "Next.js",
  },
  {
    icon: "devicon:tailwindcss",
    tooltip: "Tailwind CSS",
  },
  {
    icon: "devicon:materialui",
    tooltip: "Material UI",
  },
  {
    icon: "logos:redux",
    tooltip: "Redux",
  },
  {
    icon: "mdi:api",
    tooltip: "REST APIs",
  },
  {
    icon: "devicon:socketio-wordmark",
    tooltip: "WebSockets",
  },
  {
    icon: "lineicons:seo-monitor",
    tooltip: "SEO",
  },
  {
    icon: "mdi:speedometer",
    tooltip: "Web Performance",
  },
  {
    icon: "mdi:git",
    tooltip: "Git",
  },
  {
    icon: "logos:docker-icon",
    tooltip: "Docker",
  },
  {
    icon: "devicon:postman",
    tooltip: "Postman",
  },
];

export function StatHighlights() {
  const t = useTranslations();
  const theme = useTheme();

  return (
    <>
      <Typography
        variant="h4"
        color={theme.palette.primary.light}
        sx={{
          alignSelf: "center",
          fontSize: { xs: "1.6rem", sm: "1.8rem", md: "2rem", lg: "2.2rem" },
        }}
      >
        {t("dashboard.stats.title")}
      </Typography>
      <Stack
        direction="row"
        sx={{
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        {skills.map((skill) => (
          <Box
            key={skill.tooltip}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              width: "fit-content",
              cursor: "pointer",
              p: 1,
              borderRadius: "10px",
              transition: "transform 0.3s ease-in-out",
              "&:hover": {
                boxShadow: `0 12px 30px ${theme.palette.primary.light}`,
              },
            }}
          >
            <Icon icon={skill.icon} width={36} height={36} />
            <Typography variant="body2" color={theme.palette.text.primary}>
              {skill.tooltip}
            </Typography>
          </Box>
        ))}
      </Stack>
    </>
  );
}
