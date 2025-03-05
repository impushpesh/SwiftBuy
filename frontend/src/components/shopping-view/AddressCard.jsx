import { FaEdit, FaTrash } from "react-icons/fa";

function AddressCard({
  addressInfo,
  handleDeleteAddress,
  handleEditAddress,
  setCurrentSelectedAddress,
  selectedId,
}) {
  return (
    <div
      onClick={
        setCurrentSelectedAddress
          ? () => setCurrentSelectedAddress(addressInfo)
          : null
      }
      className={`card border cursor-pointer shadow-md p-4 transition-all duration-200 bg-green-500 text-black ${
        selectedId?._id === addressInfo?._id
          ? "border-red-900 border-4"
          : "border-gray-300"
      }`}
    >
      <div className="card-body">
        <p className="text-lg font-semibold">Address: {addressInfo?.address}</p>
        <p>City: {addressInfo?.city}</p>
        <p>Pincode: {addressInfo?.pincode}</p>
        <p>Phone: {addressInfo?.phone}</p>
        <p>Notes: {addressInfo?.notes}</p>
      </div>
      <div className="card-actions flex justify-between p-3">
        <button 
          onClick={() => handleEditAddress(addressInfo)} 
          className="btn btn-primary flex items-center gap-2"
        >
          <FaEdit /> Edit
        </button>
        <button 
          onClick={() => handleDeleteAddress(addressInfo)} 
          className="btn btn-error flex items-center gap-2"
        >
          <FaTrash /> Delete
        </button>
      </div>
    </div>
  );
}

export default AddressCard;
