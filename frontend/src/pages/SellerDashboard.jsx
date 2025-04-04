import React, { useEffect, useState } from "react";
import { axiosInstance } from "../lib/axios.js";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { Edit, Trash } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore.js";

const SellerDashboard = () => {
  const { authUser, changeRole } = useAuthStore();
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axiosInstance.get("products/seller/products");
        setProducts(data);
      } catch (error) {
        toast.error(error.response.data.message);
      } finally {
        setLoading(false);
      }
    };
    if (authUser.role === "seller") fetchProducts();
  }, [authUser.role]);

  const changeRoleToSeller = () => {
    changeRole();
  };

  return authUser.role === "seller" ? (
    <div className="mx-auto p-4 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Seller Dashboard</h2>
        <Link to="/post-ad">
          <button className="btn btn-primary m-3">Post New Ad</button>
        </Link>
      </div>

      <h2 className="text-xl font-medium mb-4 text-center">All your Ads</h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : products.length === 0 ? (
        <p className="text-center text-gray-500">No products listed yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-base-300 shadow-lg rounded-lg overflow-hidden"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-48 object-contain"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold truncate">
                  {product.title}
                </h3>
                <p className="font-bold text-green-600">₹{product.price}</p>
                <p className="text-sm text-base-content/70">
                  {product.category}
                </p>
                <div className="flex justify-between mt-4">
                  <Link to={`/edit-ad/${product._id}`}>
                    <button className="btn btn-primary btn-ghost">
                      <Edit className="size-5" /> Edit
                    </button>
                  </Link>
                  <button className="btn btn-error btn-ghost">
                    <Trash /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  ) : (
    <div className="text-center h-screen flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold">Want to be a seller?</h1>
      <button className="btn btn-primary w-35 m-2" onClick={changeRoleToSeller}>
        Change Role
      </button>
    </div>
  );
};

export default SellerDashboard;
