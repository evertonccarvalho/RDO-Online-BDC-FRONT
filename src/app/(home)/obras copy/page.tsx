"use client";
import Breadcrumb from "@/app/(home)/components/Breadcrumb";
import Loader from "@/components/common/Loader/page";
import { workService } from "@/services/workService";
import useSWR from "swr";
import { columns } from "./columns";
import { DataTable } from "./data-table";
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
        <DataTable columns={columns} data={data} />
      </div>
    </>
  );
};

export default ObrasPage;
