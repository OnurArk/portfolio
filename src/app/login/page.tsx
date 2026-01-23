import type { Metadata } from "next";

import { LoginView } from "@/views/LoginView";

export const metadata: Metadata = {
  title: "Login — Kendis Pulse",
  description: "Sign in to unlock the analytics cockpit.",
};

export default function LoginPage() {
  return <LoginView />;
}

