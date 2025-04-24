import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import  logo from "../../assets/logo.png";
import { BiUser } from "react-icons/bi";
import { BiCart } from "react-icons/bi";
import { FaCentos } from "react-icons/fa"
import './Navbar.css'
import { useContext } from 'react';
import { ShopContext } from '../../context/ShopContext';

const Navbar = () => {
  const[loading,setloading] = useState(false)

  const{updateSearchTerm,getCartCount,token,setToken}=useContext(ShopContext)

  const logout =() =>{
    navigate("/login")
    localStorage.removeItem("token")
    setToken("")
  }

  const navigate =useNavigate();

  const handleNavigation =(path)=>{
    setloading(true);
    setTimeout(()=>{
      setloading(false)
    },2000)
    navigate(path)
}
     const[searchInput,setSearchInput] = useState('')

     const handleSearch =()=>{
      updateSearchTerm(searchInput)
     }

  return (
    <div>
         {
          loading && (
            <div className='loader-container'>
              <div className='loader'><FaCentos className='loader-icon'/></div>
            </div>
          )
         }

      <nav className='navbar'>
         <div className='nav-top'>
           <Link to='/'>
           <img src={logo} alt='logo'/>
           </Link>
           
            <div className='Search-bar'>
                <input type='text'value={searchInput} onChange={(e) => setSearchInput(e.target.value)} className='search-input' placeholder='Search for products ...'/>
                <button onClick={handleSearch} className='search-btn'>Search</button>
           </div>

          <div className='icons'>
             <div className='profile-group'>
                    <BiUser className='icon'/>
               <div className='dropdown-menu'>
                 <Link to='/login'>
                    <p className='dropdown-item'>Login/Sign Up</p>
                 </Link>

                 <Link to='/orders'>
                    <p className='dropdown-item'>Orders</p>
                 </Link>
                     <p onClick={logout} className='dropdown-item'> logout</p>
               </div>
            </div> 
            <div className='cart-icon' onClick={()=>handleNavigation("/cart")}>
                   <BiCart className='icon'/>
                   <span className='cart-count'>{getCartCount()}</span>
            </div>
         </div>
         </div>
         
            <div className='nav-bottom'>
                 <div className='nav-container'>
                      <div onClick={()=>handleNavigation("/category/soinvisage")} className='navbar-link'>Soins Visage</div>
                      <div  onClick={()=>handleNavigation("/category/soincheveu")} className='navbar-link'>Soins Cheveux</div>
                      <div  onClick={()=>handleNavigation("/category/orthopiedie")}  className='navbar-link'>Orthopédie</div>
                 </div>
            </div>
      </nav>
    </div>
  )
}

export default Navbar

