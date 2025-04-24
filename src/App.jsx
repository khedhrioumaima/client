
import { React } from "react";
import { Routes,Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Cart from "./pages/cart/Cart";
import Collection from "./pages/collection/Collection";
import ProductDetails from "./pages/productdetails/ProductDetails";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import{ToastContainer} from "react-toastify"
import  Checkout from "./pages/checkout/Checkout";
import Order from "./pages/order/Order";
import Verify from "./pages/Verify";


export const backendUrl= "http://localhost:4000"

function App() {


  return (
    
      <div>
        <ToastContainer/>
        <Navbar/>
       <Routes>
        
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/checkout" element={<Checkout/>}/>
        <Route path="/category/:category" element={<Collection/>}/>
        <Route path="/product/:productId" element={<ProductDetails/>}/>
        <Route path="/orders" element={<Order/>}/>
        <Route path="/verify" element={<Verify/>}/>
       </Routes>
       <Footer/>
        </div>
  )
}

export default App
