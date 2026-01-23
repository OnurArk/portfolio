import { AppShell } from "@/components/layout/AppShell";
import { DashboardView } from "@/views/DashboardView";

export default function HomePage() {
  return (
    <AppShell>
      <DashboardView />
    </AppShell>
  );
}
