import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface DeleteItemProps {
  itemName: string;
  deleteFunction: () => Promise<boolean>;
}

const DeleteItem: React.FC<DeleteItemProps> = ({
  itemName,
  deleteFunction,
}) => {
  const { toast } = useToast();
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    try {
      const deleted = await deleteFunction(); // Chama a função para excluir o item

      if (deleted) {
        toast({
          variant: "success",
          title: `${itemName} excluído.`,
          description: `${itemName} foi excluído com sucesso.`,
        });
      }
      router.push("/obras");
    } catch (error) {
      toast({
        variant: "destructive",
        title: `Erro ao excluir ${itemName}.`,
        description: `Ocorreu um erro ao excluir o ${itemName}.`,
      });
      console.error(`Erro ao excluir ${itemName}:`, error);
    }
  };

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowConfirmationModal(true)}
          >
            <Trash className="h-4 w-4 text-red-800" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmação</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogDescription>
            Tem certeza que deseja excluir {itemName}?
          </AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowConfirmationModal(false)}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>
              Confirmar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default DeleteItem;
