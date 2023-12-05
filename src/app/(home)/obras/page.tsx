"use client";
import Breadcrumb from "@/app/(home)/components/Breadcrumb";
import Loader from "@/components/common/Loader/page";
import { WorkParams, workService } from "@/services/workService";
import useSWR from "swr";
import WorkCard from "./workCard";
const ObrasPage = () => {
  const { data, error } = useSWR("/obras", workService.fetchAll);
  if (error) return error;
  if (!data) {
    return <Loader />;
  }

  return (
    <>
      <div className="p-2">
        <div>
          <Breadcrumb pageName="Obras" />
          <p className="text-sm text-muted-foreground">Obras</p>
        </div>
        <div className="flex flex-row flex-wrap gap-4 p-2">
          {data.map((item: WorkParams) => (
            <WorkCard
              id={item.id}
              key={item.id} // Utilizando o campo 'id' como chave única
              company={item.company}
              workDescription={item.workDescription}
              nameResponsible={item.nameResponsible}
              address={item.address}
              logoUrl={item.logoUrl}
              phoneContact={item.phoneContact}
              active={item.active}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default ObrasPage;
