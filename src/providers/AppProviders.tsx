"use client";

import { PropsWithChildren } from "react";

import { AuthProvider } from "@/contexts/AuthContext";
import { LocaleProvider } from "@/contexts/LocaleContext";
import { ThemeSettingsProvider } from "@/contexts/ThemeSettingsContext";

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <LocaleProvider>
      <ThemeSettingsProvider>
        <AuthProvider>{children}</AuthProvider>
      </ThemeSettingsProvider>
    </LocaleProvider>
  );
}

