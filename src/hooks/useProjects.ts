"use client";

import { useState, useEffect, useRef, startTransition } from "react";
import { safeGetItem, safeSetItem } from "@/lib/storage";

export type Project = {
  id: string;
  name: string;
  icon: string;
  iconColor: string;
  company: string;
  companyColor: string;
  members: number;
  createdDate: string;
};

const STORAGE_KEY = "latest_projects";

const ICONS = [
  "solar:rocket-2-line-duotone",
  "solar:shield-check-line-duotone",
  "solar:cloud-storage-line-duotone",
  "solar:brush-2-line-duotone",
  "solar:database-line-duotone",
  "solar:code-2-line-duotone",
  "solar:wallet-money-line-duotone",
  "solar:chart-2-line-duotone",
  "solar:letter-line-duotone",
  "solar:users-group-two-rounded-line-duotone",
  "solar:box-line-duotone",
  "solar:shop-2-line-duotone",
  "solar:document-text-line-duotone",
  "solar:settings-line-duotone",
  "solar:videocamera-record-line-duotone",
  "solar:share-line-duotone",
  "solar:bell-ringing-line-duotone",
  "solar:folder-with-files-line-duotone",
  "solar:graph-up-line-duotone",
  "solar:chat-round-line-duotone",
  "solar:calendar-mark-line-duotone",
  "solar:magnifer-line-duotone",
  "solar:server-path-line-duotone",
];

const ICON_COLORS = [
  "#8b5cf6",
  "#ec4899",
  "#06b6d4",
  "#f97316",
  "#64748b",
  "#6366f1",
  "#10b981",
  "#f59e0b",
  "#ef4444",
];

function getRandomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

export type ProjectFormData = {
  name: string;
  company: string;
  members: string;
  createdDate: string;
};

const initialFormData: ProjectFormData = {
  name: "",
  company: "",
  members: "",
  createdDate: new Date().toISOString().split("T")[0],
};

export function useProjects(initialProjects: Project[] = []) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [formData, setFormData] = useState<ProjectFormData>(initialFormData);
  const initialProjectsRef = useRef(initialProjects);
  const hasInitializedRef = useRef(false);

  // Load from localStorage on mount only
  useEffect(() => {
    if (hasInitializedRef.current) return;
    hasInitializedRef.current = true;

    const stored = safeGetItem<Project[]>(STORAGE_KEY, []);
    if (stored.length > 0) {
      // Normalize: ensure companyColor matches iconColor
      const normalized = stored.map((project) => ({
        ...project,
        companyColor: project.iconColor,
      }));
      startTransition(() => {
        setProjects(normalized);
      });
      // Update localStorage with normalized data
      safeSetItem(STORAGE_KEY, normalized);
    } else if (initialProjectsRef.current.length > 0) {
      // First time - save initial data
      safeSetItem(STORAGE_KEY, initialProjectsRef.current);
      startTransition(() => {
        setProjects(initialProjectsRef.current);
      });
    }
  }, []);

  const addProject = (projectData: Omit<ProjectFormData, "createdDate"> & { createdDate?: string }) => {
    if (!projectData.name || !projectData.company || !projectData.members) {
      return;
    }

    const iconColor = getRandomItem(ICON_COLORS);
    const newProject: Project = {
      id: Date.now().toString(),
      name: projectData.name,
      icon: getRandomItem(ICONS),
      iconColor: iconColor,
      company: projectData.company,
      companyColor: iconColor, // Company color same as project name color
      members: parseInt(projectData.members, 10),
      createdDate: new Date(projectData.createdDate || new Date().toISOString()).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    };

    const updatedProjects = [newProject, ...projects];
    setProjects(updatedProjects);
    safeSetItem(STORAGE_KEY, updatedProjects);
    return newProject;
  };

  const updateFormData = (data: Partial<ProjectFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const resetFormData = () => {
    setFormData(initialFormData);
  };

  const deleteProject = (projectId: string | number) => {
    const updatedProjects = projects.filter((project) => project.id !== String(projectId));
    setProjects(updatedProjects);
    safeSetItem(STORAGE_KEY, updatedProjects);
  };

  return {
    projects,
    formData,
    setFormData: updateFormData,
    resetFormData,
    addProject,
    deleteProject,
  };
}
