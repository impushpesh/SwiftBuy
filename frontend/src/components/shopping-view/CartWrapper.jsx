import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { FaShoppingCart } from "react-icons/fa";
import CartItems from "./CartItems";

function CartWrapper({ cartItems, setOpenCartSheet }) {
  const navigate = useNavigate();

  const totalCartAmount =
    cartItems && cartItems.length > 0
      ? cartItems.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0 ? currentItem?.salePrice : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg max-w-md">
      <div className="flex items-center justify-between border-b pb-2 mb-4">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <FaShoppingCart /> Your Cart
        </h2>
      </div>
      <div className="space-y-4">
        {cartItems && cartItems.length > 0 ? (
          cartItems.map((item) => <CartItems key={item.productId} cartItem={item} />)
        ) : (
          <p className="text-center text-gray-500">Your cart is empty</p>
        )}
      </div>
      <div className="mt-4">
        <div className="flex justify-between font-bold text-lg">
          <span>Total:</span>
          <span>${totalCartAmount.toFixed(2)}</span>
        </div>
      </div>
      <button
        onClick={() => {
          if (cartItems.length === 0) {
            toast.error("Your cart is empty!");
            return;
          }
          navigate("/shop/checkout");
          setOpenCartSheet(false);
        }}
        className="btn btn-primary w-full mt-4"
      >
        Checkout
      </button>
    </div>
  );
}

export default CartWrapper;