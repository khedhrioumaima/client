import React, { useContext, useState } from 'react'
import { ShopContext } from '../../context/ShopContext'
import { toast } from 'react-toastify'
import stripe  from '../../assets/stripe.png';
import razorpay  from '../../assets/razorpay.png';
import axios from 'axios';
import { backendUrl } from '../../App';
import CartTotal from '../../components/CartTotal/CartTotal';
import './checkout.css';
const Checkout = () => {
    const[method,setMethod]= useState("COD")
    const {cartItems,setCartItems,getCartAmount,delivery_fee,products,token,navigate} = useContext(ShopContext)

    const[formData,setFormData] = useState({
        firstName:"",
        lastName:"",
        email:"",
        street:"",
        city:"",
        zipcode:"",
        country:"",
        state:"",
        phone:"",
    })

    const onChangeHandler =() =>{
        const {name,value} = event.target;
        
        setFormData((data)=>({...data,[name]:value}))
    };

    const onSubmitHandler = async () => {
        event.preventDefault();
        console.log("✅ Submit handler called");
        try {
            let orderItems = [];
            for(const items in cartItems){
             for (const item in cartItems[items]) {
                if (cartItems[items][item] > 0) {
                    const itemInfo = structuredClone(
                        products.find((product) => product._id === items)
                    );
                    if (itemInfo) {
                        itemInfo.benefits = item;
                        itemInfo.quantity = cartItems[items][item];
                        orderItems.push(itemInfo);
                    }
                }
                
             }
            }
            
           
            let orderData ={
                address:formData,
                items:orderItems,
                amount:getCartAmount() + delivery_fee
            }
           // console.log("🧾 Data envoyée :", orderData);
            switch (method) {
                case "COD":
                    const response = await axios.post(
                        backendUrl + '/api/order/place',orderData,{headers:{token}}
                    )
                    console.log(response.data)
                    if(response.data.success){
                        setCartItems({})
                        navigate("/orders")
                    }else{
                        toast.error(response.data.message)
                    }
                    break;

                    case "stripe":
                      const responseStripe = await axios.post(
                          backendUrl + '/api/order/stripe',orderData,{headers:{token}}
                      )
                    if (responseStripe.data.success) {
                      const {session_url} = responseStripe.data
                      window.location.replace(session_url)
                    }else{
                        toast.error(responseStripe.data.message)
                    }

                default:
                    break;
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    };
  return (
   <form className='form-container' onSubmit={ onSubmitHandler}>
    {/* delivery information section*/ }
     <div className='form-left'>
      <fieldset className='payment-method'>
          <legend>Payment Options</legend>
          <div className="payment-options">
            <div onClick={()=>setMethod("stripe")}className={`payment-option ${method === "stripe" ?"selected":""}`}>
                <img src={stripe} alt=''className='payment-logo'/>
            </div>
            <div  onClick={()=>setMethod("razorpay")}className={`payment-option ${method === "razorpay" ?"selected":""}`}>
                <img src={razorpay} alt=''className='payment-logo'/>
            </div>
            <div  onClick={()=>setMethod("COD")}className={`payment-option ${method === "COD" ?"selected":""}`}>
               <span className='payment-text'>CASH ON DELIVERY</span>
            </div>
          </div>
      </fieldset>
      <div className='form-title'>
       <h2> Shippin Address</h2>
      </div>
      <div className="form-row">
        <input type="text" name="firstName" value={formData.firstName} placeholder='firstName' className='form-input' onChange={onChangeHandler} />
        <input type="text" name="lastName" value={formData.lastName} placeholder='last Name' className='form-input' onChange={onChangeHandler} />
      </div>
      <div className='form-row'>
          <input
            type='email'
            name='email'
            value={formData.email}
            placeholder='Email'
            className='form-input'
            onChange={onChangeHandler}
            required
          />
          <input
            type='text'
            name='phone'
            value={formData.phone}
            placeholder='Phone'
            className='form-input'
            onChange={onChangeHandler}
            required
          />
        </div>
        <div className='form-row'>
          <input
            type='text'
            name='street'
            value={formData.street}
            placeholder='Street Address'
            className='form-input'
            onChange={onChangeHandler}
            required
          />
        </div>
        <div className='form-row'>
          <input
            type='text'
            name='city'
            value={formData.city}
            placeholder='City'
            className='form-input'
            onChange={onChangeHandler}
            required
          />
          <input
            type='text'
            name='zipcode'
            value={formData.zipcode}
            placeholder='Zip Code'
            className='form-input'
            onChange={onChangeHandler}
            required
          />
        </div>
        <div className='form-row'>
          <input
            type='text'
            name='state'
            value={formData.state}
            placeholder='State'
            className='form-input'
            onChange={onChangeHandler}
            required
          />
          <input
            type='text'
            name='country'
            value={formData.country}
            placeholder='Country'
            className='form-input'
            onChange={onChangeHandler}
            required
          />
        </div>
        <div className="form-right">
        <CartTotal/>
        <button type="submit" className="place-order-button">Place Order</button>
        </div>
      </div>
   </form>
  )
}

export default Checkout
