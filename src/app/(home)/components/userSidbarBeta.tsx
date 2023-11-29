import UserOne from "@/images/user.png";
import { useAuth } from "@/providers/authContext";
import Image from "next/image";

export default function SideBarBeta() {
  const { isAuthenticated, currentUser } = useAuth();
  const isAdmin =
    currentUser &&
    (currentUser.role === "Administrador" || currentUser.role === "root");

  return (
    <>
      <div>
        {isAuthenticated && currentUser ? (
          <div>
            <div className="flex place-content-center  items-center">
              <div className="flex flex-col">
                <div className="place-content-center items-center">
                  {Array.isArray(currentUser.work) &&
                    currentUser.work.map((work, index) => (
                      <div key={index} className="flex flex-col items-center">
                        <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11">
                          <div className="relative z-20  mx-auto h-32 w-32 rounded-full  sm:h-44 sm:w-44 sm:p-3">
                            <Image
                              src={work?.logo || UserOne}
                              alt="profile"
                              fill
                              className="rounded-full bg-primary p-2 backdrop-blur-sm"
                            />
                          </div>
                        </div>
                        <div className="pt-3">
                          <p>Empresa:{work.company}</p>
                          <p>Respondavel:{work.nameResponsible}</p>
                          <p>Descrição:{work.workDescription}</p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}
