"use client";
import authService from "@/services/authService";
import { TokenService } from "@/services/tokenService";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
export default function HomeNoAuth() {
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = TokenService.get();

        if (!token) {
          console.log("nao tem token");
          return;
        }

        const response = await authService.autoLogin(token);

        if (response.status === 200) {
          router.push("/home");
        } else {
          alert("Dados incorretos!");
          // Ou, se estiver usando uma biblioteca de notificação, algo como:
          // toast.error('Dados incorretos!');
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchData(); // Chame a função assíncrona
  }, [router]);

  return (
    <>
      <h1></h1>
    </>
  );
}
