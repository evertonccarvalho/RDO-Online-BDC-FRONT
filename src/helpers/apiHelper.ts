import { workService } from "@/services/workService";
import useSWR, { mutate } from "swr";

export async function fetchAllObrasData() {
  try {
    const data = await workService.fetchAll();
    mutate("/obras", data);
    return data;
  } catch (error) {
    console.log("Failed to fetch obras data:", error);
    throw error;
  }
}

export function useObrasData() {
  return useSWR("/obras", fetchAllObrasData);
}
