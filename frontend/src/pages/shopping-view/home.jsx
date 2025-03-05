import React from 'react'
import banner1 from '../../assets/banner-1.webp'
import banner2 from '../../assets/banner-2.webp'
import banner3 from '../../assets/banner-3.webp'
import {fetchProductDetails, fetchAllFilteredProducts} from '../../store/shopSlice/productSlice/index.js'
import ShoppingViewProductTile from '../../components/shopping-view/ProductTile'
import {addCartItem, fetchCart} from '../../store/shopSlice/cartSlice/index.js'
import ProductDetails from '../../components/shopping-view/ProductDetails'


function ShoppingHome() {
  return (
    <div>
      ShoppingHome
    </div>
  )
}

export default ShoppingHome
