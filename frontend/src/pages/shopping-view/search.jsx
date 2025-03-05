import React, { useEffect, useState } from "react";
import ProductDetails from "../../components/shopping-view/ProductDetails";
import ShoppingViewProductTile from "../../components/shopping-view/ProductTile";
import { addCartItem, fetchCart } from "../../store/shopSlice/cartSlice";
import { fetchProductDetails } from "../../store/shopSlice/productSlice";
import { getSearchResults, resetSearchResults } from "../../store/shopSlice/searchSlice";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { AiOutlineSearch } from "react-icons/ai";

function Search() {
  const [keyword, setKeyword] = useState("");
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { searchResults } = useSelector((state) => state.shopSearch);
  const { productDetails } = useSelector((state) => state.shopProducts);
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);

  useEffect(() => {
    if (keyword.trim().length > 3) {
      const delaySearch = setTimeout(() => {
        setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
        dispatch(getSearchResults(keyword));
      }, 1000);
      return () => clearTimeout(delaySearch);
    } else {
      setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
      dispatch(resetSearchResults());
    }
  }, [keyword]);

  function handleAddToCart(productId, totalStock) {
    let cartItemsList = cartItems.items || [];
    if (cartItemsList.length) {
      const itemIndex = cartItemsList.findIndex((item) => item.productId === productId);
      if (itemIndex > -1) {
        const quantity = cartItemsList[itemIndex].quantity;
        if (quantity + 1 > totalStock) {
          toast.error(`Only ${quantity} quantity can be added for this item`);
          return;
        }
      }
    }
    dispatch(
      addCartItem({
        userId: user?.id,
        productId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCart(user?.id));
      }
    });
  }

  function handleGetProductDetails(productId) {
    dispatch(fetchProductDetails(productId));
  }

  useEffect(() => {
    if (productDetails) setOpenDetailsDialog(true);
  }, [productDetails]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-center mb-8">
        <div className="relative w-full max-w-lg">
          <AiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="input input-bordered pl-10 py-2 w-full bg-white border-gray-300"
            placeholder="Search Products..."
          />
        </div>
      </div>
      {!searchResults.length && <h1 className="text-3xl font-bold text-center">No result found!</h1>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {searchResults.map((item) => (
          <ShoppingViewProductTile
            key={item.id}
            product={item}
            handleAddtoCart={handleAddToCart}
            handleGetProductDetails={handleGetProductDetails}
          />
        ))}
      </div>
      {openDetailsDialog && (
        <ProductDetails
          open={openDetailsDialog}
          setOpen={setOpenDetailsDialog}
          productDetails={productDetails}
        />
      )}
    </div>
  );
}

export default Search;