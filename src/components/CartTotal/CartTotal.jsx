import React, { useContext } from 'react'
import { ShopContext } from '../../context/ShopContext'
import './CartTotal.css'

const CartTotal = () => {

    const{currency,getCartAmount,delivery_fee} = useContext(ShopContext)
    const deliveryFee = delivery_fee || 0;
    const subtotal = getCartAmount() || 0; 
    const total = subtotal + deliveryFee;

    const formatAmount = (amount) => {
      const numericAmount = Number(amount);  
    if (isNaN(numericAmount)) {
        return "0.00";  
    }
    return numericAmount.toFixed(2);  
    };
  return (
    <div>
      <div className='cart-total-container'>
           <div className='cart-title'>
            <h2>CART TOTALS</h2>
           </div>
           <div className='cart-total-details'>
                   <div className='cart-row'>
                       <p>Subtotal</p>
                       <p>{currency}{formatAmount(subtotal)}</p>
                   </div>
                   <hr className='cart-divider'/>
                   <div className='cart-row'> 
                       <p>Delivery free when 150dt</p>
                       <p>{currency}{formatAmount(deliveryFee)}</p>
                   </div>
                   <div className='cart-row cart-total'>
                          <b>TOTAL </b>
                          <b>{currency}{formatAmount(total)}</b>
                   </div>
           </div>
      </div>
    </div>
  )
}

export default CartTotal
