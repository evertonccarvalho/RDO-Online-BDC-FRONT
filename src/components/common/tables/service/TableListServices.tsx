import { IService, serviceService } from "@/services/serviceService";
import { subCategoryService } from "@/services/subCategoryService";
import { Loader, PlusIcon } from "lucide-react";
import { useState } from "react";
import useSWR from "swr";
import ModalComponent from "../../Modal";
import Input from "../../form/Input";
import CreateNewService from "../../form/serviceNewForm";
import Pagination from "../pagination";
import { TableService } from "./TableService";

interface Props {
  workId: number;
}
export function TableListServices({ workId }: Props) {
  const [filterValue, setFilterValue] = useState<string>("");
  const [showModalService, setShowModalService] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(0);

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

  const filteredServices = services.filter((service: IService) => {
    const searchString = filterValue.toLowerCase();
    return (
      service.serviceDescription.toLowerCase().includes(searchString) ||
      service.status.toLowerCase().includes(searchString) ||
      service.unit.toLowerCase().includes(searchString) ||
      service.totalAmount.toString().includes(searchString) ||
      getSubCategoryName(service.subcategoryId)
        .toLowerCase()
        .includes(searchString)
    );
  });

  const itemsPerPage = 10; // Defina o número de itens por página aqui

  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredServices.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );

  const renderedItems = currentItems.map((service: IService, index: number) => (
    <TableService
      key={index}
      id={service.id}
      description={service.serviceDescription}
      status={service.status}
      unit={service.unit}
      total={service.totalAmount}
      subCategory={getSubCategoryName(service.subcategoryId)}
    />
  ));

  const handleCloseModalService = () => {
    setShowModalService(false);
  };
  const toggleModalService = () => {
    setShowModalService(!showModalService);
  };
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <ModalComponent
        isOpen={showModalService}
        onClose={handleCloseModalService}
        modalName="Novo Serviço"
        modalContent={<CreateNewService workId={+workId} />}
      />
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
          Serviços:
          <span className="text-primary"> {filteredServices.length}</span>
        </p>
      </div>

      <div className="relative w-full overflow-auto">
        <table className="w-full bg-card text-white ">
          {/* Restante do seu código da tabela */}
          <thead className="min-w-max whitespace-nowrap">
            <tr className="grid grid-cols-7 gap-4 bg-gray-900 p-3 text-xs">
              <th>Id</th>
              <th>Descrição</th>
              <th>Unit</th>
              <th>Total</th>
              <th>Status</th>
              <th>Sub Categoria</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody className="">
            {filteredServices.length > 0 ? (
              renderedItems // Renderiza os items
            ) : (
              <tr className="text-Foreground h-24 w-full rounded bg-card">
                <td colSpan={7} className="text-center">
                  Nenhum resultado encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <Pagination
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          totalItems={filteredServices.length}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
}
