// authContext.tsx
import profileService from "@/services/profileService";
import { TokenService } from "@/services/tokenService";
import { UserParams } from "@/services/usersServices";
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

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
  const [currentUser, setCurrentUser] = useState<UserParams | null>(null);

  useEffect(() => {
    const fetchCurrent = async () => {
      try {
        const data = await profileService.fetchCurrent();
        setCurrentUser(data);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchCurrent();
  }, []);

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
