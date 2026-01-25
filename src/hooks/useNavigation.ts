import { useState, useMemo } from "react";
import { useMediaQuery, useTheme } from "@mui/material";

export function useNavigation() {
  const [isNavOpen, setIsNavOpen] = useState<boolean>(false);
  const [isNavHover, setIsNavHover] = useState<boolean>(false);

  const themeHook = useTheme();
  const isUnderSmall = useMediaQuery(themeHook.breakpoints.down("sm"));

  const navWidth = useMemo(
    () => (isNavOpen || isNavHover ? 260 : 60),
    [isNavOpen, isNavHover]
  );

  return {
    isNavOpen,
    setIsNavOpen,
    isNavHover,
    setIsNavHover,
    navWidth,
    isUnderSmall,
  };
}
