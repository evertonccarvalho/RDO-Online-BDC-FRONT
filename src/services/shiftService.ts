import { WorkSchema } from "@/lib/validations/work";
import api from "./api";
import { TokenService } from "./tokenService";

export type ShiftParams = {
	teamId: number;
	description: string;
	feasibility: string;
	weatherCondition: string;
	status: string;
  work?: WorkSchema;
};

const shiftService = {
  create: async (workId: number, params: ShiftParams) => {
    const res = await api
      .post(`/works/${workId}/shift`, params, {
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

  fetchAll: async (workId: number) => {
    try {
      const response = await api.get(`/works/${workId}/shifts`, {
        headers: {
          Authorization: TokenService.get(),
        },
      });
      return response.data;
    } catch (error) {
      console.log("Erro ao buscar serviços:", error);
      throw error;
    }
  },

  getById: async (workId: number, shiftId: number | undefined) => {
    try {
      if (shiftId === undefined) {
        throw new Error("O ID da equipe não foi fornecido.");
      }

      const res = await api.get(`/works/${workId}/shift/${shiftId}`, {
        headers: {
          Authorization: TokenService.get(),
        },
      });
      return res.data;
    } catch (error) {
      console.error("Error fetching shift by ID:", error);
      throw error;
    }
  },

  update: async (
    shiftId: number,
    workId: number | string,
    params: ShiftParams,
  ) => {
    try {
      const res = await api.put(`/works/${workId}/shift/${shiftId}`, params, {
        headers: {
          Authorization: TokenService.get(),
        },
      });
      return res.status;
    } catch (error) {
      console.error("Error updating shift:", error);
      throw error;
    }
  },

  delete: async (shiftId: number, workId: number) => {
    try {
      const res = await api.delete(`/works/${workId}/shift/${shiftId}`, {
        headers: {
          Authorization: TokenService.get(),
        },
      });
      return res.status;
    } catch (error) {
      console.error("Error deleting shift:", error);
      throw error;
    }
  },
};

export { shiftService };
