"use client";

import { Stack } from "@mui/material";

import { AboutMe } from "@/components/dashboard/AboutMe";
import { StatHighlights } from "@/components/dashboard/StatHighlights";
import { DashboardCharts } from "@/components/dashboard/DashboardCharts";

export function DashboardView() {
  return (
    <Stack spacing={4}>
      <AboutMe />
      <StatHighlights />
      <DashboardCharts />
    </Stack>
  );
}
