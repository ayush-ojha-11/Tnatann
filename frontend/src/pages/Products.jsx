import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore.js";
import { useNavigate } from "react-router-dom";
import { useProductStore } from "../store/useProductStore.js";

import Skeleton from "../components/skeletons/Skeleton";
import ProductCard from "../components/ProductCard";

const Products = () => {
  const navigate = useNavigate();
  const { authUser } = useAuthStore();
  const { allProducts, isLoading, fetchProducts } = useProductStore();

  useEffect(() => {
    if (!authUser) {
      navigate("/login");
    }
  }, [authUser, navigate]);

  useEffect(() => {
    if (!allProducts) fetchProducts();
  }, [allProducts, fetchProducts]);

  return (
    <div className="container min-h-screen mx-auto p-4 ">
      <h2 className="text-xl font-bold text-base-content/80 mb-6 mt-2 text-center">
        {allProducts?.length === 0 ? "No Ads right now" : "Products / Ads"}
      </h2>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} classname="w-full h-64 rounded-lg bg-base-200" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {!allProducts ? (
            <p className="text-center col-span-full text-content">
              No ads found.
            </p>
          ) : (
            allProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Products;
