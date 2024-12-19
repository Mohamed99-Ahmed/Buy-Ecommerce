import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";
import { spececCatag } from "../../Context/SpeceficCategory";


export default function SliderCategories() {
  // get some data from context
  const {getSpesProducts}= useContext(spececCatag)
  const [products, setProducts] = useState([]);
  const useNav = useNavigate()
  useEffect(() => {
    // getCategories func when call in intial render of this component
    getCategories();
    
  }, []);
  async function getCategories() {
    const { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/categories"
    );
    let products = data.data;
    setProducts(products);
  }
  async function goCatagPage(id){
    await getSpesProducts(id);
    useNav(`/categories/${id}`)
  }
  return (
    <>
      <swiper-container
        slides-per-view="4"
        grid-rows="1"
        mousewheel-force-to-axis="true"
        loop="true"
        autoplay="true"
        delay="5000"
      >
        {products
          ? products.map((product) => {
              return (
                <swiper-slide key={product._id}>
                  <span onClick={()=>goCatagPage(product._id)} className="space-y-4 cursor-pointer">
                    <img
                      src={product.image}
                      className="w-full h-[100px] object-cover"
                      alt={product.name}
                    />
                    <p className="text-sm font-semibold text-center">{product.name}</p>
                  </span>
                </swiper-slide>
              );
            })
          : ""}
      </swiper-container>
    </>
  );
}
