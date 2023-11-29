import { WorkSchema } from "@/lib/validations/work";
import api from "./api";
import { TokenService } from "./tokenService";

export type WorkParams = {
  id: number;
  workDescription: string; // Descrição da obra
  company: string; // Nome da empresa da obra
  nameResponsible: string; // Nome do responsável pela obra
  phoneContact: string; // Número de telefone de contato
  address: string; // Endereço completo da obra
  logoUrl: string; // Logotipo da obra
  active: Boolean; // Indica se a obra está ativa
  createdAt?: Date;
  updatedAt?: Date;
};

const workService = {
  create: async (params: WorkSchema) => {
    const res = await api
      .post("/work", params, {
        headers: {
          Authorization: TokenService.get(),
        },
      })
      .catch((error) => {
        if (error.response.status === 400) {
          return error.response;
        }
        return error;
      });
    return res;
  },

  fetchAll: async () => {
    try {
      const response = await api.get("/works", {
        headers: {
          Authorization: TokenService.get(),
        },
      });
      return response.data;
    } catch (error) {
      console.log("Erro ao buscar obras:", error);
      throw error;
    }
  },

  getById: async (workId: number | undefined) => {
    try {
      if (workId === undefined) {
        throw new Error("O ID da obra não foi fornecido.");
      }

      const res = await api.get(`/work/${workId}`, {
        headers: {
          Authorization: TokenService.get(),
        },
      });
      return res.data;
    } catch (error) {
      console.error("Error fetching work by ID:", error);
      throw error;
    }
  },

  update: async (workId: number | string, params: WorkSchema) => {
    try {
      const res = await api.put(`/work/${workId}`, params, {
        headers: {
          Authorization: TokenService.get(),
        },
      });
      return res.status;
    } catch (error) {
      console.error("Error updating work:", error);
      throw error;
    }
  },

  delete: async (workId: number) => {
    try {
      const res = await api.delete(`/work/${workId}`, {
        headers: {
          Authorization: TokenService.get(),
        },
      });
      return res.status;
    } catch (error) {
      console.error("Error deleting work:", error);
      throw error;
    }
  },
};

export { workService };
