"use client";

import { useState, useEffect, useRef } from "react";
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Icon } from "@iconify/react";
import { TableUI, TableColumn, TableAction } from "@/components/ui/TableUI";
import { useThemeSettings } from "@/contexts/ThemeSettingsContext";
import { useTranslations } from "@/contexts/LocaleContext";
import { useProjects, type Project } from "@/hooks/useProjects";


export function LatestProjects() {
  const { colors } = useThemeSettings();
  const t = useTranslations();
  const { projects, formData, setFormData, resetFormData, addProject, deleteProject } = useProjects([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);
  const deletePendingRef = useRef<Project | null>(null);
  const open = Boolean(anchorEl);

  // Dialog kapandığında pending delete'i kontrol et
  useEffect(() => {
    if (!deleteDialogOpen && deletePendingRef.current) {
      const pending = deletePendingRef.current;
      deletePendingRef.current = null;
      // Kısa bir gecikme ile yeni dialog'u aç
      const timer = setTimeout(() => {
        setProjectToDelete(pending);
        setDeleteDialogOpen(true);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [deleteDialogOpen]);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAddNewClick = () => {
    setDialogOpen(true);
    handleClose();
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    resetFormData();
  };

  const handleSave = () => {
    addProject(formData);
    handleDialogClose();
  };

  const handleDeleteClick = (row: Project) => {
    // Eğer dialog zaten açıksa, önce kapat ve pending'e ekle
    if (deleteDialogOpen) {
      deletePendingRef.current = row;
      setDeleteDialogOpen(false);
      return;
    }
    // Dialog kapalıysa direkt aç
    setProjectToDelete(row);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (!projectToDelete) return;
    
    const projectId = projectToDelete.id;
    // Dialog'u kapat
    setDeleteDialogOpen(false);
    // State'i temizle
    setProjectToDelete(null);
    // Silme işlemini yap
    deleteProject(projectId);
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
    setProjectToDelete(null);
  };

  const columns: TableColumn<Project>[] = [
    {
      id: "name",
      label: t("projects.columns.name"),
      render: (value, row) => (
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: 2,
              backgroundColor: `${row.iconColor}15`,
              display: "grid",
              placeItems: "center",
              color: row.iconColor,
            }}
          >
            <Icon icon={row.icon} width={20} height={20} />
          </Box>
          <Typography variant="body2" fontWeight={500}>
            {row.name}
          </Typography>
        </Stack>
      ),
    },
    {
      id: "company",
      label: t("projects.columns.company"),
      render: (value, row) => (
        <Chip
          label={row.company}
          size="small"
          sx={{
            backgroundColor: `${row.companyColor}15`,
            color: row.companyColor,
            fontWeight: 500,
          }}
        />
      ),
    },
    {
      id: "members",
      label: t("projects.columns.members"),
      render: (value) => (
        <Chip
          label={`${value} ${t("projects.columns.members").toLowerCase()}`}
          size="small"
          sx={{
            backgroundColor: `${colors.primary}15`,
            color: colors.primary,
            fontWeight: 500,
          }}
        />
      ),
    },
    {
      id: "createdDate",
      label: t("projects.columns.createdDate"),
      render: (_value, row) => (
        <Typography variant="body2" color="text.secondary">
          {row.createdDate}
        </Typography>
      ),
    },
  ];

  const actions: TableAction<Project>[] = [
    {
      icon: "solar:eye-line-duotone",
      label: t("projects.actions.view"),
      color: "primary",
      onClick: (row) => {
        console.log("View project:", row.id);
      },
    },
    {
      icon: "solar:pen-line-duotone",
      label: t("projects.actions.edit"),
      color: "secondary",
      onClick: (row) => {
        console.log("Edit project:", row.id);
      },
    },
    {
      icon: "solar:trash-bin-trash-line-duotone",
      label: t("projects.actions.delete"),
      color: "error",
      onClick: (row) => {
        handleDeleteClick(row);
      },
    },
  ];

  return (
    <>
    <TableUI
      data={projects}
      columns={columns}
      actions={actions}
      headerRender={() => (
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack direction="row" spacing={1.5} alignItems="center">
            <IconButton
              onClick={handleClick}
              sx={{
                width: 40,
                height: 40,
                borderRadius: 2,
                backgroundColor: colors.primary,
                color: "white",
                "&:hover": {
                  backgroundColor: colors.primary,
                  opacity: 0.9,
                },
              }}
            >
              <Icon icon="solar:add-circle-line-duotone" width={20} height={20} />
            </IconButton>
            <Typography variant="h6" fontWeight={700}>
              {t("projects.title")}
            </Typography>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
            >
              <MenuItem onClick={handleAddNewClick}>
                <Icon icon="solar:document-add-line-duotone" width={20} style={{ marginRight: 8 }} />
                {t("projects.menu.addNew")}
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Icon icon="solar:import-line-duotone" width={20} style={{ marginRight: 8 }} />
                {t("projects.menu.import")}
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Icon icon="solar:file-text-line-duotone" width={20} style={{ marginRight: 8 }} />
                {t("projects.menu.useTemplate")}
              </MenuItem>
            </Menu>
          </Stack>
          <Button
            variant="contained"
            startIcon={<Icon icon="solar:list-check-line-duotone" />}
            onClick={() => {
              console.log("View all projects");
            }}
          >
            {t("projects.allProjects")}
          </Button>
        </Stack>
      )}
      rowsPerPage={5}
      getRowId={(row) => row.id}
    />
    <Dialog
      open={dialogOpen}
      onClose={handleDialogClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" fontWeight={700}>
            {t("projects.menu.addNew")}
          </Typography>
          <IconButton onClick={handleDialogClose} size="small">
            <Icon icon="solar:close-circle-line-duotone" width={20} />
          </IconButton>
        </Stack>
      </DialogTitle>
      <DialogContent>
        <Stack spacing={3} sx={{ mt: 1 }}>
          <TextField
            label={t("projects.columns.name")}
            fullWidth
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <TextField
            label={t("projects.columns.company")}
            fullWidth
            required
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
          />
          <TextField
            label={t("projects.columns.members")}
            type="number"
            fullWidth
            required
            inputProps={{ min: 1 }}
            value={formData.members}
            onChange={(e) => setFormData({ ...formData, members: e.target.value })}
          />
          <TextField
            label={t("projects.columns.createdDate")}
            type="date"
            fullWidth
            required
            InputLabelProps={{ shrink: true }}
            value={formData.createdDate}
            onChange={(e) => setFormData({ ...formData, createdDate: e.target.value })}
          />
        </Stack>
      </DialogContent>
      <DialogActions sx={{ p: 2, pt: 1 }}>
        <Button onClick={handleDialogClose}>
          {t("settings.theme.cancel")}
        </Button>
        <Button
          variant="contained"
          onClick={handleSave}
          disabled={!formData.name || !formData.company || !formData.members}
        >
          {t("settings.theme.save")}
        </Button>
      </DialogActions>
    </Dialog>
    <Dialog
      open={deleteDialogOpen}
      onClose={handleDeleteDialogClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" fontWeight={700}>
            {t("projects.actions.delete")}
          </Typography>
          <IconButton onClick={handleDeleteDialogClose} size="small">
            <Icon icon="solar:close-circle-line-duotone" width={20} />
          </IconButton>
        </Stack>
      </DialogTitle>
      <DialogContent>
        <Typography variant="body1">
          {projectToDelete && t("projects.actions.deleteConfirm", { name: projectToDelete.name })}
        </Typography>
      </DialogContent>
      <DialogActions sx={{ p: 2, pt: 1 }}>
        <Button onClick={handleDeleteDialogClose}>
          {t("settings.theme.cancel")}
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={handleDeleteConfirm}
        >
          {t("projects.actions.delete")}
        </Button>
      </DialogActions>
    </Dialog>
    </>
  );
}
