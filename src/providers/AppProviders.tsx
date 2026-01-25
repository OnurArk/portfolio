"use client";

import { PropsWithChildren } from "react";

import { LocaleProvider } from "@/contexts/LocaleContext";
import { ThemeSettingsProvider } from "@/contexts/ThemeSettingsContext";

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <LocaleProvider>
      <ThemeSettingsProvider>
        {children}
      </ThemeSettingsProvider>
    </LocaleProvider>
  );
}

