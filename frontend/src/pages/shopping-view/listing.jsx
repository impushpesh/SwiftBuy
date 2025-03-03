import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { FaSort } from "react-icons/fa";

import ProductFilter from "../../components/shopping-view/Filter";
import ProductDetails from "../../components/shopping-view/ProductDetails";
import ShoppingViewProductTile from "../../components/shopping-view/ProductTile";
import { sortOptions } from "../../config/index.js";
import { addCartItem, fetchCart } from "../../store/shopSlice/cartSlice/index.js";
import { fetchAllFilteredProducts, fetchProductDetails } from "../../store/shopSlice/productSlice/index.js";

function createSearchParamsHelper(filterParams) {
  return Object.entries(filterParams)
    .filter(([_, value]) => Array.isArray(value) && value.length > 0)
    .map(([key, value]) => `${key}=${encodeURIComponent(value.join(","))}`)
    .join("&");
}

function ShoppingListing() {
  const dispatch = useDispatch();
  const { productList, productDetails } = useSelector((state) => state.shopProducts);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("price-lowtohigh");
  const [searchParams, setSearchParams] = useSearchParams();
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  const categorySearchParam = searchParams.get("category");

  useEffect(() => {
    setFilters(JSON.parse(sessionStorage.getItem("filters")) || {});
  }, [categorySearchParam]);

  useEffect(() => {
    if (filters && Object.keys(filters).length > 0) {
      setSearchParams(new URLSearchParams(createSearchParamsHelper(filters)));
    }
  }, [filters]);

  useEffect(() => {
    if (filters !== null && sort !== null) {
      dispatch(fetchAllFilteredProducts({ filterParams: filters, sortParams: sort }));
    }
  }, [dispatch, sort, filters]);

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  function handleSort(value) {
    setSort(value);
  }

  function handleFilter(getSectionId, getCurrentOption) {
    let cpyFilters = { ...filters };
    if (!cpyFilters[getSectionId]) cpyFilters[getSectionId] = [];
    const index = cpyFilters[getSectionId].indexOf(getCurrentOption);
    index === -1 ? cpyFilters[getSectionId].push(getCurrentOption) : cpyFilters[getSectionId].splice(index, 1);
    setFilters(cpyFilters);
    sessionStorage.setItem("filters", JSON.stringify(cpyFilters));
  }

  function handleGetProductDetails(productId) {
    dispatch(fetchProductDetails(productId));
  }

  function handleAddToCart(productId, totalStock) {
    let getCartItems = cartItems.items || [];
    const existingItem = getCartItems.find((item) => item.productId === productId);
    if (existingItem && existingItem.quantity + 1 > totalStock) {
      toast.error(`Only ${existingItem.quantity} quantity can be added for this item`);
      return;
    }
    dispatch(addCartItem({ userId: user?.id, productId, quantity: 1 })).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCart(user?.id));
        toast.success("Product added to cart");
      }
    });
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 p-4 md:p-6">
      <ProductFilter filters={filters} handleFilter={handleFilter} />
      <div className="bg-white text-black w-full rounded-lg shadow-md">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-bold">All Products</h2>
          <div className="flex items-center gap-3">
            <span className="text-gray-500">{productList?.length} Products</span>
            <div className="dropdown dropdown-end ">
              <label tabIndex={0} className="btn btn-outline btn-sm flex items-center gap-1 bg-white text-black">
                <FaSort className="h-4 w-4" />
                <span>Sort by</span>
              </label>
              <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-white text-black rounded-box w-52">
                {sortOptions.map((sortItem) => (
                  <li key={sortItem.id}>
                    <button className="btn btn-sm btn-ghost" onClick={() => handleSort(sortItem.id)}>
                      {sortItem.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {productList?.length > 0 ? productList.map((product) => (
            <ShoppingViewProductTile
              key={product.id}
              handleGetProductDetails={handleGetProductDetails}
              product={product}
              handleAddToCart={handleAddToCart}
            />
          )) : <p className="text-center text-gray-500">No products available</p>}
        </div>
      </div>
      {openDetailsDialog && (
        <ProductDetails open={openDetailsDialog} setOpen={setOpenDetailsDialog} productDetails={productDetails} />
      )}
    </div>
  );
}

export default ShoppingListing;
