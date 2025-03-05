import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { captureOrderPayment } from "../../store/shopSlice/orderSlice/index.js";

function PaypalReturnPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const paymentId = params.get("paymentId");
  const payerId = params.get("PayerID");

  useEffect(() => {
    if (paymentId && payerId) {
      const orderId = JSON.parse(sessionStorage.getItem("currentOrderId"));
      
      dispatch(capturePayment({ paymentId, payerId, orderId })).then((data) => {
        if (data?.payload?.success) {
          sessionStorage.removeItem("currentOrderId");
          window.location.href = "/shop/payment-success";
        }
      });
    }
  }, [paymentId, payerId, dispatch]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="card bg-base-100 shadow-xl p-10 text-center">
        <h2 className="text-2xl font-bold">Processing Payment... Please wait!</h2>
        <span className="loading loading-spinner loading-lg mt-4"></span>
      </div>
    </div>
  );
}

export default PaypalReturnPage;