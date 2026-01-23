import { AppShell } from "@/components/layout/AppShell";
import { SettingsView } from "@/views/SettingsView";

export const metadata = {
  title: "Settings — Kendis Pulse",
};

export default function SettingsPage() {
  return (
    <AppShell>
      <SettingsView />
    </AppShell>
  );
}

