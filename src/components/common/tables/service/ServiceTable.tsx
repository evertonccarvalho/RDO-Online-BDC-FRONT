import { getPaginatedItems } from "@/lib/pagination";
import { IService, serviceService } from "@/services/serviceService";
import {
  ISubCategory,
  subCategoryService,
} from "@/services/subCategoryService";
import { useQuery } from "@tanstack/react-query";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import Input from "../../Input";
import ModalComponent from "../../Modal";
import Pagination from "../pagination";
import CreateNewService from "./ServiceNewForm";
import { ServiceTableFilter } from "./ServiceTableFilter";
import { ServiceTableRows } from "./ServiceTableRows";
import UpdateService from "./ServiceUpdateForm";

interface Props {
  workId: number;
}
export function ServiceTable({ workId }: Props) {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [filterValue, setFilterValue] = useState<string>("");
  const [selectedService, setSelectedService] = useState<IService | null>(null);
  const [showModal, setShowModal] = useState(false);

  const { data: services } = useQuery({
    queryKey: ["services"],
    queryFn: () => serviceService.fetchAll(workId),
  });

  const { data: subCategories } = useQuery({
    queryKey: ["subcategories"],
    queryFn: () => subCategoryService.fetchAll(),
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleCloseModal = () => {
    // Lógica para fechar o modal
    setShowModal(false);
  };

  const FILTER = ServiceTableFilter(services, filterValue, subCategories);

  // Defina o número de itens por página aqui
  const itemsPerPage = 10;
  // Use a função getCurrentItems para obter os itens da página atual
  const currentItems = getPaginatedItems(FILTER, currentPage, itemsPerPage);
  // Função para obter o nome da subcategoria
  const getSubCategoryName = (subcategoryId: number | undefined) => {
    const subCategory = subCategories?.find(
      (subCat: ISubCategory) => subCat.id === subcategoryId,
    );
    return subCategory ? subCategory.name : "Subcategoria não encontrada";
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
          Serviços:
          <span className="text-primary"> {FILTER.length}</span>
        </p>
      </div>

      <div className="relative w-full overflow-auto">
        <table className="w-full bg-card text-white ">
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
          <tbody>
            {currentItems.map((service: IService, index: number) => (
              <ServiceTableRows
                key={index}
                id={service.id}
                description={service.serviceDescription}
                status={service.status}
                active={service.status}
                unit={service.unit}
                total={service.totalAmount}
                workId={workId}
                subCategory={getSubCategoryName(service.subcategoryId)}
                onOpenModal={() => setSelectedService(service)}
              />
            ))}
          </tbody>
        </table>
        <Pagination
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          totalItems={FILTER.length}
          onPageChange={handlePageChange}
        />
      </div>
      <div>
        {selectedService && (
          <ModalComponent
            modalName="Editar Serviço"
            isOpen={true}
            onClose={() => setSelectedService(null)}
            modalContent={
              <UpdateService
                workId={+workId}
                services={selectedService}
                handleClose={() => setSelectedService(null)}
              />
            }
          />
        )}
        <ModalComponent
          isOpen={showModal}
          onClose={handleCloseModal}
          modalName="Novo Serviço"
          modalContent={
            <CreateNewService workId={+workId} handleClose={handleCloseModal} />
          }
        />
      </div>
    </>
  );
}
