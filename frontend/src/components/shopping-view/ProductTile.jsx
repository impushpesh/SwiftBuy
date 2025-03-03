import { brandOptionsMap, categoryOptionsMap } from "../../config/index.js";
import { FaShoppingCart } from "react-icons/fa";
import { MdOutlineError } from "react-icons/md";
import { Badge, Button, Card } from "daisyui";

function ShoppingViewProductTile({ product, handleGetProductDetails, handleAddtoCart }) {
  return (
    <Card className="w-full max-w-sm mx-auto shadow-lg border border-gray-200">
      <div onClick={() => handleGetProductDetails(product?._id)} className="cursor-pointer">
        <div className="relative">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-[300px] object-cover rounded-t-lg"
          />
          {product?.totalStock === 0 ? (
            <Badge className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md">
              Out Of Stock
            </Badge>
          ) : product?.totalStock < 10 ? (
            <Badge className="absolute top-2 left-2 bg-yellow-500 text-white px-2 py-1 rounded-md">
              {`Only ${product?.totalStock} left`}
            </Badge>
          ) : product?.salePrice > 0 ? (
            <Badge className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded-md">
              Sale
            </Badge>
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
          <Button disabled className="w-full bg-gray-400 cursor-not-allowed flex items-center justify-center">
            <MdOutlineError className="mr-2" /> Out Of Stock
          </Button>
        ) : (
          <Button
            onClick={() => handleAddtoCart(product?._id, product?.totalStock)}
            className="w-full bg-blue-500 text-white hover:bg-blue-600 flex items-center justify-center"
          >
            <FaShoppingCart className="mr-2" /> Add to Cart
          </Button>
        )}
      </div>
    </Card>
  );
}

export default ShoppingViewProductTile;
