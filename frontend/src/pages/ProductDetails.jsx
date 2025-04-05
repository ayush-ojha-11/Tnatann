import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useProductStore } from "../store/useProductStore.js";
import { useAuthStore } from "../store/useAuthStore.js";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const ProductDetails = () => {
  const { id } = useParams();
  const { authUser } = useAuthStore();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { otherProducts, fetchOtherProducts } = useProductStore();

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
        fetchOtherProducts(id);
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
            <a
              href={`mailto:${product.seller.email}`}
              className=" btn btn-primary w-full h-10 cursor-pointer rounded-lg"
            >
              Contact Seller - {product.seller.name}
            </a>
          </div>
        </div>
      </div>

      {otherProducts && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Other Products</h3>
          <Carousel
            showArrows={true}
            showThumbs={false}
            infiniteLoop={true}
            autoPlay={true}
            interval={2000}
          >
            {otherProducts.map((item) => (
              <div key={item._id} className="p-10 shadow rounded-lg h-auto">
                <Link to={`/products/${item._id}`}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-40 object-contain rounded"
                  />
                  <h4 className="text-base-content font-semibold mt-2">
                    {item.title}
                  </h4>
                  <p className="text-primary font-bold">₹{item.price}</p>
                </Link>
              </div>
            ))}
          </Carousel>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
