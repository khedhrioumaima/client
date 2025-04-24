import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../../context/ShopContext'

import { MdDelete } from "react-icons/md";
import CartTotal from '../../components/CartTotal/CartTotal';
import { product } from '../../assets/assets';
import './Cart.css'

const Cart = () => {

  const{products,currency,cartItems,updateQuantity,navigate} = useContext(ShopContext);
  const [cartData,setCartData] = useState([])

  useEffect(()=>{
    if (products.length ===0) return; 
      if (!cartItems || typeof cartItems !== 'object') {
        setCartData([])
        return;
      }
      const tempData=Object.entries(cartItems).flatMap(([itemId,benefits])=>
        Object.entries(benefits).filter(([,quantity])=>quantity>0).map(([benefits,quantity])=>({
          _id:itemId,
          benefits,
          quantity
        }))
      )
      console.log("🛒 cartItems (détail):", cartItems)

      setCartData(tempData)

  },[cartItems,products])
  console.log("📦 Products:", products);
console.log("🛒 cartItems:", cartItems);
console.log("🧾 cartData:", cartData);

  return (
    <div>
      <div className='cart-content-container'>
        {cartData.map((item,index)=>{
          const productData = products.find(product=>String(product._id) === String(item._id))
          if (!productData) return null
          return(
            <div key={index} className='cart-item'>
              <div className='cart-itm-info'>
              <img src={productData.image[0]} alt='' className='product-card-image'/>
              <div className='product-cart-details'>
                  <p className='cart-product-name'>{productData.name}</p>
                  <div className='product-benefits-price'>
                    <p className='product-price'>{productData.price}{currency}</p>
                    {/*<p className='benefits'>{productData.benefits}</p>*/ }
                  </div>
              </div>
              </div>
              <input type="number" className='input-quantity' min={1} defaultValue={item.quantity} 
              onChange={(e)=>e.target.value ===''|| e.target.value === 0 ?null : updateQuantity(item._id,item.benefits,Number(e.target.value))}/>
              <MdDelete className='delete-icon' onClick={()=>updateQuantity(item._id,item.benefits,0)} />
            </div>
          )
        })}
      </div>
      <div className='checkout-container'>
        <div className='check-box'>
            <CartTotal/>
            <div className='checkout-button-container'>
                  <button className='checkout-button'onClick={() => navigate('/checkout')}>Proceed to checkout</button>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
