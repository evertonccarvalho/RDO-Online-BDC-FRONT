import {
  BarChart,
  BookCheckIcon,
  ConstructionIcon,
  HomeIcon,
} from "lucide-react";
import Link from "next/link";
import React from "react";

interface props {
  sidebarOpen: boolean;
}
const menus = [
  { name: "Inicio", link: "/home", icon: HomeIcon },
  { name: "Obras", link: "/obras", icon: ConstructionIcon },
  { name: "Apontamentos", link: "/apontamentos", icon: BookCheckIcon },
  { name: "Relatorios", link: "/relatorios", icon: BarChart },
];

export default function SideBarLinks({ sidebarOpen }: props) {
  return (
    <>
      <div className="relative mr-2 gap-10  ">
        {menus?.map((menu, i) => (
          <Link
            href={menu?.link}
            key={i}
            className={`group flex items-center gap-3.5 rounded-md p-2 text-sm font-medium hover:text-primary`}
          >
            <div>{React.createElement(menu?.icon, { size: "20" })}</div>

            <h2
              className={`${
                !sidebarOpen && "translate-x-28 overflow-hidden opacity-0"
              }`}
            >
              {menu?.name}
            </h2>
            <h2
              className={`${
                sidebarOpen && "hidden"
              } absolute left-48 w-0 overflow-hidden whitespace-pre rounded-md bg-card px-0 py-0 font-semibold text-primary drop-shadow-lg group-hover:left-14 group-hover:w-fit group-hover:px-2 group-hover:py-1   `}
            >
              {menu?.name}
            </h2>
          </Link>
        ))}
      </div>
    </>
  );
}
