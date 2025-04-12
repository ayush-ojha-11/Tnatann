import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Edit, LogOut, Trash } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore.js";

import { useAdminStore } from "../store/useAdminStore.js";

const SellerDashboard = () => {
  const navigate = useNavigate();
  const { authUser, changeRole, logout } = useAuthStore();
  const {
    deleteAProduct,
    isDeleting,
    isLoading,
    fetchProductsOfSeller,
    productsOfASeller,
  } = useAdminStore();

  useEffect(() => {
    if (!authUser) {
      navigate("/login");
    }
  }, [authUser, navigate]);

  useEffect(() => {
    if (authUser && authUser.role === "seller") fetchProductsOfSeller();
  }, [authUser, fetchProductsOfSeller]);

  const changeRoleToSeller = () => {
    changeRole();
  };

  const handleDelete = (productId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this ad?"
    );
    if (!confirmDelete) return;
    deleteAProduct(productId);
  };

  const handleEdit = (product) => {
    navigate("/editAd", {
      state: {
        product,
      },
    });
  };

  return authUser?.role === "seller" ? (
    <div className="mx-auto p-4 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h2 className="md:text-xl font-bold">Seller Dashboard</h2>
        <div className="space-x-3">
          <Link to="/post-ad" className="btn btn-primary">
            Post new Ad
          </Link>
          <button className="btn btn-error" onClick={() => logout()}>
            Logout <LogOut className="size-5" />
          </button>
        </div>
      </div>

      <h2 className="text-xl font-medium mb-4 text-center">All your Ads</h2>

      {isLoading ? (
        <p className="text-center text-lg text-base-content">Loading...</p>
      ) : productsOfASeller?.length === 0 ? (
        <p className="text-center text-lg text-base-content">
          No products listed yet.
        </p>
      ) : !isDeleting ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {productsOfASeller?.map((product) => (
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
                  <button
                    className="btn btn-primary btn-ghost"
                    onClick={() => handleEdit(product)}
                  >
                    <Edit className="size-5" />
                    Edit
                  </button>

                  <button
                    className="btn btn-error btn-ghost"
                    onClick={() => handleDelete(product._id)}
                  >
                    <Trash /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <h1 className="text-center text-lg">
          Please wait, deleting your Ad...
        </h1>
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
