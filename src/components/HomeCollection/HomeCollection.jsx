import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../../context/ShopContext'
import { Link } from 'react-router-dom'

const HomeCollection = () => {
     const{products} =useContext(ShopContext)

     const[homeProduct,setHomeProducts]= useState([])
    
    
     useEffect(()=>{
        setHomeProducts(products.slice(0,33))
    },[products])

  return (
    <div>
        <div className='product-container'>
             <div className='list-header'>
                <h2>Our wellness essentials</h2>
                <hr className='divider'/>
             </div>

             <div className='product-grid'>
                  {homeProduct.length > 0 ?(
                    homeProduct.map((product)=>(
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

export default HomeCollection
