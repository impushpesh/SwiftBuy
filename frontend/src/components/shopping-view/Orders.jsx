import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaEye } from "react-icons/fa";
import ShoppingOrderDetailsView from "./OrderDetails";
import {
  fetchAllOrdersByUser,
  fetchOrderDetails,
  resetOrderDetails,
} from "../../store/shopSlice/orderSlice/index.js";

function ShoppingOrders() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { orderList, orderDetails } = useSelector((state) => state.shopOrder);

  function handleFetchOrderDetails(getId) {
    dispatch(fetchOrderDetails(getId));
  }

  useEffect(() => {
    if (user?.id) dispatch(fetchAllOrdersByUser(user.id));
  }, [dispatch, user]);

  useEffect(() => {
    if (orderDetails) setOpenDetailsDialog(true);
  }, [orderDetails]);

  return (
    <div className="card bg-base-100 shadow-xl p-4">
      <div className="card-body">
        <h2 className="card-title text-lg font-bold">Order History</h2>
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Order Date</th>
                <th>Order Status</th>
                <th>Order Price</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {orderList && orderList.length > 0 ? (
                orderList.map((orderItem) => (
                  <tr key={orderItem._id}>
                    <td>{orderItem._id}</td>
                    <td>{orderItem.orderDate.split("T")[0]}</td>
                    <td>
                      <span
                        className={`badge px-3 py-1 text-white ${
                          orderItem.orderStatus === "confirmed"
                            ? "bg-green-500"
                            : orderItem.orderStatus === "rejected"
                            ? "bg-red-600"
                            : "bg-gray-600"
                        }`}
                      >
                        {orderItem.orderStatus}
                      </span>
                    </td>
                    <td>${orderItem.totalAmount}</td>
                    <td>
                      <button
                        className="btn btn-primary btn-sm flex items-center gap-2"
                        onClick={() => handleFetchOrderDetails(orderItem._id)}
                      >
                        <FaEye /> View Details
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-4">
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {openDetailsDialog && (
        <div className="modal modal-open">
          <div className="modal-box">
            <ShoppingOrderDetailsView orderDetails={orderDetails} />
            <div className="modal-action">
              <button
                className="btn btn-error"
                onClick={() => {
                  setOpenDetailsDialog(false);
                  dispatch(resetOrderDetails());
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ShoppingOrders;