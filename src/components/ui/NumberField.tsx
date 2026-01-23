"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";
import { InputAdornment, Stack, TextField, Typography } from "@mui/material";

type NumberFieldProps = {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  suffix?: string;
};

const COMMIT_DELAY_MS = 120;

export function NumberField({
  label,
  value,
  onChange,
  min,
  max,
  step,
  suffix,
}: NumberFieldProps) {
  const [draft, setDraft] = useState(String(value));
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setDraft(String(value));
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

  const clampValue = (num: number) => {
    let next = num;
    if (typeof min === "number") {
      next = Math.max(min, next);
    }
    if (typeof max === "number") {
      next = Math.min(max, next);
    }
    return next;
  };

  const commitValue = (raw: string) => {
    if (!raw.trim()) {
      setDraft(String(value));
      return;
    }

    const parsed = Number(raw);
    if (Number.isNaN(parsed)) {
      setDraft(String(value));
      return;
    }

    const next = clampValue(parsed);
    onChange(next);
    setDraft(String(next));
  };

  const scheduleCommit = (raw: string) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      commitValue(raw);
    }, COMMIT_DELAY_MS);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextValue = event.target.value;
    setDraft(nextValue);
    scheduleCommit(nextValue);
  };

  const handleBlur = () => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
      debounceRef.current = null;
    }
    commitValue(draft);
  };

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
      <TextField
        size="small"
        type="number"
        value={draft}
        onChange={handleChange}
        onBlur={handleBlur}
        inputProps={{ min, max, step }}
        InputProps={{
          endAdornment: suffix ? (
            <InputAdornment position="end" sx={{ fontSize: 12 }}>
              <Typography color="text.secondary" fontSize={12} fontWeight={600}>
                {suffix}
              </Typography>
            </InputAdornment>
          ) : undefined,
        }}
        sx={{
          width: 78,
          "& .MuiOutlinedInput-root": {
            borderRadius: "6px",
            padding: "2px 6px",
            bgcolor: "transparent",
            boxShadow: "none",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            border: "none",
          },
          "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
            border: "none",
          },
          "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
            {
              border: "none",
            },
          "& input": {
            padding: "6px 0",
            height: 24,
            textAlign: "center",
          },
        }}
      />
    </Stack>
  );
}
