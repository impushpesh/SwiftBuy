import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { deleteCart, updateCart } from "../../store/shopSlice/cartSlice";
import { toast } from "react-hot-toast";

function CartItems({ cartItem }) {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { productList } = useSelector((state) => state.shopProducts);
  const dispatch = useDispatch();

  function handleUpdateQuantity(getCartItem, actionType) {
    if (actionType === "plus") {
      let getCartItems = cartItems.items || [];
      if (getCartItems.length) {
        const indexOfCurrentCartItem = getCartItems.findIndex(
          (item) => item.productId === getCartItem?.productId
        );
        const getCurrentProductIndex = productList.findIndex(
          (product) => product._id === getCartItem?.productId
        );
        const getTotalStock = productList[getCurrentProductIndex]?.totalStock;

        if (indexOfCurrentCartItem > -1) {
          const getQuantity = getCartItems[indexOfCurrentCartItem].quantity;
          if (getQuantity + 1 > getTotalStock) {
            toast.error(`Only ${getQuantity} quantity can be added for this item`);
            return;
          }
        }
      }
    }

    dispatch(
      updateCart({
        userId: user?.id,
        productId: getCartItem?.productId,
        quantity: actionType === "plus" ? getCartItem?.quantity + 1 : getCartItem?.quantity - 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        toast.success("Cart item updated successfully");
      }
    });
  }

  function handleCartItemDelete(getCartItem) {
    dispatch(deleteCart({ userId: user?.id, productId: getCartItem?.productId })).then((data) => {
      if (data?.payload?.success) {
        toast.success("Cart item deleted successfully");
      }
    });
  }

  return (
    <div className="flex items-center gap-4 p-4 border-b border-gray-300">
      <img
        src={cartItem?.image}
        alt={cartItem?.title}
        className="w-20 h-20 rounded-lg object-cover"
      />
      <div className="flex-1">
        <h3 className="font-bold text-lg">{cartItem?.title}</h3>
        <div className="flex items-center gap-2 mt-2">
          <button
            className="btn btn-circle btn-outline btn-sm"
            disabled={cartItem?.quantity === 1}
            onClick={() => handleUpdateQuantity(cartItem, "minus")}
          >
            <FaMinus />
          </button>
          <span className="font-semibold text-lg">{cartItem?.quantity}</span>
          <button
            className="btn btn-circle btn-outline btn-sm"
            onClick={() => handleUpdateQuantity(cartItem, "plus")}
          >
            <FaPlus />
          </button>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <p className="font-semibold text-lg">
          ${
            ((cartItem?.salePrice > 0 ? cartItem?.salePrice : cartItem?.price) * cartItem?.quantity).toFixed(2)
          }
        </p>
        <button
          className="btn btn-error btn-xs mt-2"
          onClick={() => handleCartItemDelete(cartItem)}
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
}

export default CartItems;