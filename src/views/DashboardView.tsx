"use client";

import { Stack } from "@mui/material";

import { AboutMe } from "@/components/dashboard/AboutMe";
import { Links } from "@/components/dashboard/Links";
import { StatHighlights } from "@/components/dashboard/StatHighlights";
import { Projects } from "@/components/dashboard/Projects";

export function DashboardView() {
  return (
    <Stack spacing={4} sx={{paddingTop: 3}}>
      <AboutMe />
      <Links />
      <StatHighlights />
      <Projects />
    </Stack>
  );
}
