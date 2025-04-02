import { create } from "zustand";
import { persist } from "zustand/middleware";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useProductStore = create(
  persist((set) => ({
    allProducts: null,
    isLoading: false,
    otherProducts: null,
    fetchProducts: async () => {
      set({ isLoading: true });
      try {
        const { data } = await axiosInstance.get("/products");
        set({ allProducts: data });
      } catch {
        toast.error("Error fetching products!");
      } finally {
        set({ isLoading: false });
      }
    },

    fetchOtherProducts: async (currentProductId) => {
      try {
        const { data } = await axiosInstance.get("/products");
        set({
          otherProducts: data.filter((item) => item._id !== currentProductId),
        });
      } catch {
        console.log("Failed to load other products!");
      }
    },
  }))
);
