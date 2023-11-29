import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@radix-ui/react-accordion";

import { useAuth } from "@/providers/authContext";
import {
  HammerIcon,
  MapPinIcon,
  RefreshCcwIcon,
  UserIcon,
  UserPlus,
  Users2Icon,
  WorkflowIcon,
} from "lucide-react";
import Link from "next/link";
import React from "react";

interface props {
  sidebarOpen: boolean;
}

export default function SideBarAdminLinks({ sidebarOpen }: props) {
  const subMenu = [
    { name: "Usuário", link: "/usuario", icon: UserIcon },
    { name: "Obra", link: "/obra", icon: WorkflowIcon },
    { name: "Equipe", link: "/equipe", icon: Users2Icon },
    { name: "Efetivo", link: "/efetivo", icon: RefreshCcwIcon },
    { name: "Local", link: "/local", icon: MapPinIcon },
    { name: "Serviço", link: "/servico", icon: HammerIcon },
  ];
  const { isAuthenticated, currentUser } = useAuth();
  const isAdmin =
    currentUser &&
    (currentUser.role === "Administrador" || currentUser.role === "root");

  return (
    <>
      {isAdmin && (
        <div>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger
                className={`group flex items-center gap-3.5  rounded-md p-2 text-sm font-medium hover:text-primary`}
              >
                <UserPlus size={20} />{" "}
                <h2
                  style={{
                    transitionDelay: `${+3}00ms`,
                  }}
                  className={`whitespace-pre duration-500 ${
                    !sidebarOpen && "translate-x-28 overflow-hidden opacity-0"
                  }`}
                >
                  Cadastro
                </h2>
                <h2
                  className={`${
                    sidebarOpen && "hidden"
                  } absolute left-48 w-0 overflow-hidden whitespace-pre rounded-md bg-card px-0 py-0 font-semibold text-primary drop-shadow-lg group-hover:left-14 group-hover:w-fit group-hover:px-2 group-hover:py-1 group-hover:duration-300  `}
                >
                  Cadastro
                </h2>
              </AccordionTrigger>
              <AccordionContent>
                {subMenu?.map((subMenu, i) => (
                  <Link
                    href={subMenu?.link}
                    key={i}
                    className={`group ml-3 flex items-center gap-3.5 rounded-md p-2 text-xs font-medium hover:text-primary`}
                  >
                    <div>
                      {React.createElement(subMenu?.icon, {
                        size: "20",
                      })}
                    </div>

                    <h2
                      style={{
                        transitionDelay: `${i + 3}00ms`,
                      }}
                      className={`whitespace-pre duration-500 ${
                        !sidebarOpen &&
                        "translate-x-28 overflow-hidden opacity-0"
                      }`}
                    >
                      {subMenu?.name}
                    </h2>
                    <h2
                      className={`${
                        sidebarOpen && "hidden"
                      } absolute left-48 w-0 overflow-hidden whitespace-pre rounded-md bg-card px-0 py-0 font-semibold text-primary drop-shadow-lg group-hover:left-14 group-hover:w-fit group-hover:px-2 group-hover:py-1 group-hover:duration-300  `}
                    >
                      {subMenu?.name}
                    </h2>
                  </Link>
                ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      )}
    </>
  );
}
