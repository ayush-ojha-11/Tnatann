import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/useAuthStore.js";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import RelatedProducts from "../components/RelatedProducts.jsx";
import { useAdminStore } from "../store/useAdminStore.js";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const ProductDetails = () => {
  const { id } = useParams();
  const { authUser } = useAuthStore();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { otherProducts, fetchOtherProducts } = useAdminStore();
  const [showContact, setShowContact] = useState(false);

  useEffect(() => {
    if (!authUser) {
      navigate("/login");
    }
  }, [authUser, navigate]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axiosInstance.get(`/products/${id}`);
        setProduct(data);
        fetchOtherProducts(data);
      } catch (error) {
        console.log("Error: ", error.message);
        toast.error(error.response.data.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id, fetchOtherProducts]);

  if (loading) {
    return (
      <p className="text-center text-gray-500 min-h-screen">
        Loading product details...
      </p>
    );
  }

  if (!product) {
    return <p className="text-center text-red-500">Product not found!</p>;
  }

  return (
    <div className="container mx-auto p-4 min-h-screen">
      <div className=" flex max-w-5xl mx-auto  rounded-lg overflow-hidden ">
        <div className="p-2 flex items-center justify-center">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-25 md:h-64 object-contain"
          />
        </div>
        <div className="p-6 flex flex-col justify-between w-full">
          <div>
            <h2 className="text-2xl font-bold">{product.title}</h2>
            <p className="text-sm">{product.category}</p>
            <p className="mt-2 mb-6">₹{product.price}</p>
            <h2 className="font-semibold">Description</h2>
            <p className="text-sm text-base-content">{product.description}</p>
          </div>

          <div className="w-full mt-8 md:mt-4">
            <button
              className=" btn btn-primary w-full h-10 cursor-pointer rounded-lg"
              onClick={() => setShowContact(!showContact)}
            >
              Contact Seller - {product.seller.name}
            </button>

            {/* animation */}

            {showContact && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4 p-4 border border-gray-200 rounded-xl bg-white shadow-sm text-gray-800"
              >
                <h3 className="text-lg font-semibold mb-2">
                  Seller Contact Info
                </h3>
                <div className="space-y-1 text-sm">
                  <p>
                    <span className="font-medium">Name:</span>{" "}
                    {product.seller.name}
                  </p>
                  <p>
                    <span className="font-medium">Email:</span>{" "}
                    {product.seller.email}
                  </p>
                  <p>
                    <span className="font-medium">Phone:</span>{" "}
                    {product.seller.phone}
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      <div className="p-15">
        <h1 className="mt-10 text-center">
          {otherProducts?.length === 0
            ? "No related products"
            : "Related products/ads:"}
        </h1>
        <div className="grid grid-cols-2 lg:grid-cols-5">
          {otherProducts?.map((product) => (
            <RelatedProducts product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
