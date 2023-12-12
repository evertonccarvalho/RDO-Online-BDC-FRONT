import { serviceService } from "@/services/serviceService";
import usersServices from "@/services/usersServices";
import { workService } from "@/services/workService";

export async function deleteUser(userId: number): Promise<boolean> {
  try {
    await usersServices.delete(userId);
    console.log(`Usuário com ID ${userId} foi deletado com sucesso.`);
    return true; // Retorna true após a exclusão bem-sucedida
  } catch (error) {
    console.error(`Erro ao deletar usuário com ID ${userId}:`, error);
    throw error;
  }
}

export async function deleteWork(workId: number): Promise<boolean> {
  try {
    await workService.delete(workId);
    console.log(`Usuário com ID ${workId} foi deletado com sucesso.`);
    return true; // Retorna true após a exclusão bem-sucedida
  } catch (error) {
    console.error(`Erro ao deletar usuário com ID ${workId}:`, error);
    throw error;
  }
}
export async function deleteService(workId: number, serviceId: number): Promise<boolean> {
  try {
    await serviceService.delete(workId, serviceId);
    console.log(`Usuário com ID ${workId} foi deletado com sucesso.`);
    return true; // Retorna true após a exclusão bem-sucedida
  } catch (error) {
    console.error(`Erro ao deletar usuário com ID ${workId}:`, error);
    throw error;
  }
}
