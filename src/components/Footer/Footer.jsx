import React from 'react'
import { FiSend } from "react-icons/fi";
import { FaFacebookSquare } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import './Footer.css';
const Footer = () => {
  return (
    <div>
      <div className='footer'>
        <div className='footer-top'>
            <h2><FiSend /></h2>
            <p>Subscribe to our Newsletter</p>
            <div className='input'>
                <input type='email' name='email' id='' placeholder='Enter your email'/>
                <button>Join Now</button>
            </div>
        </div>
        <div className='footer-bottom'>
            
        <div className='foter-left'>
            <h2>Valmy Para</h2>
            <h6>The Essence of Luxury Skincare and Wellness Excellence</h6>
            <div className='Socials'>
            <FaFacebookSquare  className='social-icon'/>
            <FaInstagram className='social-icon'/>
            <FaTwitter className='social-icon'/>
            </div>
        </div>
        <div className='foter-right'>
            <ul>
                <li>Home</li>
                <li>Services</li>
                <li>About us</li>
                <li> Policy Privacy</li>
            </ul>
        </div>
        </div>
        <p className='copy'>© 2025 Valmy Para. All rights reserved.</p>
      </div>
    </div>
  )
}

export default Footer
