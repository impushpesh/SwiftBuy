import React, { useState } from 'react';
import { IoCloudUploadOutline } from 'react-icons/io5';

function ProductImageUpload() {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="w-64 h-64 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-white">
        {selectedImage ? (
          <img src={selectedImage} alt="Uploaded" className="w-full h-full object-contain" />
        ) : (
          <label className="flex flex-col items-center justify-center cursor-pointer">
            <IoCloudUploadOutline size={50} className="text-gray-500" />
            <span className="text-gray-500">Click to upload image</span>
            <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
          </label>
        )}
      </div>
      {selectedImage && (
        <button
          onClick={() => setSelectedImage(null)}
          className="btn btn-secondary"
        >
          Remove Image
        </button>
      )}
    </div>
  );
}

export default ProductImageUpload;
