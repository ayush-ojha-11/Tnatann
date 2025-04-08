const RelatedProducts = ({ product }) => {
  return (
    <div className="rounded-lg overflow-hidden hover:bg-base-300 duration-300 p-5">
      <img
        src={product.image}
        className="w-full h-40 object-contain m-2 mix-blend-normal"
      />
      <h1 className="text-center">{product.title}</h1>
      <p className="text-center text-green-600">₹{product.price}</p>
    </div>
  );
};
export default RelatedProducts;
