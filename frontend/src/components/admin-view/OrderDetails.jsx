import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
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
          dispatch(fetchOrderDetailsForAdmin(orderDetails?._id));
          dispatch(fetchAllOrdersOfAllUsers());
          setFormData(initialFormData);
          toast.success(data?.payload?.message);
        } else {
          toast.error('Failed to update order status');
        }
      });
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Order Details</h2>
      <div className="space-y-2">
        <p><span className="font-medium">Order ID:</span> {orderDetails?._id}</p>
        <p><span className="font-medium">Order Date:</span> {orderDetails?.orderDate?.split('T')[0]}</p>
        <p><span className="font-medium">Total Price:</span> ${orderDetails?.totalAmount}</p>
        <p><span className="font-medium">Payment Method:</span> {orderDetails?.paymentMethod}</p>
        <p><span className="font-medium">Payment Status:</span> {orderDetails?.paymentStatus}</p>
        <p className="flex items-center gap-2">
          <span className="font-medium">Order Status:</span>
          <span className={`px-2 py-1 rounded-lg text-white ${
            orderDetails?.orderStatus === 'confirmed' ? 'bg-green-500' :
            orderDetails?.orderStatus === 'rejected' ? 'bg-red-500' : 'bg-gray-500'
          }`}>
            {orderDetails?.orderStatus}
          </span>
        </p>
      </div>

      <div className="divider my-4"></div>

      <h3 className="font-medium mb-2">Order Items</h3>
      <ul className="space-y-2">
        {orderDetails?.cartItems?.map((item, index) => (
          <li key={index} className="flex justify-between border-b pb-2">
            <span>{item.title} (x{item.quantity})</span>
            <span>${item.price}</span>
          </li>
        ))}
      </ul>

      <div className="divider my-4"></div>

      <h3 className="font-medium mb-2">Shipping Info</h3>
      <div className="text-gray-700">
        <p>{user?.userName}</p>
        <p>{orderDetails?.addressInfo?.address}</p>
        <p>{orderDetails?.addressInfo?.city}, {orderDetails?.addressInfo?.pincode}</p>
        <p>{orderDetails?.addressInfo?.phone}</p>
        <p>{orderDetails?.addressInfo?.notes}</p>
      </div>

      <div className="divider my-4"></div>

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
  );
}

export default OrderDetails;
