import { serviceService } from "@/services/serviceService";
import { subCategoryService } from "@/services/subCategoryService";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export function useServicesData(workId: number) {
  return useQuery({
    queryKey: [`services_${workId}`], // Exemplo de queryKey com o workId
    queryFn: () => serviceService.fetchAll(workId),
  });
}

export function useSubCategoriesData() {
  return useQuery({
    queryKey: ["subcategories"], // Exemplo de queryKey
    queryFn: () => subCategoryService.fetchAll(),
  });
}

export function useServicesForModal(
  workId: number,
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>,
) {
  const queryClient = useQueryClient();

  const handleCloseModal = async () => {
    setShowModal(false);
    try {
      await serviceService.fetchAll(workId);
      queryClient.invalidateQueries({ queryKey: [`services_${workId}`] });
    } catch (error) {
      console.error("Erro ao atualizar lista de serviços:", error);
      // Lidar com o erro, se necessário
    }
  };

  return { handleCloseModal };
}

export function useCreateServiceModal(
  workId: number,
  setShowModalService: React.Dispatch<React.SetStateAction<boolean>>,
) {
  const queryClient = useQueryClient();

  const handleCloseModalService = async () => {
    setShowModalService(false);
    try {
      await serviceService.fetchAll(workId);
      queryClient.invalidateQueries({ queryKey: [`services_${workId}`] });
    } catch (error) {
      console.error("Erro ao atualizar lista de serviços:", error);
      // Lidar com o erro, se necessário
    }
  };

  return { handleCloseModalService };
}

// export function useDeleteService(workId: number) {
//   const queryClient = useQueryClient();

//   async function deleteService(
//     serviceId: number,
//     workId: number,
//   ): Promise<boolean> {
//     try {
//       // Exclui o serviço
//       await serviceService.delete(workId, serviceId);
//       console.log(`O Serviço com ID ${workId} foi deletado com sucesso.`);

//       // Após a exclusão bem-sucedida, busca os serviços atualizados
//       await serviceService.fetchAll(workId);

//       // Invalida a query de serviços específica após a exclusão bem-sucedida
//       queryClient.invalidateQueries({ queryKey: [`services_${workId}`] });

//       return true;
//     } catch (error) {
//       console.error("Erro ao deletar serviço:", error);
//       // Lida com o erro de exclusão aqui
//       return false;
//     }
//   }

//   return { deleteService };
// }
