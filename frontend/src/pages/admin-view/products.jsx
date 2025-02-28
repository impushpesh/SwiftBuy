import React, { useState } from 'react';
import CommonForm from '../../components/common/form';
import { addProductFormElements } from '../../config/index';
import ProductImageUpload from '../../components/admin-view/imageUpload';
function AdminProducts() {
  const [formData, setFormData] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form Data:', formData);
  };

  return (
    <div>
      <div className="drawer drawer-end">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
          <label htmlFor="my-drawer-4" className="drawer-button btn bg-slate-900 hover:bg-gray-50 hover:text-black">
            Add Product
          </label>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
          <div className="menu bg-base-200 text-base-content min-h-full w-80 p-4 bg-slate-50">
            <h2 className="text-xl text-black font-bold mb-4">Add New Product</h2>
            <ProductImageUpload />
            <CommonForm
              formControls={addProductFormElements}
              formData={formData}
              setFormData={setFormData}
              onSubmit={handleSubmit}
              buttonText="Add Product"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminProducts;
