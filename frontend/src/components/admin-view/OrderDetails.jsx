import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import CommonForm from '../common/form';
import {
  fetchAllOrdersOfAllUsers,
  fetchOrderDetailsForAdmin,
  updateOrderStatusForAdmin,
} from '../../store/admin/orderSlice/index';

const initialFormData = {
  status: '',
};

function OrderDetails({ orderDetails }) {
  const [formData, setFormData] = useState(initialFormData);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleUpdateStatus = (event) => {
    event.preventDefault();
    const { status } = formData;

    dispatch(updateOrderStatusForAdmin({ id: orderDetails?._id, orderStatus: status }))
      .then((data) => {
        if (data?.payload?.success) {
          // Refresh order details and all orders
          dispatch(fetchOrderDetailsForAdmin(orderDetails?._id));
          dispatch(fetchAllOrdersOfAllUsers());
          setFormData(initialFormData);
        } else {
          toast.error('Failed to update order status');
        }
      });
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 text-black space-y-6">
      {/* Header */}
      <h2 className="text-2xl font-bold">Order Details</h2>
      <hr />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <p>
            <span className="font-semibold">Order ID:</span> {orderDetails?._id}
          </p>
          <p>
            <span className="font-semibold">Order Date:</span>{' '}
            {orderDetails?.orderDate?.split('T')[0]}
          </p>
          <p>
            <span className="font-semibold">Total Price:</span> ${orderDetails?.totalAmount}
          </p>
        </div>
        <div className="space-y-2">
          <p>
            <span className="font-semibold">Payment Method:</span> {orderDetails?.paymentMethod}
          </p>
          <p>
            <span className="font-semibold">Payment Status:</span> {orderDetails?.paymentStatus}
          </p>
          <p className="flex items-center gap-2">
            <span className="font-semibold">Order Status:</span>
            <span
              className={`px-2 py-1 rounded-lg text-white ${
                orderDetails?.orderStatus === 'confirmed'
                  ? 'bg-green-500'
                  : orderDetails?.orderStatus === 'rejected'
                  ? 'bg-red-500'
                  : orderDetails?.orderStatus === 'delivered'
                  ? 'bg-green-600'
                  : 'bg-blue-500'
              }`}
            >
              {orderDetails?.orderStatus}
            </span>
          </p>
        </div>
      </div>

      <hr />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Order Items */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Order Items</h3>
          <ul className="space-y-2">
            {orderDetails?.cartItems?.map((item, index) => (
              <li key={index} className="flex justify-between border-b border-gray-300 pb-2">
                <span>
                  {item.title} (x{item.quantity})
                </span>
                <span>${item.price}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Shipping Info */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Shipping Info</h3>
          <p className="font-medium">{user?.userName}</p>
          <p>{orderDetails?.addressInfo?.address}</p>
          <p>
            {orderDetails?.addressInfo?.city}, {orderDetails?.addressInfo?.pincode}
          </p>
          <p>{orderDetails?.addressInfo?.phone}</p>
          <p>{orderDetails?.addressInfo?.notes}</p>
        </div>
      </div>

      <hr />

      <div>
        <CommonForm
          formControls={[
            {
              label: 'Order Status',
              name: 'status',
              componentType: 'select',
              options: [
                { id: 'pending', label: 'Pending' },
                { id: 'inProcess', label: 'In Process' },
                { id: 'inShipping', label: 'In Shipping' },
                { id: 'delivered', label: 'Delivered' },
                { id: 'rejected', label: 'Rejected' },
              ],
            },
          ]}
          formData={formData}
          setFormData={setFormData}
          buttonText={'Update Order Status'}
          onSubmit={handleUpdateStatus}
        />
      </div>
    </div>
  );
}

export default OrderDetails;
