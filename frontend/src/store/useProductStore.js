import { create } from "zustand";
import { persist } from "zustand/middleware";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useProductStore = create(
  persist(
    (set) => ({
      allProducts: null,
      productsOfASeller: null,
      isLoading: false,
      isUpdating: false,
      isDeleting: false,
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

      fetchProductsOfSeller: async () => {
        try {
          set({ isLoading: true });
          const { data } = await axiosInstance.get("products/seller/products");
          set({ productsOfASeller: data });
        } catch {
          toast.error("Error in fetching seller products!");
        } finally {
          set({ isLoading: false });
        }
      },

      deleteAProduct: async (productId) => {
        try {
          set({ isDeleting: true });
          const res = await axiosInstance.delete(`/products/${productId}`);
          toast.success(res.data.message);

          set((state) => {
            const updatedProducts = (state.allProducts || []).filter(
              (item) => item._id !== productId
            );

            const updatedSellerProducts = (
              state.productsOfASeller || []
            ).filter((item) => item._id !== productId);
            console.log("Updated allProducts after deletion:", updatedProducts);
            return {
              allProducts: updatedProducts,
              productsOfASeller: updatedSellerProducts,
            };
          });
        } catch (error) {
          console.log(
            "Error in useProductStore (deleteAProduct)",
            error.message
          );
        } finally {
          set({ isDeleting: false });
        }
      },

      updateProduct: async (product, formDataObj) => {
        try {
          set({ isUpdating: true });
          const { data: updatedProduct } = await axiosInstance.put(
            `/products/${product._id}`,
            formDataObj
          );
          if (updatedProduct) {
            toast.success("Edited successfully.");

            // Now updating the store with new product data

            set((state) => {
              const updateList = (list) =>
                list?.map((item) =>
                  item._id === updatedProduct._id ? updatedProduct : item
                );

              return {
                allProducts: updateList(state.allProducts),
                productsOfASeller: updateList(state.productsOfASeller),
              };
            });
          }
        } catch (error) {
          console.log(
            "Error in useProductStore (updateProduct)",
            error.message
          );
          toast.error("Editing failed!");
        } finally {
          set({ isUpdating: false });
        }
      },
    }),
    { name: "product-store" }
  )
);
