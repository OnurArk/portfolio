"use client";

import { Stack,useMediaQuery, useTheme } from "@mui/material";

import { AboutMe } from "@/components/dashboard/AboutMe";
import { Links } from "@/components/dashboard/Links";
import { StatHighlights } from "@/components/dashboard/StatHighlights";
import { Projects } from "@/components/dashboard/Projects";

export function DashboardView() {
  const theme = useTheme();

  const isLarge = useMediaQuery(theme.breakpoints.up("lg"));
  const isMd = useMediaQuery(theme.breakpoints.between("md", "lg"));
  const isSm = useMediaQuery(theme.breakpoints.between("sm", "md"));

  return (
    <Stack spacing={4} sx={{paddingTop: 3}}>
      <AboutMe isLarge={isLarge} isMd={isMd} isSm={isSm} />
      <Links />
      <StatHighlights />
      <Projects />
    </Stack>
  );
}
