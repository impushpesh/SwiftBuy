import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFeatureImageList, addFeatureImage } from '../../store/common/index';
import ProductImageUpload from '../../components/admin-view/imageUpload';
import { toast } from 'react-hot-toast';
import { AiOutlineCloudUpload } from 'react-icons/ai';

function AdminDashboard() {
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState('');
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const dispatch = useDispatch();
  const { featureImageList } = useSelector((state) => state.commonFeature);

  useEffect(() => {
    dispatch(fetchFeatureImageList());
  }, [dispatch]);

  const handleUploadFeatureImage = async () => {
    if (!uploadedImageUrl) {
      toast.error('Please upload an image first!');
      return;
    }

    const result = await dispatch(addFeatureImage(uploadedImageUrl));
    if (result?.payload?.success) {
      dispatch(fetchFeatureImageList());
      setImageFile(null);
      setUploadedImageUrl('');
      toast.success('Image uploaded successfully!');
    } else {
      toast.error('Failed to upload image. Try again.');
    }
  };

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      <ProductImageUpload
        imageFile={imageFile}
        setImageFile={setImageFile}
        uploadedImageUrl={uploadedImageUrl}
        setUploadedImageUrl={setUploadedImageUrl}
        setImageLoadingState={setImageLoadingState}
        imageLoadingState={imageLoadingState}
        isCustomStyling={true}
      />
      <button
        onClick={handleUploadFeatureImage}
        className="btn btn-primary w-full mt-4 flex items-center justify-center gap-2"
      >
        <AiOutlineCloudUpload size={20} /> Upload
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
        {featureImageList?.length > 0 ? (
          featureImageList.map((featureImgItem, index) => (
            <div key={index} className="card w-full bg-base-100 shadow-xl">
              <figure>
                <img
                  src={featureImgItem.image}
                  alt="Uploaded"
                  className="w-full h-64 object-cover rounded-t-lg"
                />
              </figure>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No images uploaded yet.</p>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;