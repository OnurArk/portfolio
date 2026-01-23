"use client";

import { Stack } from "@mui/material";

import { DashboardCharts } from "@/components/dashboard/DashboardCharts";
import { StatHighlights } from "@/components/dashboard/StatHighlights";

export function DashboardView() {
  return (
    <Stack spacing={4}>
      <StatHighlights />
      <DashboardCharts />
    </Stack>
  );
}
