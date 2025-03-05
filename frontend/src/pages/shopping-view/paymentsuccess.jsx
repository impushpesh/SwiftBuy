import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

function PaymentSuccessPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-10">
      <div className="card bg-base-100 shadow-xl p-10 text-center">
        <div className="flex flex-col items-center">
          <FaCheckCircle className="text-green-500 text-6xl mb-4" />
          <h2 className="text-4xl font-bold">Payment is Successful!</h2>
          <button 
            className="btn btn-primary mt-5"
            onClick={() => navigate("/shop/account")}
          >
            View Orders
          </button>
        </div>
      </div>
    </div>
  );
}

export default PaymentSuccessPage;
