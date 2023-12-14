import {
  SubCategorySchema,
  subCategoryService,
} from "@/services/subCategoryService";
import { Loader } from "lucide-react";
import { usePathname } from "next/navigation";
import useSWR from "swr";
import { TableSubCategory } from "./TableSubCategory";

export function TableListSubCategory() {
  const pathname = usePathname();
  const workId = pathname.split("/").pop();

  if (!workId) {
    throw new Error("WorkId not provided");
  }

  const { data, error } = useSWR("/subcategory", () =>
    subCategoryService.fetchAll(),
  );
  console.log(data);

  if (error) return error;
  if (!data) {
    return <Loader />;
  }

  return (
    <div className="flex w-full min-w-[400px] ">
      <table className="text-Foreground w-full rounded bg-card px-6 py-4">
        <thead>
          <tr className="grid grid-cols-5 gap-4 rounded bg-gray-900 p-3 text-center text-xs">
            <th className="text-center">Id</th>
            <th className="text-center">Sub Categoria</th>
            <th className="text-center">Status</th>
            <th className="text-center">Categoria</th>
            <th className="text-center">Ações</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item: SubCategorySchema, index: number) => (
            <TableSubCategory
              key={index}
              id={item.id}
              description={item.name}
              status={item.status}
              subCategory={item.serviceCategoryId}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
