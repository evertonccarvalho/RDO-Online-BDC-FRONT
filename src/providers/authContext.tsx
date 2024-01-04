// authContext.tsx
import profileService from "@/services/profileService";
import { TokenService } from "@/services/tokenService";
import { UserParams } from "@/services/usersServices";
import { useQuery } from "@tanstack/react-query";
import React, { ReactNode, createContext, useContext } from "react";

interface AuthContextProps {
  isAuthenticated: boolean;
  currentUser: UserParams | null;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const storedToken = TokenService.get();
  const isAuthenticated = !!storedToken;

  const { data: currentUser } = useQuery({
    queryKey: ["currentuser"],
    queryFn: () => profileService.fetchCurrent(),
  });

  return (
    <AuthContext.Provider value={{ isAuthenticated, currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de AuthProvider");
  }
  return context;
};
