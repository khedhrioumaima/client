import React, { useEffect } from 'react'
import { useContext } from 'react'
import { ShopContext } from '../../context/ShopContext'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const BestSeller = () => {
     
    const {products}=useContext(ShopContext)

    const[bestSeller,setBestSeller]=useState([])
    useEffect(()=>{
        const bestProduct= products.filter((item)=>item.bestseller);
        //console.log("Produits best-seller :", bestProduct);
        setBestSeller(bestProduct.slice(0,6))
    },[products])

  return (
    <div>
        <div className='product-container'>
             <div className='list-header'>
                <h2>BestSeller</h2>
                <hr className='divider'/>
             </div>

             <div className='product-grid'>
                  {bestSeller.length > 0 ?(
                     bestSeller.map((product)=>(
                           <div className='product-card' key={product._id}>
                               < div className='product-image'>
                                       <Link to={`/product/${product._id}`}>
                                            <img src={product.image[0]}/>
                                       </Link>
                               </div>
                                        <h3 className='name'>{product.name}</h3>
                                        <p className='price'>{product.price} dt</p>
                                        
                           </div>

                     ))
                  ):
                   (
                         <p> No product is found in this category </p>
                   )}
             </div>
        </div>
    </div>
  )
}

export default BestSeller;
