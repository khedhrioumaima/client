import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../../context/ShopContext';
import { useParams } from 'react-router-dom';
import'./ProductDetails.css'
import RelatedProduct from '../../components/RelatedProduct/RelatedProduct';
const ProductDetails = () => {
  const { products, currency,addToCart } = useContext(ShopContext);
  const { productId } = useParams();
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('');
  const [benefits, setBenefits] = useState('');

  const fetchProductData = async () => {
    // Convertir productId en nombre (si productId est une chaîne de caractères)
    //const productIdNumber = Number(productId);

    // Trouver le produit correspondant dans le tableau products
    const foundProduct = products.find((item) => item._id === productId);

    if (foundProduct) {
      setProductData(foundProduct);
      setImage(foundProduct.image[0]);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  return productData ? (
    <div>
      <div className='product-container'>
        <div className='product-content'>
          <div className='product-images'>
            <div className='thumbanail-container'>
              {productData.image.map((item, index) => (
                <img
                  onClick={() => setImage(item)}
                  src={item}
                  key={index}
                  className='thumbbbo'
                />
              ))}
            </div>
            <div className='main-image-container'>
              <img src={image} alt='' className='main-iamge' />
            </div>
          </div>
          <div className='product-info'>
            <h1 className='product-name'>{productData.name}</h1>
            <hr className='product-divider' />
            <p className='product-price'>
              
              {productData.price}
              {currency}
          
            </p>
            <p className='product-decription'>{productData.description}</p>
            <div className='benefits-selector'>
              <p> Select benefits</p>
              <div className='benefits-boutons'>
                {productData.benefits.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => setBenefits(item)}
                    className={`benefits-button${
                      item === benefits ? ' active-benefits' : ''
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
            <hr className='product-divider' />
            <div className='product-policy'>
              <p>Free delivery</p>
              <p>Secure payment</p>
              <p>Several payment options available</p>
            </div>
            <button  onClick={()=>addToCart(productData._id,benefits)} className='add-to-cart-btn'>ADD TO CART</button>
          </div>
        </div>
        <div className='desciption-review-section'>
          <div className='tabs'>
            <b className='tab active'>Description</b>
            <p className='tab'>REVIEWS</p>
          </div>
          <div className='description-content'>
            <p>Lorem ipsum dolor sit amet.</p>
            <p>Lorem ipsum dolor sit amet.</p>
            <p>Lorem ipsum dolor sit amet.</p>
          </div>
        </div>
        <RelatedProduct category={productData.category}/>
      </div>
    </div>
  ) : (
    <div>No product matches with product id</div>
  );
};

export default ProductDetails;
