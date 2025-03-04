import { brandOptionsMap, categoryOptionsMap } from "../../config/index.js";
import { FaShoppingCart } from "react-icons/fa";
import { MdOutlineError } from "react-icons/md";

function ShoppingViewProductTile({ product, handleGetProductDetails, handleAddtoCart }) {
  return (
    <div className="card w-full max-w-sm mx-auto shadow-lg border border-gray-200">
      <div onClick={() => handleGetProductDetails(product?._id)} className="cursor-pointer">
        <div className="relative">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-[300px] object-cover rounded-t-lg"
          />
          {product?.totalStock === 0 ? (
            <span className="badge absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md">
              Out Of Stock
            </span>
          ) : product?.totalStock < 10 ? (
            <span className="badge absolute top-2 left-2 bg-yellow-500 text-white px-2 py-1 rounded-md">
              {`Only ${product?.totalStock} left`}
            </span>
          ) : product?.salePrice > 0 ? (
            <span className="badge absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded-md">
              Sale
            </span>
          ) : null}
        </div>
        <div className="p-4">
          <h2 className="text-xl font-bold mb-2">{product?.title}</h2>
          <div className="flex justify-between items-center text-gray-600 text-sm mb-2">
            <span>{categoryOptionsMap[product?.category]}</span>
            <span>{brandOptionsMap[product?.brand]}</span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className={`text-lg font-semibold ${product?.salePrice > 0 ? "line-through text-gray-500" : "text-primary"}`}>
              ${product?.price}
            </span>
            {product?.salePrice > 0 && (
              <span className="text-lg font-semibold text-green-600">
                ${product?.salePrice}
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="p-4">
        {product?.totalStock === 0 ? (
          <button disabled className="btn w-full bg-gray-400 cursor-not-allowed flex items-center justify-center">
            <MdOutlineError className="mr-2" /> Out Of Stock
          </button>
        ) : (
          <button
            onClick={() => handleAddtoCart(product?._id, product?.totalStock)}
            className="btn w-full bg-blue-500 text-white hover:bg-blue-600 flex items-center justify-center"
          >
            <FaShoppingCart className="mr-2" /> Add to Cart
          </button>
        )}
      </div>
    </div>
  );
}


export default ShoppingViewProductTile;
