"use client";
import Breadcrumb from "@/components/common/Breadcrumb";
import usersServices, { UserParams } from "@/services/usersServices";
import { useEffect, useState } from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";

const UserPage = () => {
  const [userData, setUserData] = useState<UserParams[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await usersServices.fetchAll();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Você pode fornecer dados padrão ou retornar um array vazio aqui.
        // Por exemplo:
        setUserData([
          // Dados padrão caso ocorra um erro na requisição
          {
            id: 1,
            userName: "",
            email: "",
            active: true,
            role: "",
            work: {
              id: 1,
              workDescription: "",
              active: true,
              address: "",
              company: "",
              logoUrl: "",
              nameResponsible: "",
              phoneContact: "",
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          },
        ]);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      <div className=" space-y-6 p-2">
        <div>
          <Breadcrumb pageName="Usuários" />
          <p className="text-sm text-muted-foreground">Usuários</p>
        </div>
        <div className="text-Foreground w-full rounded bg-card px-6 py-4">
          <DataTable columns={columns} data={userData} />
        </div>
      </div>
    </>
  );
};

export default UserPage;
