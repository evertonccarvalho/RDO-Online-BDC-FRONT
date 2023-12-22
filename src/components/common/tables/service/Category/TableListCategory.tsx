import ModalComponent from "@/components/common/Modal";
import UpdateCategory from "@/components/common/form/categoryUpdateForm";
import { CategorySchema, categoryService } from "@/services/categoryService";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { CategoryTableRows } from "./CategoryTableRows";

interface Props {
  workId: number;
}

export function TableListCategory({ workId }: Props) {
  const [selectedCategory, setSelectedCategory] =
    useState<CategorySchema | null>(null);

  const { data, isError, isLoading } = useQuery({
    queryKey: ["subcategories"],
    queryFn: () => categoryService.fetchAll(),
  });

  return (
    <div className="flex w-full min-w-[400px] ">
      <table className="text-Foreground w-full rounded bg-card px-6 py-4">
        <thead>
          <tr className="grid grid-cols-4 gap-4 rounded bg-gray-900 p-3 text-center text-xs">
            <th className="text-center">Id</th>
            <th className="text-center">Nome</th>
            <th className="text-center">Status</th>
            <th className="text-center">Ações</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item: CategorySchema, index: number) => (
            <CategoryTableRows
              key={index}
              id={item.id}
              name={item.name}
              status={item.status}
              workId={workId}
              onOpenModal={() => setSelectedCategory(item)}
            />
          ))}
        </tbody>
      </table>
      {selectedCategory && (
        <ModalComponent
          modalName="Editar Categoria"
          isOpen={!!selectedCategory}
          onClose={() => setSelectedCategory(null)}
          modalContent={
            <UpdateCategory
              Category={selectedCategory}
              handleClose={() => setSelectedCategory(null)}
            />
          }
        />
      )}
    </div>
  );
}
