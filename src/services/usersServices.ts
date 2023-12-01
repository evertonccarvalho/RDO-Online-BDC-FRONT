import { UserSchema } from "@/lib/validations/user";
import api from "./api";
import { TokenService } from "./tokenService";
import { WorkParams } from "./workService";

export interface UserParams {
  id: number;
  userName: string;
  email: string;
  work?: WorkParams | null;
  active: boolean;
  role: string;
  workId?: number;
  avatarUrl?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

const usersServices = {
  fetchAll: async () => {
    try {
      const res = await api.get("/admin/users/", {
        headers: {
          Authorization: TokenService.get(),
        },
      });
      return res.data;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  },

  getById: async (userId: number | undefined) => {
    try {
      if (userId === undefined) {
        throw new Error("O ID do usuário não foi fornecido.");
      }

      const res = await api.get(`/admin/user/${userId}`, {
        headers: {
          Authorization: TokenService.get(),
        },
      });
      return res.data;
    } catch (error) {
      console.error("Error fetching user by ID:", error);
      throw error;
    }
  },

  update: async (userId: number | string, params: UserSchema) => {
    try {
      const res = await api.put(`/admin/user/${userId}`, params, {
        headers: {
          Authorization: TokenService.get(),
        },
      });
      return res.status;
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  },

  delete: async (userId: number) => {
    try {
      const res = await api.delete(`/admin/user/${userId}`, {
        headers: {
          Authorization: TokenService.get(),
        },
      });
      return res.status;
    } catch (error) {
      // Trate o erro de maneira apropriada
      console.error("Error deleting user:", error);
      throw error;
    }
  },
};

export default usersServices;
