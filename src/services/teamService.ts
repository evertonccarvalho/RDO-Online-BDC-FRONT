import { WorkSchema } from "@/lib/validations/work";
import api from "./api";
import { TokenService } from "./tokenService";

export type TeamParams = {
  descricaoEquipe: string;
  empresaContratada: string;
  status: string;
  work?: WorkSchema;
};

const teamService = {
  create: async (workId: number, params: TeamParams) => {
    const res = await api
      .post(`/works/${workId}/team`, params, {
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
      const response = await api.get(`/works/${workId}/teams`, {
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

  getById: async (workId: number, teamId: number | undefined) => {
    try {
      if (teamId === undefined) {
        throw new Error("O ID da equipe não foi fornecido.");
      }

      const res = await api.get(`/works/${workId}/team/${teamId}`, {
        headers: {
          Authorization: TokenService.get(),
        },
      });
      return res.data;
    } catch (error) {
      console.error("Error fetching team by ID:", error);
      throw error;
    }
  },

  update: async (
    teamId: number,
    workId: number | string,
    params: TeamParams,
  ) => {
    try {
      const res = await api.put(`/works/${workId}/team/${teamId}`, params, {
        headers: {
          Authorization: TokenService.get(),
        },
      });
      return res.status;
    } catch (error) {
      console.error("Error updating team:", error);
      throw error;
    }
  },

  delete: async (teamId: number, workId: number) => {
    try {
      const res = await api.delete(`/works/${workId}/team/${teamId}`, {
        headers: {
          Authorization: TokenService.get(),
        },
      });
      return res.status;
    } catch (error) {
      console.error("Error deleting team:", error);
      throw error;
    }
  },
};

export { teamService };
