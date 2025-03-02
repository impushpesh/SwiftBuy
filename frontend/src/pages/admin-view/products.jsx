import React, { useEffect, useState } from 'react';
import CommonForm from '../../components/common/form';
import { addProductFormElements } from '../../config/index';
import ProductImageUpload from '../../components/admin-view/imageUpload';
import { useDispatch, useSelector } from 'react-redux';
import AdminProductTile from '../../components/admin-view/productTile';
import {
  addNewProduct,
  fetchAllProducts,
  removeProduct,
  updateProduct,
} from '../../store/admin/productSlice/index';

const initialFormData = {
  image: null,
  title: '',
  description: '',
  category: '',
  brand: '',
  price: '',
  salePrice: '',
  totalStock: '',
  averageReview: 0,
};

function AdminProducts() {
  const [openCreateProductsDialog, setOpenCreateProductsDialog] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState('');
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null);

  const { productList } = useSelector((state) => state.adminProducts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  function onSubmit(event) {
    event.preventDefault();
    
    if (currentEditedId !== null) {
      dispatch(updateProduct({ id: currentEditedId, formData })).then((data) => {
        if (data?.payload?.success) {
          dispatch(fetchAllProducts());
          setFormData(initialFormData);
          setOpenCreateProductsDialog(false);
          setCurrentEditedId(null);
        }
      });
    } else {
      dispatch(addNewProduct({ ...formData, image: uploadedImageUrl })).then((data) => {
        if (data?.payload?.success) {
          dispatch(fetchAllProducts());
          setOpenCreateProductsDialog(false);
          setImageFile(null);
          setFormData(initialFormData);
        }
      });
    }
  }

  function handleDelete(productId) {
    dispatch(removeProduct(productId)).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllProducts());
      }
    });
  }

  return (
    <div>
      <div className="mb-5 w-full flex justify-end">
        <label
          htmlFor="my-drawer-4"
          className="btn bg-slate-900 text-white hover:bg-gray-50 hover:text-black"
          onClick={() => setOpenCreateProductsDialog(true)}
        >
          Add New Product
        </label>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {productList && productList.length > 0
          ? productList.map((product) => (
              <AdminProductTile
                key={product.id}
                setFormData={setFormData}
                setOpenCreateProductsDialog={setOpenCreateProductsDialog}
                setCurrentEditedId={setCurrentEditedId}
                product={product}
                handleDelete={handleDelete}
              />
            ))
          : <p>No products available</p>}
      </div>
      <div className="drawer drawer-end">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
            onClick={() => setOpenCreateProductsDialog(false)}
          ></label>
          <div className="menu text-base-content min-h-full w-80 p-4 bg-slate-50">
            <h2 className="text-xl text-black font-bold mb-4">
              {currentEditedId !== null ? 'Edit Product' : 'Add New Product'}
            </h2>
            <ProductImageUpload
              imageFile={imageFile}
              setImageFile={setImageFile}
              uploadedImageUrl={uploadedImageUrl}
              setUploadedImageUrl={setUploadedImageUrl}
              setImageLoadingState={setImageLoadingState}
              imageLoadingState={imageLoadingState}
              isEditMode={currentEditedId !== null}
            />
            <CommonForm
              formControls={addProductFormElements}
              formData={formData}
              setFormData={setFormData}
              onSubmit={onSubmit}
              buttonText={currentEditedId !== null ? 'Edit' : 'Add'}
              isBtnDisabled={Object.values(formData).some((val) => val === '')}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminProducts;
