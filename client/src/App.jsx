import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Login from './components/Login'
import { useAppContext } from './context/AppContext'
import Home from './pages/Home'
import AllProducts from './pages/AllProducts'
import ProductCategory from './pages/ProductCategory'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import AddAddress from './pages/AddAddress'
import MyOrders from './pages/MyOrders'
import Profile from './pages/Profile'
import Contact from './pages/Contact'
import Faqs from './pages/Faqs'
import ResetPassword from './pages/ResetPassword'
import SellerLogin from './components/seller/SellerLogin'
import SellerLayout from './pages/seller/SellerLayout'
import AddProduct from './pages/seller/AddProduct'
import ProductListSeller from './pages/seller/ProductList'
import Orders from './pages/seller/Orders'
import Analytics from './pages/seller/Analytics'

const App = () => {
  const { showUserLogin, isSeller } = useAppContext()
  const isSellerPath = useLocation().pathname.startsWith('/seller')

  return (
    <div className="flex flex-col min-h-screen text-gray-700">
      {!isSellerPath && <Navbar />}
      {showUserLogin && <Login />}
      <Toaster />

      <main className="flex-1 px-3 sm:px-6 md:px-16 lg:px-24 xl:px-32">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<AllProducts />} />
          <Route path="/products/:category" element={<ProductCategory />} />
          <Route path="/products/:category/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/add-address" element={<AddAddress />} />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faqs" element={<Faqs />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route
            path="/seller"
            element={isSeller ? <SellerLayout /> : <SellerLogin />}
          >
            <Route index element={<AddProduct />} />
            <Route path="product-list" element={<ProductListSeller />} />
            <Route path="orders" element={<Orders />} />
            <Route path="analytics" element={<Analytics />} />
          </Route>
        </Routes>
      </main>

      {!isSellerPath && <Footer />}
    </div>
  )
}

export default App
