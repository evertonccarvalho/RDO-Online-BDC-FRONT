import UserOne from "@/images/user.png";
import { useAuth } from "@/providers/authContext";
import { TokenService } from "@/services/tokenService";
import { LogOutIcon, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const DropdownUser = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { isAuthenticated, currentUser } = useAuth();
  const router = useRouter();
  const trigger = useRef<any>(null);
  const dropdown = useRef<any>(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  const handleLogoutClick = async () => {
    TokenService.remove();
    router.push("/login");
  };

  return (
    <div className="relative">
      <Link
        ref={trigger}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-4"
        href="#"
      >
        <span className="hidden text-right lg:block">
          <span className="block text-sm font-medium text-primary dark:text-primary">
            {currentUser?.userName}
          </span>
          <span className="block text-xs">{currentUser?.role}</span>
          <span className="block text-xs">{currentUser?.email}</span>
        </span>

        <span className="h-12 w-12 rounded-full">
          <Image
            src={currentUser?.avatarUrl || UserOne}
            alt="User"
            width={300}
            height={300}
            quality={80}
          />
        </span>

        <svg
          className={`hidden fill-current sm:block ${
            dropdownOpen ? "rotate-180" : ""
          }`}
          width="12"
          height="8"
          viewBox="0 0 12 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0.410765 0.910734C0.736202 0.585297 1.26384 0.585297 1.58928 0.910734L6.00002 5.32148L10.4108 0.910734C10.7362 0.585297 11.2638 0.585297 11.5893 0.910734C11.9147 1.23617 11.9147 1.76381 11.5893 2.08924L6.58928 7.08924C6.26384 7.41468 5.7362 7.41468 5.41077 7.08924L0.410765 2.08924C0.0853277 1.76381 0.0853277 1.23617 0.410765 0.910734Z"
            fill=""
          />
        </svg>
      </Link>

      {/* <!-- Dropdown Start --> */}
      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className={`w-62.5 border-stroke shadow-default dark:border-strokedark dark:bg-boxdark absolute right-0 mt-4 flex border-spacing-0 flex-col rounded-sm bg-card ${
          dropdownOpen === true ? "block" : "hidden"
        }`}
      >
        <ul className="border-stroke py-7.5 dark:border-strokedark flex flex-col gap-5 border-b px-6">
          <li>
            <Link
              href={`/currentuser/${currentUser?.id}`}
              className="flex items-center gap-3.5 text-sm font-semibold duration-300 ease-in-out hover:text-primary"
            >
              <User />
              Meu Perfil
            </Link>
          </li>
        </ul>
        <button
          onClick={handleLogoutClick}
          className="flex items-center gap-3.5 px-6 py-2 text-sm font-semibold duration-300 ease-in-out hover:text-primary "
        >
          <LogOutIcon />
          Sair
        </button>
      </div>

      {/* <!-- Dropdown End --> */}
    </div>
  );
};

export default DropdownUser;
