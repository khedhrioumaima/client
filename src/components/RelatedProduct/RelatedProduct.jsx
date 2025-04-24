import React, { useContext, useState } from 'react'
import { ShopContext } from '../../context/ShopContext';

import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const RelatedProduct = ({category}) => {
    const { products } = useContext(ShopContext);
    const[relatedProduct,setRelatedProduct]=useState([]);

    
    useEffect(() => {
         //console.log("📦 Produits disponibles :", products);
         //console.log("📂 Catégorie reçue :", category);
        if (category && products.length > 0) {
          const filtered = products.filter(
            product =>
              product.category &&
              product.category.toLowerCase().trim() === category.toLowerCase().trim()
          );
          console.log("✅ Produits filtrés :", filtered);
          setRelatedProduct(filtered.slice(0, 4)); // max 4 produits
        }
      }, [category, products]);
  return (
    <div>
      <div className='product-container'>
             <div className='list-header'>
                <h2>Related Products</h2>
                <hr className='divider'/>
             </div>

             <div className='product-grid'>
                  {relatedProduct.length > 0 ?(
                     relatedProduct.map((product)=>(
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

export default RelatedProduct
