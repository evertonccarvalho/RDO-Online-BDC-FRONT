// components/PrivateRoute.tsx
"use client";
import { useAuth } from "@/providers/authContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { isAuthenticated, currentUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      // Se o usuário não estiver autenticado, redirecione para a página de login
      router.push("/login");
    } else if (
      currentUser &&
      currentUser.role !== "Administrador" &&
      currentUser.role !== "root"
    ) {
      // Se o usuário estiver autenticado, mas não tiver as permissões necessárias, redirecione para outra página
      alert("Você não pode acessar essa pagina");
      router.push("/home");
    }
  }, [isAuthenticated, currentUser, router]);

  // Se o usuário estiver autenticado e tiver as permissões necessárias, renderize o conteúdo da rota
  return isAuthenticated &&
    currentUser &&
    (currentUser.role === "Administrador" || currentUser.role === "root") ? (
    <>{children}</>
  ) : null;
};

export default PrivateRoute;
