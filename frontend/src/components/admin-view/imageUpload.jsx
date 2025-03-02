import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { FiUploadCloud, FiFile, FiX } from "react-icons/fi";

function ProductImageUpload({
  imageFile,
  setImageFile,
  imageLoadingState,
  setImageLoadingState,
  uploadedImageUrl,
  setUploadedImageUrl,
  isEditMode,
  isCustomStyling = false,
}) {
  const inputRef = useRef(null);
  const [errorMessage, setErrorMessage] = useState(null);

  function handleImageFileChange(event) {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) setImageFile(selectedFile);
  }

  function handleDragOver(event) {
    event.preventDefault();
  }

  function handleDrop(event) {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile) setImageFile(droppedFile);
  }

  function handleRemoveImage() {
    setImageFile(null);
    setUploadedImageUrl(null);
    setErrorMessage(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  async function uploadImageToCloudinary() {
    setImageLoadingState(true);
    setErrorMessage(null);
    const data = new FormData();
    data.append("my_file", imageFile);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/admin/product/upload-image",
        data
      );
      if (response?.data?.success) {
        setUploadedImageUrl(response.data.result.url);
      } else {
        setErrorMessage("Image upload failed. Please try again.");
      }
    } catch (error) {
      setErrorMessage("Error uploading image. Please check your connection.");
    } finally {
      setImageLoadingState(false);
    }
  }

  useEffect(() => {
    if (imageFile !== null) uploadImageToCloudinary();
  }, [imageFile]);

  return (
    <div className={`w-full mt-4 ${isCustomStyling ? "" : "max-w-md mx-auto"}`}>
      <label className="text-lg font-semibold mb-2 block">Upload Image</label>
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-4 ${isEditMode ? "opacity-60" : ""}`}
      >
        <input
          id="image-upload"
          type="file"
          className="hidden"
          ref={inputRef}
          onChange={handleImageFileChange}
          disabled={isEditMode}
        />
        {!imageFile ? (
          <label
            htmlFor="image-upload"
            className={`flex flex-col items-center justify-center h-32 cursor-pointer ${isEditMode ? "cursor-not-allowed" : ""}`}
          >
            <FiUploadCloud className="w-10 h-10 text-gray-400 mb-2" />
            <span>Drag & drop or click to upload image</span>
          </label>
        ) : imageLoadingState ? (
          <div className="h-10 w-full bg-gray-200 animate-pulse rounded-md" />
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FiFile className="w-8 h-8 text-blue-500 mr-2" />
              <p className="text-sm font-medium">{imageFile.name}</p>
            </div>
            <button
              className="text-gray-500 hover:text-gray-800"
              onClick={handleRemoveImage}
            >
              <FiX className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
      {errorMessage && <p className="text-red-500 text-sm mt-2">{errorMessage}</p>}
    </div>
  );
}

export default ProductImageUpload;
