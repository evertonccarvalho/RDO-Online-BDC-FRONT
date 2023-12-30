import {
  SubCategorySchema,
  subCategoryService,
} from "@/services/subCategoryService";
import { Loader } from "lucide-react";
import { usePathname } from "next/navigation";
import useSWR from "swr";
import { TableSubCategory } from "./TableSubCategory";
import { categoryService } from "@/services/categoryService";

export function TableListSubCategory() {
  const pathname = usePathname();
  const workId = pathname.split("/").pop();

  if (!workId) {
    throw new Error("WorkId not provided");
  }

  const { data: subCategories, error: subCategoryError } = useSWR(
    "/subcategory",
    () => subCategoryService.fetchAll(),
  );

  const { data: categories, error: categoryError } = useSWR("/categories", () =>
    categoryService.fetchAll(),
  );

  if (subCategoryError || categoryError) return <div>Error fetching data</div>;
  if (!subCategories || !categories) {
    return <Loader />;
  }

  // Função para buscar o nome da categoria correspondente ao ID da categoria
  const getCategoryName = (categoryId: string | undefined) => {
    const category = categories.find(
      (cat: { id: any }) => cat.id === categoryId,
    );
    return category ? category.name : "Categoria não encontrada";
  };

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
          {subCategories.map((item: SubCategorySchema, index: number) => (
            <TableSubCategory
              key={index}
              id={item.id}
              description={item.name}
              status={item.status}
              subCategory={getCategoryName(item.serviceCategoryId)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}