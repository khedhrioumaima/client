import React, { useContext } from 'react'
import { ShopContext } from '../../context/ShopContext'
import { Link, useParams } from 'react-router-dom'
import  women  from "../../assets/women.jpeg";
import cheveu from "../../assets/cheveu.jpg";
import  ortho  from "../../assets/ortho.jpg";


const normalizeCategory = (str) => str.trim().toLowerCase().replace(/\s+/g, '');


const Collection = () => {
  const{products,searchTerm}=useContext(ShopContext)

  const {category}=useParams();
  //console.log("📦 Tous les produits :", products);
//console.log("🔎 Catégorie demandée :", category);

//console.log("✅ Catégorie actuelle (après trim) :", category.trim());
//console.log("✅ Tous les produits :", products);
products.forEach((product, index) => {
  console.log(`Produit ${index + 1}: ${product.name} | Catégorie: ${product.category.trim()}`);
});

//console.log("✅ Terme de recherche :", searchTerm);


const normalizedCategory = normalizeCategory(category);

  const filteredProduct=products.filter((product)=>{
    
    const normalizedProductCategory = normalizeCategory(product.category);
    const matchesCategory = normalizedProductCategory === normalizedCategory;




    const matchesSearchTerm = searchTerm


      ? product.name.toLowerCase().includes(searchTerm.toLowerCase())
      : true; // Si aucun terme de recherche n'est fourni, tous les produits sont retournés
     // console.log(`Produit: ${product.name}`);
      //console.log(`Catégorie Produit: '${product.category}' | Catégorie URL: '${category}'`);
      //console.log(`Correspond à la catégorie: ${matchesCategory}, Correspond au terme de recherche: ${matchesSearchTerm}`);
      return matchesCategory && matchesSearchTerm;
    })
  
    //console.log("✅ Produits filtrés :", filteredProduct);


  const bannerImages ={
    soinvisage:women,
    soincheveux: cheveu,
    orthopiedie: ortho
  }
  

  //console.log("Catégorie normalisée :", normalizedCategory);
  //console.log("Image correspondante :", bannerImages[normalizedCategory]);
  return (


    <div>

      {/* Banner SECTION*/ }
         <div className='banner'>
         { bannerImages[normalizedCategory] ? (
      <img src={bannerImages[normalizedCategory]} alt="banner-ig" />
         ) : (
            <p>No images match the category</p>
       )}
        </div>

  {/* products grid */}
  <div className='product-grid'>
    {filteredProduct.length > 0 ? (
      filteredProduct.map((product) => {
        //console.log("📦 Produit affiché:", product.name, "| Catégorie:", product.category);
        //console.log("✅ Produits filtrés à afficher :", filteredProduct);

        return(
          <div className='product-card' key={product._id}>
            <div className='product-image'>
              <Link to={`/product/${product._id}`}>
                <img src={product.image[0]} alt={product.name} />
              </Link>
            </div>
            <h3 className='name'>{product.name}</h3>
            <p className='price'>{product.price} dt</p>
          </div>
        )
      })
    ) : (
      <p>No product is found in this category</p>
    )}
  </div>
</div>
  )
}
  export default Collection  ;       
                         