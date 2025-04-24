import { createContext, useEffect, useState } from "react";
import { product } from "../assets/assets";
import { toast } from "react-toastify";
import axios from 'axios'
import { backendUrl } from "../App";
import { useNavigate } from "react-router-dom";

export const ShopContext=createContext()

const ShopContextProvider =({children})=>{
    const currency ='TND'
    const delivery_fee =4.500

    const[cartItems,setCartItems]=useState({})

    const[products,setProducts] =useState(product)

    const[searchTerm,setSearchTerm]=useState('')

    const[token,setToken]=useState('')

        const updateSearchTerm=(term)=>{
            setSearchTerm(term)
        }
        const navigate = useNavigate();
        
        //function to add item to cart
        const addToCart=async(itemId,benefits)=>{
            if (!benefits) {
                toast.error('Select product benefits to continue')
                return
            }

            const updatedCart={...cartItems}
           if (!updatedCart[itemId]) {
            updatedCart[itemId]={[benefits]:1}
           }else{
            updatedCart[itemId][benefits] = (updatedCart[itemId][benefits]||0)+1
           }
           setCartItems(updatedCart)

           console.log(`product added to cart:itemId -${itemId} ,benefits -${benefits}`)
           toast.success('product added to cart')
           if (token) {
            try {
                await axios.post(backendUrl + '/api/cart/add', {itemId,benefits} , {headers:{token}})
            } catch (error) {
                console.log(error)
                toast.error(error.message)
            }
           }
        }

    //function to get the amount of items in the cart
        const getCartCount=()=>{
              let totalCount=0;
              for(const items in cartItems){
                   for (const item in cartItems[items]) {
                         if (cartItems[items][item]>0) {
                            totalCount += cartItems[items][item]
                         }
                    
                   }
              }
             return totalCount;
        }
    
     //function to update quantity

     const updateQuantity=async(itemId,benefits,quantity)=>{

          let cartData=structuredClone(cartItems)

          cartData[itemId][benefits]=quantity;

          setCartItems(cartData);
          if (token) {
            try {
                await axios.post(backendUrl + '/api/cart/update', {itemId,benefits,quantity}, {headers :{token}})
            } catch (error) {
                console.log(error)
                toast.error(error.message)
            }
          }
     }
    
    const getUserCart = async (token) => {
        try {
            const response = await axios.post(backendUrl + '/api/cart/get',{},{headers :{token}})
            if (response.data.success) {
                setCartItems(response.data.cartData)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }
     //function to get the cart total
    const getCartAmount=()=>{
        let totalAmount = 0

        for (const itemId in cartItems ) {
            const itemInfo=products.find((product)=>product._id.toString()===itemId);
            if (itemInfo) {
                for (const benefits in cartItems[itemId]) {
                    totalAmount += Number(itemInfo.price) * Number(cartItems[itemId] [benefits]) 
                    
                }
            }
            
        }
        return totalAmount;
    }

    const getProductData = async()=>{
        try {
            const response = await axios.get(backendUrl + '/api/product/list')
            //console.log(response.data)
             if (response.data.success) {
                setProducts(response.data.products)
             }else{
                toast.error(response.data.message)
             }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }
    useEffect(()=>{
        getProductData()
    },[])
    useEffect(()=>{
        if (!token && localStorage.getItem('token')) {
           setToken(localStorage.getItem('token')) 
           getUserCart(localStorage.getItem('token'))
        }
    },[])
        const value={
        products ,delivery_fee,cartItems,setCartItems,currency,searchTerm,updateSearchTerm,addToCart,getCartCount,updateQuantity,getCartAmount,navigate,token,setToken
    }

        return(
            <ShopContext.Provider value={value}>
                {children}
            </ShopContext.Provider>
        )
      
}



export default ShopContextProvider;