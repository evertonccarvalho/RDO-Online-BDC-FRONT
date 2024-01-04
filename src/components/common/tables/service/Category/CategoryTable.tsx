import Input from "@/components/common/Input";
import ModalComponent from "@/components/common/Modal";
import { ICategory, categoryService } from "@/services/categoryService";
import { useQuery } from "@tanstack/react-query";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import CreateNewCategory from "./CategoryNewForm";
import { CategoryTableFilter } from "./CategoryTableFilter";
import { CategoryTableRows } from "./CategoryTableRows";
import UpdateCategory from "./CategoryUpdateForm";

interface Props {
  workId: number;
}

export function CategoryTable({ workId }: Props) {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: () => categoryService.fetchAll(),
  });
  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(
    null,
  );
  const [filterValue, setFilterValue] = useState<string>("");

  const FILTER = CategoryTableFilter(data, filterValue);

  const [showModal, setShowModal] = useState(false);

  const toggleModalService = () => {
    setShowModal(!showModal);
  };
  const handleCloseModal = () => {
    // Lógica para fechar o modal
    setShowModal(false);
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
            onClick={toggleModalService}
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
            <tr className="grid grid-cols-4 gap-4 bg-gray-900 p-3 text-xs">
              <th className="text-center">Id</th>
              <th className="text-center">Nome</th>
              <th className="text-center">Status</th>
              <th className="text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {FILTER.map((item: ICategory, index: number) => (
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
            isOpen={true}
            onClose={() => setSelectedCategory(null)}
            modalContent={
              <UpdateCategory
                Category={selectedCategory}
                handleClose={() => setSelectedCategory(null)}
              />
            }
          />
        )}
        <ModalComponent
          isOpen={showModal}
          onClose={handleCloseModal}
          modalName="NovA Categoria"
          modalContent={<CreateNewCategory handleClose={handleCloseModal} />}
        />
      </div>
    </>
  );
}
