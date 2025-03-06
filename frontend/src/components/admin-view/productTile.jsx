import { FaEdit, FaTrash } from "react-icons/fa";

function AdminProductTile({
  product,
  setFormData,
  setOpenCreateProductsDialog,
  setCurrentEditedId,
  handleDelete,
}) {
  return (
    <div className="card w-full max-w-sm bg-white shadow-2xl mx-auto">
      <figure>
        <img
          src={product?.image}
          alt={product?.title}
          className="w-full h-[300px] object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-xl text-black font-bold">{product?.title}</h2>
        <div className="flex justify-between items-center mb-2">
          <span
            className={`${
              product?.salePrice > 0 ? "line-through text-gray-500" : ""
            } text-lg font-semibold text-primary`}
          >
            ${product?.price}
          </span>
          {product?.salePrice > 0 && (
            <span className="text-lg font-bold text-red-500">
              ${product?.salePrice}
            </span>
          )}
        </div>
        <div className="card-actions justify-between">
        <button
          className="btn btn-primary flex items-center gap-2"
          onClick={() => {
            setOpenCreateProductsDialog(true);
            setCurrentEditedId(product?._id);
            setFormData(product);
            document.getElementById("my-drawer-4").checked = true;
          }}
        >
          <FaEdit /> Edit
        </button>

          <button
            className="btn btn-error flex items-center gap-2"
            onClick={() => handleDelete(product?._id)}
          >
            <FaTrash /> Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminProductTile;