"use client";
import Loader from "@/components/common/Loader/page";
import { AuthProvider } from "@/providers/authContext";
import { TokenService } from "@/services/tokenService";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import MainSideBar from "./components/Sidebar";

interface HomeLayoutProps {
  children: React.ReactNode;
}

export default function HomeLayout({ children }: HomeLayoutProps) {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!TokenService.get()) {
      router.push("/login");
    } else {
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return <Loader />;
  }

  return (
    <AuthProvider>
      <div className="bg-background">
        <div className="flex h-screen overflow-hidden">
          <MainSideBar
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />
          <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
            <header className="flex items-center justify-between">
              <Header
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
              />
            </header>
            <div>
              <main className="mx-auto min-w-min max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                {children}
              </main>
            </div>
          </div>
        </div>
      </div>
    </AuthProvider>
  );
}
