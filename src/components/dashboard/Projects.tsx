"use client";

import { Typography } from "@mui/material";
import { useTranslations } from "@/contexts/LocaleContext";
import { useTheme } from "@mui/material/styles";
import { ProjectCard } from "./projects/ProjectCard";

const projects = [
  {
    description: "Project 1",
    images: ["/images/project1.png", "/images/project2.png"],
  },
];

export function Projects() {
  const t = useTranslations();
  const theme = useTheme();

  return (
    <>
       <Typography variant="h4" color={theme.palette.primary.light} sx={{ alignSelf: "center" }}>
      {t("dashboard.projects.title")}
    </Typography>
    {projects.map((project) => (
      <ProjectCard key={project.description} description={project.description} images={project.images} />
    ))}
    </>
  );
}