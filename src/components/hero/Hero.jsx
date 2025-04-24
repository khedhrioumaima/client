import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, EffectFlip } from 'swiper/modules';


import 'swiper/swiper-bundle.css';
import  p1  from "../../assets/p1.jpg";
import  p2  from "../../assets/p2.webp";
import  p3  from "../../assets/p3.webp";
import  p4  from "../../assets/p4.webp";
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { FaShippingFast } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import { BiSupport } from "react-icons/bi";
import { MdPayment } from "react-icons/md";
import './hero.css'
const Hero = () => {
  return (
    <div>
         <div className='hero-top'>
         <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y,EffectFlip]}
      
      spaceBetween={50}
      effect="flip"
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      
    >
      <SwiperSlide>
        <img src={p1} alt='slide1' style={{width:"100%"}}/>
      </SwiperSlide>
      <SwiperSlide>
      <img src={p2} alt='slide2' style={{width:"100%"}}/>
      </SwiperSlide>
      <SwiperSlide>
      <img src={p3} alt='slide3' style={{width:"100%"}}/>
      </SwiperSlide>

      <SwiperSlide>
      <img src={p4} alt='slide4' style={{width:"100%"}}/>
      </SwiperSlide>
    </Swiper>
  
         </div>
         <div className='hero-bottom'>
               <div className='hero-content'>
                 <div className='info-icon'><FaShippingFast className='hero-icon'/></div>
                 <div className='detail'>
                       <h3>Free shipping </h3>
                       <p>free shipping an order 150 dt</p>
                 </div>
               </div>
               <div className='hero-content'>
               <div className='info-icon'><FiSend className='hero-icon'/></div>
               <div className='detail'>
                       <h3>ARAMEX </h3>
                       <p>we deliver to all countries</p>
                 </div>
               </div>
               <div className='hero-content'>
               <div className='info-icon'><BiSupport className='hero-icon'/></div>
               <div className='detail'>
                       <h3>24/24 && 7/7</h3>
                       <p>+216 74 457 410</p>
                 </div>
               </div>
               <div className='hero-content'>
               <div className='info-icon'><MdPayment className='hero-icon'/></div>
               <div className='detail'>
                       <h3>Security payment </h3>
                       <p>Your payment is secure</p>
                 </div>
               </div>
         </div>
       
    </div>
  )
}

export default Hero
