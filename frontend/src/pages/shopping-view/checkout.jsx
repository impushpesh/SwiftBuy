import React, { useState } from "react";
import Address from "../../components/shopping-view/Address";
import image from "../../assets/account.jpg";
import CartItems from "../../components/shopping-view/CartItems";
import { useDispatch, useSelector } from "react-redux";
import { createNewOrder } from "../../store/shopSlice/orderSlice/index.js";
import { toast } from "react-hot-toast";
import { FaPaypal } from "react-icons/fa";

function ShoppingCheckout() {
  const cartItems = useSelector((state) => state.shopCart.cartItems);
  const { user } = useSelector((state) => state.auth);
  const { approvalURL } = useSelector((state) => state.shopOrder);
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const [isPaymentStart, setIsPaymentStart] = useState(false);
  const dispatch = useDispatch();

  const totalCartAmount =
    cartItems?.length > 0
      ? cartItems.reduce(
          (sum, item) =>
            sum +
            (item?.salePrice > 0 ? item?.salePrice : item?.price) * item?.quantity,
          0
        )
      : 0;

  function handleInitiatePaypalPayment() {
    if (!cartItems?.length) {
      toast.error("Your cart is empty. Please add items to proceed.");
      return;
    }
    if (!currentSelectedAddress) {
      toast.error("Please select an address to proceed.");
      return;
    }

    const orderData = {
      userId: user?.id,
      cartId: cartItems?._id,
      cartItems: cartItems.map((item) => ({
        productId: item?.productId,
        title: item?.title,
        image: item?.image,
        price: item?.salePrice > 0 ? item?.salePrice : item?.price,
        quantity: item?.quantity,
      })),
      addressInfo: {
        addressId: currentSelectedAddress?._id,
        address: currentSelectedAddress?.address,
        city: currentSelectedAddress?.city,
        pincode: currentSelectedAddress?.pincode,
        phone: currentSelectedAddress?.phone,
        notes: currentSelectedAddress?.notes,
      },
      orderStatus: "pending",
      paymentMethod: "paypal",
      paymentStatus: "pending",
      totalAmount: totalCartAmount,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      paymentId: "",
      payerId: "",
    };

    dispatch(createNewOrder(orderData)).then((data) => {
      if (data?.payload?.success) {
        setIsPaymentStart(true);
      } else {
        setIsPaymentStart(false);
      }
    });
  }

  if (approvalURL) {
    window.location.href = approvalURL;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4">
        {/* Hero Section */}
        <div className="relative h-64 md:h-80 w-full overflow-hidden rounded-lg">
          <img
            src={image}
            alt="Checkout"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-30"></div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          {/* Address Section */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Delivery Address</h2>
            <div className="bg-white p-6 rounded-lg shadow">
              <Address
                selectedId={currentSelectedAddress}
                setCurrentSelectedAddress={setCurrentSelectedAddress}
              />
            </div>
          </div>

          {/* Cart Section */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>
            <div className="bg-white p-6 rounded-lg shadow space-y-6">
              {cartItems?.length > 0 ? (
                cartItems.map((item) => (
                  <CartItems key={item.productId} cartItem={item} />
                ))
              ) : (
                <p className="text-gray-500">Your cart is empty</p>
              )}
              <div className="border-t pt-4">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total:</span>
                  <span>${totalCartAmount.toFixed(2)}</span>
                </div>
              </div>
              <button
                onClick={handleInitiatePaypalPayment}
                className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-200"
              >
                <FaPaypal size={20} />
                {isPaymentStart
                  ? "Processing Paypal Payment..."
                  : "Checkout with Paypal"}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ShoppingCheckout;
