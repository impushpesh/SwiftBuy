import { useSelector } from "react-redux";
import { FaCheckCircle, FaTimesCircle, FaBox } from "react-icons/fa";
import { IoMdCash } from "react-icons/io";
import { MdLocalShipping } from "react-icons/md";
import { AiOutlineCalendar } from "react-icons/ai";

function ShoppingOrderDetailsView({ orderDetails }) {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="p-6 max-w-lg bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-4">Order Details</h2>
      <div className="space-y-3">
        <div className="flex justify-between items-center border-b pb-2">
          <span className="font-medium flex items-center gap-2">
            <FaBox /> Order ID
          </span>
          <span className="badge badge-neutral">{orderDetails?._id}</span>
        </div>
        <div className="flex justify-between items-center border-b pb-2">
          <span className="font-medium flex items-center gap-2">
            <AiOutlineCalendar /> Order Date
          </span>
          <span>{orderDetails?.orderDate.split("T")[0]}</span>
        </div>
        <div className="flex justify-between items-center border-b pb-2">
          <span className="font-medium flex items-center gap-2">
            <IoMdCash /> Order Price
          </span>
          <span>${orderDetails?.totalAmount}</span>
        </div>
        <div className="flex justify-between items-center border-b pb-2">
          <span className="font-medium flex items-center gap-2">Payment Method</span>
          <span>{orderDetails?.paymentMethod}</span>
        </div>
        <div className="flex justify-between items-center border-b pb-2">
          <span className="font-medium flex items-center gap-2">Payment Status</span>
          <span>{orderDetails?.paymentStatus}</span>
        </div>
        <div className="flex justify-between items-center border-b pb-2">
          <span className="font-medium flex items-center gap-2">Order Status</span>
          <span
            className={`badge px-3 py-1 text-white ${
              orderDetails?.orderStatus === "confirmed"
                ? "bg-green-500"
                : orderDetails?.orderStatus === "rejected"
                ? "bg-red-600"
                : "bg-gray-500"
            }`}
          >
            {orderDetails?.orderStatus}
          </span>
        </div>
      </div>
      
      <div className="mt-4 border-t pt-4">
        <h3 className="font-medium mb-2">Order Items</h3>
        <ul className="space-y-2">
          {orderDetails?.cartItems?.map((item, index) => (
            <li key={index} className="flex justify-between items-center p-2 bg-gray-100 rounded-lg">
              <span>{item.title}</span>
              <span>Qty: {item.quantity}</span>
              <span>${item.price}</span>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="mt-4 border-t pt-4">
        <h3 className="font-medium mb-2 flex items-center gap-2">
          <MdLocalShipping /> Shipping Info
        </h3>
        <div className="text-gray-700 space-y-1">
          <p>{user?.userName}</p>
          <p>{orderDetails?.addressInfo?.address}</p>
          <p>{orderDetails?.addressInfo?.city}, {orderDetails?.addressInfo?.pincode}</p>
          <p>{orderDetails?.addressInfo?.phone}</p>
          {orderDetails?.addressInfo?.notes && <p className="italic">{orderDetails?.addressInfo?.notes}</p>}
        </div>
      </div>
    </div>
  );
}

export default ShoppingOrderDetailsView;