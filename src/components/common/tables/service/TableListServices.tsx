import { ServiceSchema } from "@/lib/validations/service";
import { serviceService } from "@/services/serviceService";
import { Loader } from "lucide-react";
import { usePathname } from "next/navigation";
import useSWR from "swr";
import { TableService } from "./TableService";
import { subCategoryService } from "@/services/subCategoryService";

export function TableListServices() {
  const pathname = usePathname();
  const workId = pathname.split("/").pop();

  if (!workId) {
    throw new Error("WorkId not provided");
  }

  const { data: services, error: serviceError } = useSWR("/", () =>
    serviceService.fetchAll(+workId),
  );
  const { data: subCategories, error: subCategoryError } = useSWR(
    "/subcategories",
    () => subCategoryService.fetchAll(), // Supondo que exista um serviço para buscar as subcategorias
  );

  if (serviceError || subCategoryError) return <div>Error fetching data</div>;
  if (!services || !subCategories) {
    return <Loader />;
  }

  // Função para buscar o nome da subcategoria correspondente ao ID da subcategoria
  const getSubCategoryName = (subcategoryId: string | undefined) => {
    const subCategory = subCategories.find(
      (subCat: { id: string | undefined }) => subCat.id === subcategoryId,
    );
    return subCategory ? subCategory.name : "Subcategoria não encontrada";
  };

  return (
    <div className="flex w-full min-w-[400px]">
      <table className="text-Foreground w-full rounded bg-card px-6 py-4">
        <thead>
          <tr className="grid grid-cols-6 gap-4 rounded bg-gray-900 p-3 text-center text-xs">
            <th className="text-center">Id</th>
            <th className="text-center">Descrição</th>
            <th className="text-center">Unit</th>
            <th className="text-center">Status</th>
            <th className="text-center">Sub Categoria</th>
            <th className="text-center">Ações</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service: ServiceSchema, index: number) => (
            <TableService
              key={index}
              id={service.id}
              description={service.serviceDescription}
              status={service.status}
              unit={service.unit}
              subCategory={getSubCategoryName(service.subcategoryId)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
