import Input from "@/components/common/Input";
import ModalComponent from "@/components/common/Modal";
import { categoryService } from "@/services/categoryService";
import {
  ISubCategory,
  subCategoryService,
} from "@/services/subCategoryService";
import { useQuery } from "@tanstack/react-query";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import CreateNewSubCategory from "./SubCategoryNewForm";
import { CategoryTableFilter } from "./SubCategoryTableFilter";
import { SubCategoryTableRows } from "./SubCategoryTableRows";
import UpdateSubCategory from "./SubCategoryUpdateForm";

interface Props {
  workId: number;
}

export function SubCategoryTable({ workId }: Props) {
  const { data } = useQuery({
    queryKey: ["subcategories"],
    queryFn: () => subCategoryService.fetchAll(),
  });

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: () => categoryService.fetchAll(),
  });

  const [selectedCategory, setSelectedCategory] = useState<ISubCategory | null>(
    null,
  );

  const [filterValue, setFilterValue] = useState<string>("");

  const FILTER = CategoryTableFilter(data, filterValue, categories);

  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleCloseModal = () => {
    // Lógica para fechar o modal
    setShowModal(false);
  };

  const getCategoryName = (categoryId: string | undefined) => {
    if (categories) {
      const category = categories.find(
        (cat: { id: any }) => cat.id === categoryId,
      );
      return category ? category.name : "Categoria não encontrada";
    }
    return "Categoria não encontrada";
  };

  return (
    <>
      <div className="bg-gray-900 p-2 px-4 py-4">
        <div className="flex items-center justify-between gap-4 p-2">
          <div>
            <Input
              className=""
              placeholder="Filtrar"
              value={filterValue}
              onChange={(event) => setFilterValue(event.target.value)}
            />
          </div>
          <button
            className="flex h-full max-w-fit items-center text-sm text-primary"
            onClick={toggleModal}
          >
            <PlusIcon className="h-4 w-4" />
            <span className="hidden md:block">Novo Serviço </span>
          </button>
        </div>
        <p className="px-2">
          Categorias:
          <span className="text-primary"> {FILTER.length}</span>
        </p>
      </div>

      <div className="relative w-full overflow-auto">
        <table className="w-full bg-card text-white ">
          <thead className="min-w-max whitespace-nowrap">
            <tr className="grid grid-cols-5 gap-4 bg-gray-900 p-3 text-xs">
              <th className="text-center">Id</th>
              <th className="text-center">Nome</th>
              <th className="text-center">Status</th>
              <th className="text-center">Categoria</th>
              <th className="text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {FILTER.map((item: ISubCategory, index: number) => (
              <SubCategoryTableRows
                key={index}
                id={item.id}
                name={item.name}
                status={item.status}
                workId={workId}
                subCategory={getCategoryName(item.serviceCategoryId)}
                onOpenModal={() => setSelectedCategory(item)}
              />
            ))}
          </tbody>
        </table>
        {selectedCategory && (
          <ModalComponent
            modalName="Editar Sub Categoria"
            isOpen={true}
            onClose={() => setSelectedCategory(null)}
            modalContent={
              <UpdateSubCategory
                SubCategory={selectedCategory}
                handleClose={() => setSelectedCategory(null)}
              />
            }
          />
        )}
        <ModalComponent
          isOpen={showModal}
          onClose={handleCloseModal}
          modalName="Nova Sub Categoria"
          modalContent={<CreateNewSubCategory handleClose={handleCloseModal} />}
        />
      </div>
    </>
  );
}
