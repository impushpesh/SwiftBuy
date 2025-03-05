import { useEffect, useState } from 'react';
import CommonForm from '../common/form';
import { addressFormControls } from '../../config/index.js';
import AddressCard from './AddressCard.jsx';
import { addNewAddress, fetchAllAddresses, editaAddress, deleteAddress } from '../../store/shopSlice/addressSlice/index.js';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { MdLocationOn } from 'react-icons/md';

const initialAddressFormData = {
  address: '',
  city: '',
  phone: '',
  pincode: '',
  notes: '',
};

function Address({ setCurrentSelectedAddress, selectedId }) {
  const [formData, setFormData] = useState(initialAddressFormData);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { addressList } = useSelector((state) => state.shopAddress);

  function handleManageAddress(event) {
    event.preventDefault();

    if (addressList.length >= 3 && currentEditedId === null) {
      setFormData(initialAddressFormData);
      toast.error('You can add a maximum of 3 addresses');
      return;
    }

    const action = currentEditedId !== null
      ? editaAddress({ userId: user?.id, addressId: currentEditedId, formData })
      : addNewAddress({ ...formData, userId: user?.id });

    dispatch(action).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllAddresses(user?.id));
        setCurrentEditedId(null);
        setFormData(initialAddressFormData);
        toast.success(currentEditedId !== null ? 'Address updated successfully' : 'Address added successfully');
      }
    });
  }

  function handleDeleteAddress(getCurrentAddress) {
    dispatch(deleteAddress({ userId: user?.id, addressId: getCurrentAddress._id })).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllAddresses(user?.id));
        toast.success('Address deleted successfully');
      }
    });
  }

  function handleEditAddress(getCurrentAddress) {
    setCurrentEditedId(getCurrentAddress?._id);
    setFormData({
      address: getCurrentAddress?.address,
      city: getCurrentAddress?.city,
      phone: getCurrentAddress?.phone,
      pincode: getCurrentAddress?.pincode,
      notes: getCurrentAddress?.notes,
    });
  }

  function isFormValid() {
    return Object.values(formData).every((value) => value.trim() !== '');
  }

  useEffect(() => {
    dispatch(fetchAllAddresses(user?.id));
  }, [dispatch]);

  return (
    <div className="p-5  shadow-lg rounded-lg">
      <div className="mb-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {addressList && addressList.length > 0
          ? addressList.map((singleAddressItem) => (
              <AddressCard
                key={singleAddressItem._id}
                selectedId={selectedId}
                handleDeleteAddress={handleDeleteAddress}
                addressInfo={singleAddressItem}
                handleEditAddress={handleEditAddress}
                setCurrentSelectedAddress={setCurrentSelectedAddress}
              />
            ))
          : <p className="text-center text-gray-500">No addresses available</p>}
      </div>
      <div className="p-4 border rounded-lg shadow-md bg-white">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <MdLocationOn className="text-primary" />
          {currentEditedId !== null ? 'Edit Address' : 'Add New Address'}
        </h2>
        <CommonForm
          formControls={addressFormControls}
          formData={formData}
          setFormData={setFormData}
          buttonText={currentEditedId !== null ? 'Edit' : 'Add'}
          onSubmit={handleManageAddress}
          isBtnDisabled={!isFormValid()}
        />
      </div>
    </div>
  );
}

export default Address;