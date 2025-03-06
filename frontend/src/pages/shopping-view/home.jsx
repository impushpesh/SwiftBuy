import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Import react-icons 
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { FaBaby } from "react-icons/fa";
import { GiTShirt,   GiRunningShoe } from "react-icons/gi";
import { FaFemale} from "react-icons/fa";
import { BsSmartwatch } from "react-icons/bs";

// Assets
import banner1 from "../../assets/banner-1.webp";
import adidas from "../../assets/logo/adidas.jpg";
import nike from "../../assets/logo/nike.jpg";
import puma from "../../assets/logo/puma.jpg";
import levi from "../../assets/logo/levi.png";
import zara from "../../assets/logo/zara.jpg";
import hm from "../../assets/logo/hm.webp";

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

  const brandsWithLogo = [
    { id: "nike", label: "Nike", logo: nike },
    { id: "adidas", label: "Adidas", logo: adidas },
    { id: "puma", label: "Puma", logo: puma },
    { id: "levi", label: "Levi's", logo: levi },
    { id: "zara", label: "Zara", logo: zara },
    { id: "h&m", label: "H&M", logo: hm },
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
          <h2 className="text-3xl font-bold text-center mb-8 text-blue-600">Shop by Category</h2>
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
          <h2 className="text-3xl text-blue-600 font-bold text-center mb-8">Shop by Brand</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {brandsWithLogo.map((brandItem, idx) => (
              <div
                key={idx}
                className="card bg-white shadow hover:shadow-lg cursor-pointer transition-shadow"
                onClick={() => handleNavigateToListingPage(brandItem, "brand")}
              >
                <div className="card-body flex flex-col items-center justify-center p-6">
                  <img
                    src={brandItem.logo}
                    alt={brandItem.label}
                    className="mb-4 w-16 h-16 object-contain"
                  />
                  <span className="font-bold">{brandItem.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Feature Products */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl text-blue-600 font-bold text-center mb-8">Feature Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productList && productList.length > 0
              ? productList.map((productItem, idx) => (
                  <ShoppingViewProductTile
                    key={idx}
                    product={productItem}
                    handleGetProductDetails={handleGetProductDetails}
                    handleAddtoCart={handleAddToCart}
                  />
                ))
              : null}
          </div>
        </div>
      </section>

      {/* Product Details Modal */}
      {openDetailsDialog && productDetails && (
        <ProductDetails
          open={openDetailsDialog}
          setOpen={setOpenDetailsDialog}
          productDetails={productDetails}
          handleAddToCart={handleAddToCart}
        />
      )}
    </div>
  );
}

export default ShoppingHome;
