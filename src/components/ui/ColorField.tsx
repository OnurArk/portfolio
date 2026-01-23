"use client";

import { useEffect, useRef, useState } from "react";
import { Stack, TextField, Typography, Box, Popover } from "@mui/material";
import { Alpha, Saturation, Hue } from "@uiw/react-color";
import {
  hexToHsva,
  hsvaToRgba,
  rgbaToHsva,
  HsvaColor,
} from "@uiw/color-convert";

type ColorFieldProps = {
  label: string;
  value: string; // Supports hex, rgb(), rgba() formats
  onChange: (value: string) => void;
};

const COMMIT_DELAY_MS = 120;

// Helper functions for color format conversion
const parseColorValue = (value: string) => {
  try {
    // Handle different color formats
    if (value.startsWith("#")) {
      return hexToHsva(value);
    } else if (value.startsWith("rgb(") || value.startsWith("rgba(")) {
      // Extract rgba values from string like "rgba(255, 0, 0, 0.5)"
      const match = value.match(
        /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/
      );
      if (match) {
        const r = parseInt(match[1]);
        const g = parseInt(match[2]);
        const b = parseInt(match[3]);
        const a = match[4] ? parseFloat(match[4]) : 1;
        return rgbaToHsva({ r, g, b, a });
      }
    }
    // Default fallback
    return hexToHsva("#3788d8");
  } catch {
    console.warn("Failed to parse color value:", value);
    return hexToHsva("#3788d8");
  }
};

const formatColorValue = (hsva: HsvaColor) => {
  const rgba = hsvaToRgba(hsva);
  return `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`;
};

export function ColorField({ label, value, onChange }: ColorFieldProps) {
  const [hsva, setHsva] = useState<HsvaColor>(() => parseColorValue(value));
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    setHsva(parseColorValue(value));
  }, [value]);

  useEffect(
    () => () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
        debounceRef.current = null;
      }
    },
    []
  );

  const scheduleCommit = (newHsva: HsvaColor) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      const colorValue = formatColorValue(newHsva);
      onChange(colorValue);
    }, COMMIT_DELAY_MS);
  };

  const handleColorChange = (newHsva: HsvaColor) => {
    setHsva(newHsva);
    scheduleCommit(newHsva);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
      debounceRef.current = null;
    }
    onChange(formatColorValue(hsva));
  };

  const rgba = hsvaToRgba(hsva);
  const displayColor = formatColorValue(hsva);

  return (
    <Stack spacing={0.5} alignItems="center">
      <Typography
        color="text.secondary"
        fontWeight={600}
        sx={{
          fontSize: 12,
          textAlign: "center",
        }}
      >
        {label}
      </Typography>
      <Box
        onClick={handleClick}
        sx={{
          width: 74,
          height: 42,
          borderRadius: 2,
          padding: "4px",
          bgcolor: "background.paper",
          boxShadow: "0 4px 10px rgba(15, 23, 42, 0.08)",
          cursor: "pointer",
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "100%",
            borderRadius: 1,
            background: displayColor,
            backgroundImage: `
              linear-gradient(45deg, #ccc 25%, transparent 25%),
              linear-gradient(-45deg, #ccc 25%, transparent 25%),
              linear-gradient(45deg, transparent 75%, #ccc 75%),
              linear-gradient(-45deg, transparent 75%, #ccc 75%)
            `,
            backgroundSize: "8px 8px",
            backgroundPosition: "0 0, 0 4px, 4px -4px, -4px 0px",
            "&::before": {
              content: '""',
              display: "block",
              width: "100%",
              height: "100%",
              borderRadius: 1,
              background: displayColor,
            },
          }}
        />
      </Box>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Box sx={{ p: 2, width: 280 }}>
          {/* Color Saturation */}
          <Box sx={{ mb: 2, position: "relative" }}>
            <Saturation
              hsva={hsva}
              onChange={handleColorChange}
              style={{ width: "100%", height: 150 }}
            />
          </Box>

          {/* Hue Slider */}
          <Box sx={{ mb: 2 }}>
            <Hue
              hue={hsva.h}
              onChange={(newHue) => handleColorChange({ ...hsva, ...newHue })}
              style={{ width: "100%", height: 12 }}
            />
          </Box>

          {/* Alpha Slider */}
          <Box sx={{ mb: 2 }}>
            <Alpha
              hsva={hsva}
              onChange={(newAlpha) =>
                handleColorChange({ ...hsva, ...newAlpha })
              }
              style={{ width: "100%", height: 12 }}
            />
          </Box>

          {/* RGBA Input Fields */}
          <Box
            sx={{ display: "flex", gap: 1, justifyContent: "space-between" }}
          >
            <Stack spacing={0.5} alignItems="center">
              <Typography variant="caption" color="text.secondary">
                R
              </Typography>
              <TextField
                size="small"
                value={rgba.r}
                onChange={(e) => {
                  const r = Math.max(
                    0,
                    Math.min(255, parseInt(e.target.value) || 0)
                  );
                  const newRgba = { ...rgba, r };
                  handleColorChange(rgbaToHsva(newRgba));
                }}
                sx={{ width: 50 }}
                inputProps={{ style: { textAlign: "center", fontSize: 12 } }}
              />
            </Stack>
            <Stack spacing={0.5} alignItems="center">
              <Typography variant="caption" color="text.secondary">
                G
              </Typography>
              <TextField
                size="small"
                value={rgba.g}
                onChange={(e) => {
                  const g = Math.max(
                    0,
                    Math.min(255, parseInt(e.target.value) || 0)
                  );
                  const newRgba = { ...rgba, g };
                  handleColorChange(rgbaToHsva(newRgba));
                }}
                sx={{ width: 50 }}
                inputProps={{ style: { textAlign: "center", fontSize: 12 } }}
              />
            </Stack>
            <Stack spacing={0.5} alignItems="center">
              <Typography variant="caption" color="text.secondary">
                B
              </Typography>
              <TextField
                size="small"
                value={rgba.b}
                onChange={(e) => {
                  const b = Math.max(
                    0,
                    Math.min(255, parseInt(e.target.value) || 0)
                  );
                  const newRgba = { ...rgba, b };
                  handleColorChange(rgbaToHsva(newRgba));
                }}
                sx={{ width: 50 }}
                inputProps={{ style: { textAlign: "center", fontSize: 12 } }}
              />
            </Stack>
            <Stack spacing={0.5} alignItems="center">
              <Typography variant="caption" color="text.secondary">
                A
              </Typography>
              <TextField
                size="small"
                value={Math.round(rgba.a * 100)}
                onChange={(e) => {
                  const a =
                    Math.max(0, Math.min(100, parseInt(e.target.value) || 0)) /
                    100;
                  const newRgba = { ...rgba, a };
                  handleColorChange(rgbaToHsva(newRgba));
                }}
                sx={{ width: 50 }}
                inputProps={{ style: { textAlign: "center", fontSize: 12 } }}
              />
            </Stack>
          </Box>
        </Box>
      </Popover>
    </Stack>
  );
}
