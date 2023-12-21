import { IService, serviceService } from "@/services/serviceService";
import {
  ISubCategory,
  subCategoryService,
} from "@/services/subCategoryService";
import { PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";
import Loader from "../../Loader/page";
import ModalComponent from "../../Modal";
import Input from "../../form/Input";
import CreateNewService from "../../form/serviceNewForm";
import UpdateService from "../../form/serviceUpdateForm";
import Pagination from "../pagination";
import { TableService } from "./TableService";

interface Props {
  workId: number;
}
export function TableListServices({ workId }: Props) {
  const [filterValue, setFilterValue] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [services, setServices] = useState<IService[] | null>(null);
  const [subCategories, setSubCategories] = useState<ISubCategory[] | null>(
    null,
  );
  const [serviceError, setServiceError] = useState<boolean>(false);
  const [subCategoryError, setSubCategoryError] = useState<boolean>(false);
  const [selectedServiceId, setSelectedServiceId] = useState<number | null>(
    null,
  );
  const [showModal, setShowModal] = useState(false);
  const [showModalService, setShowModalService] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const servicesData = await serviceService.fetchAll(+workId);

        const subCategoriesData = await subCategoryService.fetchAll();
        setServices(servicesData);
        setSubCategories(subCategoriesData);
      } catch (error) {
        setServiceError(true);
        setSubCategoryError(true);
      }
    };

    fetchData();
  }, [workId]);

  const getSubCategoryName = (subcategoryId: number | undefined) => {
    const subCategory = subCategories?.find(
      (subCat) => subCat.id === subcategoryId,
    );
    return subCategory ? subCategory.name : "Subcategoria não encontrada";
  };

  const filteredServices =
    services?.filter((service) => {
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
    }) || [];

  const itemsPerPage = 10; // Defina o número de itens por página aqui
  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredServices.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleOpenModal = (serviceId: number) => {
    setSelectedServiceId(serviceId);
    setShowModal(true);
  };

  const handleCloseModal = async () => {
    setShowModal(false);
    try {
      const servicesData = await serviceService.fetchAll(+workId);
      setServices(servicesData);
    } catch (error) {
      console.error("Erro ao atualizar lista de serviços:", error);
      // Lidar com o erro, se necessário
    }
  };

  const toggleModalService = () => {
    setShowModalService(!showModalService);
  };

  const handleCloseModalService = async () => {
    setShowModalService(false);
    try {
      const servicesData = await serviceService.fetchAll(+workId);
      setServices(servicesData);
    } catch (error) {
      console.error("Erro ao atualizar lista de serviços:", error);
      // Lidar com o erro, se necessário
    }
  };

  return (
    <>
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
            {/* Exibição de mensagens de erro ou quando não há serviços */}
            {serviceError || subCategoryError ? (
              <tr className="text-Foreground h-24 w-full rounded bg-card">
                <td colSpan={7} className="text-center">
                  Error fetching data
                </td>
              </tr>
            ) : !services || !subCategories || filteredServices.length === 0 ? (
              <tr className="text-Foreground h-24 w-full rounded bg-card">
                <td colSpan={7} className="text-center">
                  {services === null ? <Loader /> : "No services available"}
                </td>
              </tr>
            ) : (
              currentItems.map((service: IService, index: number) => (
                <TableService
                  key={index}
                  id={service.id}
                  description={service.serviceDescription}
                  status={service.status}
                  active={service.status}
                  unit={service.unit}
                  total={service.totalAmount}
                  workId={workId}
                  onOpenModal={handleOpenModal}
                  subCategory={getSubCategoryName(service.subcategoryId)}
                />
              ))
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
