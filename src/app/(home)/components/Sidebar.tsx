import { ConstructionIcon, HomeIcon, ListStartIcon } from "lucide-react";
import { useEffect } from "react";
import AdminMenu from "./sideBarAdminLinks";
import SideBarLinks from "./sideBarLinks";
import SideBarBeta from "./userSidbarBeta";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const MainSideBar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  useEffect(() => {
    function handleResize() {
      const screenWidth = window.innerWidth;
      if (screenWidth <= 640) {
        // Defina aqui o ponto de quebra para fechar a sidebar em telas menores
        setSidebarOpen(false); // Fecha a sidebar quando a largura da tela for menor ou igual a 640px
      }
    }

    // Adiciona o listener do evento de redimensionamento da janela
    window.addEventListener("resize", handleResize);

    // Remove o listener do evento de redimensionamento ao desmontar o componente
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [setSidebarOpen]);

  const menus = [
    { name: "Inicio", link: "/home", icon: HomeIcon },
    { name: "Apontamentos", link: "/apontamentos", icon: ConstructionIcon },
    { name: "Relatorios", link: "/relatorios", icon: ListStartIcon },
  ];

  return (
    <>
      <div
        className={`z-50 min-h-screen bg-card py-28 ${
          sidebarOpen ? "w-64" : "w-16"
        } grid-cols-1 bg-background px-4 text-foreground duration-500`}
      >
        <div className={`${!sidebarOpen && "hidden"} pb-14`}>
          <SideBarBeta />
        </div>
        <SideBarLinks sidebarOpen={sidebarOpen} />
        <AdminMenu sidebarOpen={sidebarOpen} />
      </div>
    </>
  );
};

export default MainSideBar;
