import { MapPin, Trash } from "lucide-react";
import { useAdminStore } from "../store/useAdminStore";
const ProductCardAdmin = ({ product }) => {
  const { deleteAProduct, isDeleting } = useAdminStore();

  return (
    <div className="bg-base-300 shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-40 object-contain m-2 mix-blend-normal"
      />
      <div className="p-4">
        <h3 className="text-lg font-bold">{product.title}</h3>
        <p className="text-base-content/70 text-sm">
          Seller: {product.seller.name}
        </p>

        <div className="flex justify-between">
          <p className="text-green-600 font-medium mt-3">
            <span className="text-base-content">Price -</span> ₹{product.price}
          </p>

          <span className="flex items-center mt-3 gap-0.5">
            <MapPin className="size-5" /> {product.seller.location}
          </span>
        </div>
        <button
          onClick={() => {
            deleteAProduct(product._id);
          }}
          disabled={isDeleting}
          className="btn bg-red-600 hover:bg-red-700 text-white text-sm mt-3 w-full"
        >
          {isDeleting ? (
            "Deleting product..."
          ) : (
            <>
              <Trash className="size-5" /> Delete
            </>
          )}
        </button>
      </div>
    </div>
  );
};
export default ProductCardAdmin;
