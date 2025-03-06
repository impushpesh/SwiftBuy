import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaInfoCircle } from "react-icons/fa";
import {
  fetchAllOrdersOfAllUsers,
  fetchOrderDetailsForAdmin,
  resetOrderDetails,
} from "../../store/admin/orderSlice";
import OrderDetails from "./OrderDetails";

function Order() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { orderList, orderDetails } = useSelector((state) => state.adminOrder);
  const dispatch = useDispatch();

  function handleFetchOrderDetails(getId) {
    dispatch(fetchOrderDetailsForAdmin(getId));
  }

  useEffect(() => {
    dispatch(fetchAllOrdersOfAllUsers());
  }, [dispatch]);

  useEffect(() => {
    if (orderDetails !== null) setOpenDetailsDialog(true);
  }, [orderDetails]);

  return (
    <div className="p-4">
      <div className="card bg-white shadow-2xl">
        <div className="card-body">
          <h2 className="card-title text-black">All Orders</h2>
          <div className="overflow-x-auto">
            <table className="table w-full text-black">
              <thead>
                <tr>
                  <th className="text-black">Order ID</th>
                  <th className="text-black">Order Date</th>
                  <th className="text-black">Order Status</th>
                  <th className="text-black">Order Price</th>
                  <th className="text-black">Details</th>
                </tr>
              </thead>
              <tbody>
                {orderList && orderList.length > 0 ? (
                  orderList.map((orderItem) => (
                    <tr key={orderItem?._id}>
                      <td>{orderItem?._id}</td>
                      <td>{orderItem?.orderDate.split("T")[0]}</td>
                      <td>
                        <span
                          className={`badge py-2 px-4 ${
                            orderItem?.orderStatus === "confirmed"
                              ? "badge-success"
                              : orderItem?.orderStatus === "rejected"
                              ? "badge-error"
                              : "badge-neutral"
                          }`}
                        >
                          {orderItem?.orderStatus}
                        </span>
                      </td>
                      <td>${orderItem?.totalAmount}</td>
                      <td>
                        <button
                          className="btn btn-dash btn-success btn-sm text-white" 
                          onClick={() => handleFetchOrderDetails(orderItem?._id)}
                        >
                          <FaInfoCircle /> View Details
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-4">No orders found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {openDetailsDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="card w-100 bg-white p-4 shadow-lg relative max-h-[80vh] overflow-y-auto">
            <button
              className="absolute top-2 right-2 text-xl"
              onClick={() => {
                setOpenDetailsDialog(false);
                dispatch(resetOrderDetails());
              }}
            >
              ✖
            </button>
            <OrderDetails orderDetails={orderDetails} />
          </div>
        </div>
      )}

    </div>
  );
}

export default Order;