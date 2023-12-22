import { workService } from "@/services/workService";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export function useObrasData() {
  return useQuery({
    queryKey: ["obras"], // Exemplo de queryKey
    queryFn: () => workService.fetchAll(),
  });
}

export function useSubmitModal(
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>,
) {
  const queryClient = useQueryClient();

  const handleSubmitModal = async () => {
    setShowModal(false);
    try {
      await workService.fetchAll();
      queryClient.invalidateQueries({ queryKey: [`obras`] });
    } catch (error) {
      console.error("Erro ao atualizar lista de serviços:", error);
      // Lidar com o erro, se necessário
    }
  };

  return { handleSubmitModal };
}
