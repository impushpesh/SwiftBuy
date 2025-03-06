import { useSelector } from "react-redux";
import { FaBox } from "react-icons/fa";
import { IoMdCash } from "react-icons/io";
import { MdLocalShipping } from "react-icons/md";
import { AiOutlineCalendar } from "react-icons/ai";

function ShoppingOrderDetailsView({ orderDetails }) {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white shadow-xl rounded-xl">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Order Details</h2>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center border-b pb-3">
          <span className="font-semibold flex items-center gap-2 text-gray-600">
            <FaBox className="text-lg" /> Order ID
          </span>
          <span className="badge bg-gray-200 text-gray-700 px-3 py-1 rounded-full">
            {orderDetails?._id}
          </span>
        </div>
        
        <div className="flex justify-between items-center border-b pb-3">
          <span className="font-semibold flex items-center gap-2 text-gray-600">
            <AiOutlineCalendar className="text-lg" /> Order Date
          </span>
          <span className="text-gray-800">
            {orderDetails?.orderDate.split("T")[0]}
          </span>
        </div>
        
        <div className="flex justify-between items-center border-b pb-3">
          <span className="font-semibold flex items-center gap-2 text-gray-600">
            <IoMdCash className="text-lg" /> Order Price
          </span>
          <span className="text-gray-800 font-medium">
            ${orderDetails?.totalAmount}
          </span>
        </div>
        
        <div className="flex justify-between items-center border-b pb-3">
          <span className="font-semibold text-gray-600">Payment Method</span>
          <span className="text-gray-800">{orderDetails?.paymentMethod}</span>
        </div>
        
        <div className="flex justify-between items-center border-b pb-3">
          <span className="font-semibold text-gray-600">Payment Status</span>
          <span className="text-gray-800">{orderDetails?.paymentStatus}</span>
        </div>
        
        <div className="flex justify-between items-center border-b pb-3">
          <span className="font-semibold text-gray-600">Order Status</span>
          <span
            className={`badge px-4 py-1 text-white rounded-full ${
              orderDetails?.orderStatus === "confirmed"
                ? "bg-green-500"
                : orderDetails?.orderStatus === "rejected"
                ? "bg-red-500"
                : "bg-gray-500"
            }`}
          >
            {orderDetails?.orderStatus}
          </span>
        </div>
      </div>
      
      <div className="mt-6 border-t pt-4">
        <h3 className="font-semibold mb-3 text-gray-800">Order Items</h3>
        <ul className="space-y-3">
          {orderDetails?.cartItems?.map((item, index) => (
            <li
              key={index}
              className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <span className="text-gray-700 font-medium">{item.title}</span>
              <span className="text-gray-600">Qty: {item.quantity}</span>
              <span className="text-gray-800 font-semibold">${item.price}</span>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="mt-6 border-t pt-4">
        <h3 className="font-semibold mb-3 text-gray-800 flex items-center gap-2">
          <MdLocalShipping className="text-lg" /> Shipping Info
        </h3>
        <div className="text-gray-700 space-y-1">
          <p className="font-medium">{user?.userName}</p>
          <p>{orderDetails?.addressInfo?.address}</p>
          <p>
            {orderDetails?.addressInfo?.city},{" "}
            {orderDetails?.addressInfo?.pincode}
          </p>
          <p>{orderDetails?.addressInfo?.phone}</p>
          {orderDetails?.addressInfo?.notes && (
            <p className="italic">{orderDetails?.addressInfo?.notes}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ShoppingOrderDetailsView;
