import React, { useEffect } from "react";
import { useAdminStore } from "../../store/useAdminStore";

const ManageSellers = () => {
  const { stats, loading, fetchSellers, sellers } = useAdminStore();

  useEffect(() => {
    fetchSellers();
  }, []);

  const handleDeleteSeller = () => {};

  return (
    <div>
      <h2 className="text-3xl font-bold">Total registered sellers</h2>
      <p className="text-2xl ml-2">{stats?.totalSellers}</p>

      {loading ? (
        <h1 className="text-center">Loading all sellers...</h1>
      ) : (
        <div className="mt-6">
          <div className="space-y-4">
            {sellers?.map((seller) => (
              <div
                key={seller._id}
                className="flex justify-between items-center p-4 rounded-lg shadow-lg bg-base-100"
              >
                <div>
                  <p className="font-medium">{seller.name}</p>
                  <p className="text-sm text-base-content/50">{seller.email}</p>
                </div>
                <button
                  onClick={() => handleDeleteSeller(seller._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageSellers;
