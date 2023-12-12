"use client";
import Breadcrumb from "@/app/(home)/components/Breadcrumb";
import Loader from "@/components/common/Loader/page";
import { workService } from "@/services/workService";
import useSWR from "swr";
import WorkCard from "../../../components/common/workCard";
const ObrasPage = () => {
  const { data: obrasData, error: obrasError } = useSWR(
    "/obras",
    workService.fetchAll,
  );
  console.log("Obras Data:", obrasData);
  if (obrasError) return obrasError;
  if (!obrasData) {
    return <Loader />;
  }

  return (
    <>
      <div>
        <Breadcrumb pageName="Obras" />
      </div>

      <div className="flex flex-row flex-wrap gap-4">
        {obrasData.map((obra: any) => (
          <WorkCard
            id={obra.id}
            key={obra.id}
            company={obra.company}
            workDescription={obra.workDescription}
            nameResponsible={obra.nameResponsible}
            address={obra.address}
            logoUrl={obra.logoUrl}
            phoneContact={obra.phoneContact}
            active={obra.active}
            count={obra.services.length}
          />
        ))}
      </div>
    </>
  );
};

export default ObrasPage;
