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
      className={`cursor-pointer border transition-all duration-200 bg-white text-gray-800 shadow-md rounded-lg p-6 mb-4 hover:shadow-xl ${
        selectedId?._id === addressInfo?._id
          ? "border-blue-500"
          : "border-gray-200"
      }`}
    >
      <div className="space-y-2">
        <p className="text-lg font-semibold">
          Address: <span className="font-normal">{addressInfo?.address}</span>
        </p>
        <p>
          City: <span className="font-normal">{addressInfo?.city}</span>
        </p>
        <p>
          Pincode: <span className="font-normal">{addressInfo?.pincode}</span>
        </p>
        <p>
          Phone: <span className="font-normal">{addressInfo?.phone}</span>
        </p>
        {addressInfo?.notes && (
          <p className="italic">
            Notes: <span className="font-normal">{addressInfo?.notes}</span>
          </p>
        )}
      </div>
      <div className="flex justify-end space-x-4 mt-4">
        <button 
          onClick={() => handleEditAddress(addressInfo)} 
          className="btn btn-primary btn-sm flex items-center gap-1"
        >
          <FaEdit /> Edit
        </button>
        <button 
          onClick={() => handleDeleteAddress(addressInfo)} 
          className="btn btn-error btn-sm flex items-center gap-1"
        >
          <FaTrash /> Delete
        </button>
      </div>
    </div>
  );
}

export default AddressCard;
