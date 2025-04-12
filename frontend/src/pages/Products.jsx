import { useEffect, useState } from "react";
import { useAuthStore } from "../store/useAuthStore.js";
import { useNavigate } from "react-router-dom";

import Skeleton from "../components/skeletons/Skeleton";
import ProductCard from "../components/ProductCard";
import CategoryBar from "../components/CategoryBar.jsx";
import { Search } from "lucide-react";
import { useAdminStore } from "../store/useAdminStore.js";

const Products = () => {
  const navigate = useNavigate();
  const { authUser } = useAuthStore();
  const { allProducts, isLoading, fetchProducts } = useAdminStore();
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (!authUser) {
      navigate("/login");
    }
  }, [authUser, navigate]);

  useEffect(() => {
    if (!allProducts) {
      fetchProducts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let filteredProducts =
    activeCategory === "All"
      ? allProducts
      : allProducts?.filter(
          (product) =>
            product.category?.toLowerCase() === activeCategory.toLowerCase()
        );
  // search among filtered products - i.e in respective category
  filteredProducts = filteredProducts?.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container min-h-screen mx-auto p-4">
      {/* Desktop View: Full Search Bar */}
      <div className="relative">
        <div className=" absolute z-10 flex items-center left-3 inset-y-0">
          <Search className="size-5" />
        </div>
        <input
          type="text"
          placeholder="Search products..."
          className="input input-bordered w-full pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <CategoryBar
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} classname="w-full h-64 rounded-lg bg-base-200" />
          ))}
        </div>
      ) : filteredProducts?.length === 0 ? (
        <div>
          <h1 className="text-center">No Ads/Products</h1>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {!allProducts ? (
            <p className="text-center col-span-full text-content">
              No ads found.
            </p>
          ) : (
            filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Products;
