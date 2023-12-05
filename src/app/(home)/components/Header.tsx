import { ModeToggle } from "@/components/ui/modeToggle";
import Logo from "@/images/logoGreen.png";
import Image from "next/image";
import Link from "next/link";
import { HiMenuAlt3 } from "react-icons/hi";
import DropdownUser from "./DropdownUser";

const Header = (props: {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
}) => {
  return (
    <header className="z-999 drop-shadow-1 sticky top-0 flex w-full bg-card dark:drop-shadow-none">
      <div className="shadow-2 flex flex-grow items-center justify-between px-4 py-4 md:px-6 2xl:px-11">
        <div className="flex items-center gap-2 sm:gap-4 ">
          <div className="flex justify-end py-3 ">
            {!props.sidebarOpen && (
              <HiMenuAlt3
                size={26}
                className="cursor-pointer md:hidden "
                onClick={(e: { stopPropagation: () => void }) => {
                  e.stopPropagation();
                  props.setSidebarOpen(!props.sidebarOpen);
                }}
              />
            )}
          </div>
          <div className="flex flex-row  sm:block">
            <Link
              className=" row flex flex-shrink-0 items-center "
              href="/home"
            >
              <Image src={Logo} width={50} alt="logo" />
              <p>RDO/</p>
              <p className="text-primary">B.D.C</p>
            </Link>
          </div>
        </div>
        <div className="2xsm:gap-7  flex items-center gap-3">
          <ModeToggle />
          <DropdownUser />
        </div>
      </div>
    </header>
  );
};

export default Header;
