import React from "react";
import image1 from "../assets/images/slider-image-1.jpeg";
import image2 from "../assets/images/slider-image-2.jpeg";
import image3 from "../assets/images/slider-image-3.jpeg";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
export default function SliderHome() {
 
  return (
    <>
      <div className="grid grid-cols-12 ">
        <div className="col-span-8">
          <swiper-container loop="true" autoplay="true" >
            <swiper-slide>
              <img
                src={image1}
                className="w-full h-full object-cover"
                alt="img1 slider"
              />
            </swiper-slide>
            <swiper-slide>
              <img
                src={image2}
                className="w-full h-full object-cover"
                alt="img1 slider"
              />
            </swiper-slide>
            <swiper-slide>
              <img
                src={image3}
                className="w-full h-full object-cover"
                alt="img1 slider"
              />
            </swiper-slide>
            
          </swiper-container>
        </div>
        <div className="col-span-4">
          <figure>
            <img src={image2} className="w-full" alt="img2 slider" />
          </figure>
          <figure>
            <img src={image3} className="w-full" alt="img3 slider" />
          </figure>
        </div>
      </div>
    </>
  );
}
