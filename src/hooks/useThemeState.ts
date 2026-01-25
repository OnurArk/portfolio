import { useCallback, useState } from "react";
import {
  CustomColorKey,
  ThemeColorOverrides,
  ThemeCustomOverrides,
  ThemeMode,
} from "@/constants/theme";
import { CustomColors } from "@/constants/theme";

type StoredThemeState = {
  mode: ThemeMode;
  navWidth: number;
  colors: Record<ThemeMode, ThemeColorOverrides>;
  custom: Record<ThemeMode, ThemeCustomOverrides>;
  workingCustom?: Record<ThemeMode, ThemeCustomOverrides>;
};

const defaultState: StoredThemeState = {
  mode: "light",
  colors: {
    light: {},
    dark: {},
  },
  custom: {
    light: {},
    dark: {},
  },
  workingCustom: {
    light: {},
    dark: {},
  },
  navWidth: 260,
};

const ensureWorkingCustom = (
  working?: Record<ThemeMode, ThemeCustomOverrides>
): Record<ThemeMode, ThemeCustomOverrides> =>
  working ?? { light: {}, dark: {} };

export function useThemeState(initialState?: StoredThemeState) {
  const [state, setState] = useState<StoredThemeState>(
    initialState ?? defaultState
  );

  const setMode = useCallback(
    (mode: ThemeMode) =>
      setState((prev) => ({
        ...prev,
        mode,
      })),
    []
  );

  const updateCustomColor = useCallback(
    (section: CustomColorKey, key: string, value: string | number) =>
      setState((prev) => {
        const workingRecord = ensureWorkingCustom(prev.workingCustom);
        const workingCustom = workingRecord[prev.mode] ?? {};
        const workingSectionValues =
          (workingCustom[section] as Record<string, unknown>) ?? {};
        const shouldSyncSelectIcon =
          section === "inputs" && key === "iconColor";

        if (key.includes(".")) {
          const [nestedKey, prop] = key.split(".");
          if (!nestedKey || !prop) return prev;
          const workingNestedValues =
            (workingSectionValues[nestedKey] as Record<string, unknown>) ?? {};

          return {
            ...prev,
            workingCustom: {
              ...workingRecord,
              [prev.mode]: {
                ...workingCustom,
                [section]: {
                  ...workingSectionValues,
                  [nestedKey]: {
                    ...workingNestedValues,
                    [prop]: value,
                  },
                },
              },
            },
          };
        }

        return {
          ...prev,
          workingCustom: {
            ...workingRecord,
            [prev.mode]: {
              ...workingCustom,
              [section]: {
                ...workingSectionValues,
                [key]: value,
              },
              ...(shouldSyncSelectIcon
                ? {
                    selects: {
                      ...(workingCustom.selects as Record<string, unknown>),
                      iconColor: value,
                    },
                  }
                : {}),
            },
          },
        };
      }),
    []
  );

  const resetColors = useCallback(
    () =>
      setState((prev) => {
        const workingRecord = ensureWorkingCustom(prev.workingCustom);
        return {
          ...prev,
          colors: {
            ...prev.colors,
            [prev.mode]: {},
          },
          workingCustom: {
            ...workingRecord,
            [prev.mode]: {},
          },
        };
      }),
    []
  );

  const saveTheme = useCallback(
    () =>
      setState((prev) => {
        const working = ensureWorkingCustom(prev.workingCustom);
        return {
          ...prev,
          custom: {
            ...prev.custom,
            [prev.mode]: working[prev.mode] ?? {},
          },
        };
      }),
    []
  );

  const resetCustomSection = useCallback(
    (section: CustomColorKey) =>
      setState((prev) => {
        const working = ensureWorkingCustom(prev.workingCustom);
        const current = working[prev.mode] ?? {};
        return {
          ...prev,
          workingCustom: {
            ...working,
            [prev.mode]: {
              ...current,
              [section]: {},
            },
          },
        };
      }),
    []
  );

  const setSectionOverrides = useCallback(
    (section: CustomColorKey, values: Partial<CustomColors[CustomColorKey]>) =>
      setState((prev) => {
        const working = ensureWorkingCustom(prev.workingCustom);
        const current = working[prev.mode] ?? {};
        return {
          ...prev,
          workingCustom: {
            ...working,
            [prev.mode]: {
              ...current,
              [section]: values,
            },
          },
        };
      }),
    []
  );

  return {
    state,
    setState,
    setMode,
    updateCustomColor,
    resetColors,
    saveTheme,
    resetCustomSection,
    setSectionOverrides,
  };
}

export type { StoredThemeState };
