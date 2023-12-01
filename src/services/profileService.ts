import { ProfileSchema } from "@/lib/validations/user";
import api from "./api";
import { TokenService } from "./tokenService";

interface PasswordParams {
  currentPassword: string;
  newPassword: string;
}

const profileService = {
  fetchCurrent: async () => {
    const res = await api
      .get("/current/user", {
        headers: {
          Authorization: TokenService.get(),
        },
      })
      .catch((error) => {
        return error.response;
      });

    return res.data;
  },
  updateProfile: async (userId: number | string, params: ProfileSchema) => {
    try {
      const res = await api.put(`/current/user/${userId}`, params, {
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
  passwordUpdate: async (params: PasswordParams) => {
    const res = await api
      .put("/current/user/password", params, {
        headers: {
          Authorization: TokenService.get(),
        },
      })
      .catch((error) => {
        if (error.response.status === 400 || error.response.status === 401) {
          return error.response;
        }

        return error;
      });

    return res.status;
  },
};

export default profileService;
