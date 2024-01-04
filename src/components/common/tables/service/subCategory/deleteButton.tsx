import { Button } from "@/components/ui/button";
import { serviceService } from "@/services/serviceService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

interface ServiceDeletionProps {
  workId: number;
  serviceId: number;
  onSuccess?: () => Promise<void>;
}

const ServiceDeletion: React.FC<ServiceDeletionProps> = ({
  workId,
  serviceId,
  onSuccess,
}) => {
  const queryClient = useQueryClient();
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteService = useMutation({
    mutationFn: async () => {
      setIsDeleting(true);
      await serviceService.delete(serviceId, workId);
    },
    async onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["services"] });
      setIsDeleting(false);
      if (onSuccess) await onSuccess();
    },
  });

  const handleDelete = () => {
    deleteService.mutate();
  };

  return (
    <Button onClick={handleDelete} disabled={isDeleting}>
      {isDeleting ? "Excluindo..." : "Excluir Serviço"}
    </Button>
  );
};

export default ServiceDeletion;
