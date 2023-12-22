import {
  useCreateServiceModal,
  useServicesData,
  useServicesForModal,
  useSubCategoriesData,
} from "@/helpers/servicesQueryHelper";
import { getPaginatedItems } from "@/lib/pagination";
import { ISubCategory } from "@/services/subCategoryService";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import ModalComponent from "../../Modal";
import Input from "../../form/Input";
import CreateNewService from "../../form/serviceNewForm";
import UpdateService from "../../form/serviceUpdateForm";
import Pagination from "../pagination";
import { renderTableContent } from "./TableUtils";
import { filterServices } from "./serviceFIlter";

interface Props {
  workId: number;
}
export function TableListServices({ workId }: Props) {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [selectedServiceId, setSelectedServiceId] = useState<number | null>(
    null,
  );
  const [filterValue, setFilterValue] = useState<string>("");
  const [showModal, setShowModal] = useState(false);
  const [showModalService, setShowModalService] = useState(false);
  const servicesData = useServicesData(workId);
  const services = servicesData.data;
  const subCategoriesData = useSubCategoriesData();
  const subCategories = subCategoriesData.data;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleOpenModal = (serviceId: number) => {
    setSelectedServiceId(serviceId);
    setShowModal(true);
  };

  const toggleModalService = () => {
    setShowModalService(!showModalService);
  };

  const { handleCloseModal } = useServicesForModal(workId, setShowModal);

  const { handleCloseModalService } = useCreateServiceModal(
    workId,
    setShowModalService,
  );

  const filteredServices = filterServices(services, filterValue, subCategories);

  // Defina o número de itens por página aqui
  const itemsPerPage = 10;
  // Use a função getCurrentItems para obter os itens da página atual
  const currentItems = getPaginatedItems(
    filteredServices,
    currentPage,
    itemsPerPage,
  );
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
          <tbody>
            {renderTableContent(
              services,
              subCategories,
              filteredServices,
              currentItems,
              workId,
              handleOpenModal,
              getSubCategoryName,
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
      <div>
        <ModalComponent
          isOpen={showModalService}
          onClose={handleCloseModalService}
          modalName="Novo Serviço"
          modalContent={
            <CreateNewService
              workId={+workId}
              onCloseModal={handleCloseModalService}
            />
          }
        />
        {showModal && selectedServiceId !== null && (
          <ModalComponent
            isOpen={showModal}
            onClose={handleCloseModal}
            modalName="Atualizar Serviço"
            modalContent={
              <UpdateService
                workId={workId}
                serviceId={selectedServiceId}
                onCloseModal={handleCloseModal} // Alterado para a função de fechamento do modal atual
              />
            }
          />
        )}
      </div>
    </>
  );
}
