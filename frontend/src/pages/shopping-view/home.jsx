import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

// Import react-icons (you can adjust these icon choices as needed)
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { FaBaby } from "react-icons/fa";
import { PiPantsLight } from "react-icons/pi";
import { MdSportsSoccer } from "react-icons/md";
import { GiTShirt,   GiRunningShoe } from "react-icons/gi";
import { FaFemale, FaImages, FaFire } from "react-icons/fa";
import { BsSmartwatch } from "react-icons/bs";
import { RiShoppingBasketFill } from "react-icons/ri";

// Assets
import banner1 from "../../assets/banner-1.webp";
import banner2 from "../../assets/banner-2.webp";
import banner3 from "../../assets/banner-3.webp";

// Redux actions & selectors
import { fetchProductDetails, fetchAllFilteredProducts } from "../../store/shopSlice/productSlice/index.js";
import { addCartItem, fetchCart } from "../../store/shopSlice/cartSlice/index.js";
import { fetchFeatureImageList } from "../../store/common/index.js";

// Components
import ShoppingViewProductTile from "../../components/shopping-view/ProductTile";
import ProductDetails from "../../components/shopping-view/ProductDetails";

function ShoppingHome() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [currentSlide, setCurrentSlide] = useState(0);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  // Redux state selectors
  const { productList, productDetails } = useSelector((state) => state.shopProducts);
  const { featureImageList } = useSelector((state) => state.commonFeature);
  const { user } = useSelector((state) => state.auth);

  // Define categories and brands using react-icons
  const categoriesWithIcon = [
    { id: "men", label: "Men", icon: GiTShirt },
    { id: "women", label: "Women", icon: FaFemale },
    { id: "kids", label: "Kids", icon: FaBaby },
    { id: "accessories", label: "Accessories", icon: BsSmartwatch },
    { id: "footwear", label: "Footwear", icon: GiRunningShoe },
  ];

  const brandsWithIcon = [
    { id: "nike", label: "Nike", icon: GiRunningShoe },
    { id: "adidas", label: "Adidas", icon: MdSportsSoccer },
    { id: "puma", label: "Puma", icon: RiShoppingBasketFill },
    { id: "levi", label: "Levi's", icon: PiPantsLight },
    { id: "zara", label: "Zara", icon: FaImages },
    { id: "h&m", label: "H&M", icon: FaFire },
  ];

  // Navigate to listing page with filters saved in sessionStorage
  const handleNavigateToListingPage = (item, section) => {
    sessionStorage.removeItem("filters");
    const currentFilter = { [section]: [item.id] };
    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate("/shop/listing");
  };

  // Fetch product details for modal display
  const handleGetProductDetails = (productId) => {
    dispatch(fetchProductDetails(productId));
  };

  // Handle add-to-cart functionality with toast notification
  const handleAddToCart = (productId) => {
    dispatch(addCartItem({ userId: user?.id, productId, quantity: 1 })).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCart(user?.id));
        toast.success("Product is added to cart");
      }
    });
  };

  // Open product details dialog when productDetails is updated
  useEffect(() => {
    if (productDetails) {
      setOpenDetailsDialog(true);
    }
  }, [productDetails]);

  // Auto slide the feature image every 15 seconds
  useEffect(() => {
    if (featureImageList && featureImageList.length > 0) {
      const timer = setInterval(() => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % featureImageList.length);
      }, 15000);
      return () => clearInterval(timer);
    }
  }, [featureImageList]);

  // Fetch filtered products on mount
  useEffect(() => {
    dispatch(
      fetchAllFilteredProducts({
        filterParams: {},
        sortParams: "price-lowtohigh",
      })
    );
  }, [dispatch]);

  // Fetch feature images
  useEffect(() => {
    dispatch(fetchFeatureImageList());
  }, [dispatch]);

  return (
    <div className="flex flex-col min-h-screen">
      <Toaster />

      {/* Feature Image Slider */}
      <div className="relative w-full h-[600px] overflow-hidden">
        {featureImageList && featureImageList.length > 0 ? (
          featureImageList.map((slide, index) => (
            <img
              key={index}
              src={slide?.image}
              alt={`slide-${index}`}
              className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            />
          ))
        ) : (
          // Fallback to banner1 if featureImageList is empty
          <img src={banner1} alt="banner" className="w-full h-full object-cover" />
        )}

        <button
          onClick={() =>
            setCurrentSlide(
              (prevSlide) =>
                (prevSlide - 1 + (featureImageList?.length || 1)) %
                (featureImageList?.length || 1)
            )
          }
          className="btn btn-outline absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80"
        >
          <FiChevronLeft size={20} />
        </button>
        <button
          onClick={() =>
            setCurrentSlide(
              (prevSlide) => (prevSlide + 1) % (featureImageList?.length || 1)
            )
          }
          className="btn btn-outline absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80"
        >
          <FiChevronRight size={20} />
        </button>
      </div>

      {/* Shop by Category */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categoriesWithIcon.map((categoryItem, idx) => {
              const Icon = categoryItem.icon;
              return (
                <div
                  key={idx}
                  className="card bg-white shadow hover:shadow-lg cursor-pointer transition-shadow"
                  onClick={() => handleNavigateToListingPage(categoryItem, "category")}
                >
                  <div className="card-body flex flex-col items-center justify-center p-6">
                    <Icon className="text-primary mb-4" size={32} />
                    <span className="font-bold">{categoryItem.label}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Shop by Brand */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Shop by Brand</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {brandsWithIcon.map((brandItem, idx) => {
              const Icon = brandItem.icon;
              return (
                <div
                  key={idx}
                  className="card bg-white shadow hover:shadow-lg cursor-pointer transition-shadow"
                  onClick={() => handleNavigateToListingPage(brandItem, "brand")}
                >
                  <div className="card-body flex flex-col items-center justify-center p-6">
                    <Icon className="text-primary mb-4" size={32} />
                    <span className="font-bold">{brandItem.label}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Feature Products */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Feature Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productList && productList.length > 0
              ? productList.map((productItem, idx) => (
                  <ShoppingViewProductTile
                    key={idx}
                    product={productItem}
                    handleGetProductDetails={handleGetProductDetails}
                    handleAddToCart={handleAddToCart}
                  />
                ))
              : null}
          </div>
        </div>
      </section>

      {/* Product Details Modal */}
      {openDetailsDialog && productDetails && (
        <ProductDetails
          productDetails={productDetails}
          onClose={() => setOpenDetailsDialog(false)}
          handleAddToCart={handleAddToCart}
        />
      )}
    </div>
  );
}

export default ShoppingHome;
