"use client";
import PrivateRoute from "@/providers/PrivateRoute";

interface CadastroLayoutProps {
  children: React.ReactNode;
}

export default function CadastroLayout({ children }: CadastroLayoutProps) {
  return (
    <PrivateRoute>
      <div className="max-h-screen">{children}</div>
    </PrivateRoute>
  );
}
