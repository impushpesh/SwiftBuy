import React, { useState } from "react";
import Address from "../../components/shopping-view/Address";
import image from "../../assets/account.jpg";
import CartItems from "../../components/shopping-view/CartItems";
import { useDispatch, useSelector } from "react-redux";
import { createNewOrder } from "../../store/shopSlice/orderSlice/index.js";
import { toast } from "react-hot-toast";
import { Navigate } from "react-router-dom";
import { FaPaypal } from "react-icons/fa";

function ShoppingCheckout() {
  const cartItems = useSelector((state) => state.shopCart.cartItems);
  const { user } = useSelector((state) => state.auth);
  const { approvalURL } = useSelector((state) => state.shopOrder);
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const [isPaymentStart, setIsPaymentStart] = useState(false);
  const dispatch = useDispatch();
  console.log("Cart Items:", cartItems);

  const totalCartAmount =
      cartItems?.length > 0
      ? cartItems.reduce(
          (sum, item) =>
            sum + (item?.salePrice > 0 ? item?.salePrice : item?.price) * item?.quantity,
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
    <div className="flex flex-col w-full">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img src={image} className="h-full w-full object-cover object-center" alt="Checkout" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5">
        <Address
          selectedId={currentSelectedAddress}
          setCurrentSelectedAddress={setCurrentSelectedAddress}
        />
        <div className="flex flex-col gap-4">
          {cartItems?.length > 0  &&
            cartItems.map((item) => <CartItems key={item.productId} cartItem={item} />)}
          <div className="mt-8 space-y-4">
            <div className="flex justify-between">
              <span className="font-bold">Total</span>
              <span className="font-bold">${totalCartAmount.toFixed(2)}</span>
            </div>
          </div>
          <div className="mt-4 w-full">
            <button
              onClick={handleInitiatePaypalPayment}
              className="btn btn-primary w-full flex items-center justify-center gap-2"
            >
              <FaPaypal size={20} />
              {isPaymentStart ? "Processing Paypal Payment..." : "Checkout with Paypal"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCheckout;
