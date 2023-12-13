import { ConstructionIcon, HomeIcon, ListStartIcon } from "lucide-react";
import { useEffect } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import AdminMenu from "./sideBarAdminLinks";
import SideBarLinks from "./sideBarLinks";

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
      <aside
        className={`z-50 min-h-screen gap-5  ${
          sidebarOpen ? "w-48" : "hidden md:block md:w-16"
        } grid-cols-1 bg-card px-4 text-foreground duration-500 `}
      >
        <div className="relative right-0 flex justify-end py-8">
          <HiMenuAlt3
            size={26}
            className="cursor-pointer"
            onClick={(e: { stopPropagation: () => void }) => {
              e.stopPropagation();
              setSidebarOpen(!sidebarOpen);
            }}
          />
        </div>
        <div className={`${!sidebarOpen && "hidden"} py pb-14`}>
          {/* <SideBarBeta /> */}
        </div>
        <div className="flex flex-col gap-4 py-10">
          <SideBarLinks sidebarOpen={sidebarOpen} />
          <AdminMenu sidebarOpen={sidebarOpen} />
        </div>
      </aside>
    </>
  );
};

export default MainSideBar;
