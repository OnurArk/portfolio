"use client";

import { useState, useMemo, useCallback, memo } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Pagination,
} from "@mui/material";
import { Icon } from "@iconify/react";
import { useThemeSettings } from "@/contexts/ThemeSettingsContext";
import { useTranslations } from "@/contexts/LocaleContext";

export type TableColumn<T = Record<string, unknown>> = {
  id: string;
  label: string;
  minWidth?: number;
  align?: "left" | "right" | "center";
  render?: (value: unknown, row: T, index: number) => React.ReactNode;
};

export type TableAction<T = Record<string, unknown>> = {
  icon: string;
  label: string;
  color?: "primary" | "secondary" | "error" | "warning" | "info" | "success";
  onClick: (row: T, index: number) => void;
};

export type TableUIProps<T = Record<string, unknown>> = {
  title?: string;
  titleIcon?: string;
  data: T[];
  columns: TableColumn<T>[];
  actions?: TableAction<T>[];
  headerAction?: {
    label: string;
    icon?: string;
    onClick: () => void;
  };
  headerRender?: () => React.ReactNode;
  rowsPerPage?: number;
  getRowId?: (row: T) => string | number;
};

function TableUIComponent<T extends Record<string, unknown>>({
  title,
  titleIcon,
  data,
  columns,
  actions,
  headerAction,
  headerRender,
  rowsPerPage = 5,
  getRowId,
}: TableUIProps<T>) {
  const { colors } = useThemeSettings();
  const t = useTranslations();
  const [page, setPage] = useState(1);

  // Memoize pagination calculations
  const paginationInfo = useMemo(() => {
    const totalPages = Math.ceil(data.length / rowsPerPage);
    // Ensure page is within valid range
    const validPage = totalPages > 0 ? Math.min(Math.max(1, page), totalPages) : 1;
    const startIndex = (validPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const startItem = startIndex + 1;
    const endItem = Math.min(endIndex, data.length);
    return { totalPages, startIndex, endIndex, startItem, endItem, validPage };
  }, [data.length, page, rowsPerPage]);

  // Note: validPage is calculated in paginationInfo to ensure page is always in valid range
  // No need for useEffect - we use validPage for rendering, page state is just for user input

  const paginatedData = useMemo(() => {
    return data.slice(paginationInfo.startIndex, paginationInfo.endIndex);
  }, [data, paginationInfo.startIndex, paginationInfo.endIndex]);

  // Memoize columns and actions to prevent unnecessary re-renders
  const memoizedColumns = useMemo(() => columns, [columns]);
  const memoizedActions = useMemo(() => actions, [actions]);
  const hasActions = memoizedActions && memoizedActions.length > 0;

  const handlePageChange = useCallback(
    (_event: React.ChangeEvent<unknown>, value: number) => {
      setPage(value);
    },
    []
  );

  return (
    <Card>
      <CardContent>
        <Stack spacing={3}>
          {/* Header */}
          {headerRender ? (
            headerRender()
          ) : (
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Stack direction="row" spacing={1.5} alignItems="center">
                {titleIcon && (
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: 2,
                      backgroundColor: colors.primary,
                      display: "grid",
                      placeItems: "center",
                      color: "white",
                    }}
                  >
                    <Icon icon={titleIcon} width={20} height={20} />
                  </Box>
                )}
                {title && (
                  <Typography variant="h6" fontWeight={700}>
                    {title}
                  </Typography>
                )}
              </Stack>
              {headerAction && (
                <Button
                  variant="contained"
                  startIcon={headerAction.icon ? <Icon icon={headerAction.icon} /> : undefined}
                  onClick={headerAction.onClick}
                >
                  {headerAction.label}
                </Button>
              )}
            </Stack>
          )}

          {/* Table */}
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  {memoizedColumns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align || "left"}
                      sx={{
                        fontWeight: 600,
                        color: "text.secondary",
                        borderBottom: "1px solid",
                        borderColor: "divider",
                      }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                  {hasActions && (
                    <TableCell
                      align="right"
                      sx={{
                        fontWeight: 600,
                        color: "text.secondary",
                        borderBottom: "1px solid",
                        borderColor: "divider",
                      }}
                    >
                      {t("projects.actions")}
                    </TableCell>
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedData.length > 0 ? (
                  paginatedData.map((row, rowIndex) => {
                    const actualIndex = paginationInfo.startIndex + rowIndex;
                    const rowId = getRowId ? getRowId(row) : actualIndex;
                    return (
                      <TableRow
                        key={rowId}
                        sx={{
                          "&:hover": {
                            backgroundColor: "action.hover",
                          },
                          "&:not(:last-child)": {
                            borderBottom: "1px solid",
                            borderColor: "divider",
                          },
                        }}
                      >
                        {memoizedColumns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell
                              key={column.id}
                              align={column.align || "left"}
                              sx={{ py: 2 }}
                            >
                              {column.render
                                ? column.render(value, row, actualIndex)
                                : String(value ?? "")}
                            </TableCell>
                          );
                        })}
                        {hasActions && memoizedActions && (
                          <TableCell align="right" sx={{ py: 2 }}>
                            <Stack direction="row" spacing={1} justifyContent="flex-end">
                              {memoizedActions.map((action, actionIndex) => (
                                <IconButton
                                  key={`${actionIndex}-${action.icon}`}
                                  size="small"
                                  onClick={() => action.onClick(row, actualIndex)}
                                  sx={{
                                    color: action.color
                                      ? `${action.color}.main`
                                      : "primary.main",
                                  }}
                                  aria-label={action.label}
                                >
                                  <Icon icon={action.icon} />
                                </IconButton>
                              ))}
                            </Stack>
                          </TableCell>
                        )}
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={memoizedColumns.length + (hasActions ? 1 : 0)}
                      align="center"
                      sx={{ py: 4 }}
                    >
                      <Typography variant="body2" color="text.secondary">
                        No data available
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination */}
          {data.length > 0 && (
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              flexWrap="wrap"
              gap={2}
            >
              <Typography variant="body2" color="text.secondary">
                {t("projects.pagination.showing", {
                  start: paginationInfo.startItem,
                  end: paginationInfo.endItem,
                  total: data.length,
                  item: data.length === 1 ? t("projects.pagination.item") : t("projects.pagination.items"),
                })}
              </Typography>
              {paginationInfo.totalPages > 1 && (
                <Pagination
                  count={paginationInfo.totalPages}
                  page={paginationInfo.validPage}
                  onChange={handlePageChange}
                  color="primary"
                  shape="rounded"
                  showFirstButton
                  showLastButton
                />
              )}
            </Stack>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}

// Memoize the component to prevent unnecessary re-renders
export const TableUI = memo(TableUIComponent) as typeof TableUIComponent;
