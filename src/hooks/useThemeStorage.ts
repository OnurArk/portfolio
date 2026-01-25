import { useEffect, useState, startTransition } from "react";
import { useMediaQuery } from "@mui/material";
import {
  THEME_STORAGE_KEY,
  ThemeMode,
} from "@/constants/theme";
import { safeGetItem, safeSetItem } from "@/lib/storage";
import { StoredThemeState } from "./useThemeState";

const VALID_MODES: ThemeMode[] = ["light", "dark"];

const sanitizeState = (value: unknown): StoredThemeState | null => {
  if (!value || typeof value !== "object") return null;
  const candidate = value as Partial<StoredThemeState>;
  if (!candidate.mode || !VALID_MODES.includes(candidate.mode)) {
    return null;
  }
  return {
    mode: candidate.mode,
    colors: {
      light: candidate.colors?.light ?? {},
      dark: candidate.colors?.dark ?? {},
    },
    custom: {
      light: candidate.custom?.light ?? {},
      dark: candidate.custom?.dark ?? {},
    },
    workingCustom: {
      light: candidate.workingCustom?.light ?? candidate.custom?.light ?? {},
      dark: candidate.workingCustom?.dark ?? candidate.custom?.dark ?? {},
    },
    navWidth: candidate.navWidth ?? 260,
  };
};

export function useThemeStorage(
  state: StoredThemeState,
  setState: React.Dispatch<React.SetStateAction<StoredThemeState>>
) {
  const prefersDark = useMediaQuery("(prefers-color-scheme: dark)");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const storedRaw = safeGetItem<StoredThemeState | null>(
      THEME_STORAGE_KEY,
      null
    );
    const stored = sanitizeState(storedRaw);
    if (stored) {
      startTransition(() => setState(stored));
    } else if (prefersDark) {
      startTransition(() => setState((prev) => ({ ...prev, mode: "dark" })));
    }
    startTransition(() => setHydrated(true));
  }, [prefersDark, setState]);

  useEffect(() => {
    if (!hydrated) return;
    safeSetItem(THEME_STORAGE_KEY, state);
  }, [state, hydrated]);

  return { hydrated };
}
