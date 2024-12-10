import React, { useContext, useEffect, useState } from "react";
import { wishList } from "../../Context/WishList.context";
import Loading from "../../components/Loading/Loading";
import { cartContext } from "../../Context/cart.context";
import { Link } from "react-router-dom";



export default function Favorites() {
  const [products, setProducts] = useState(null)
  let {getAllProductWishList,delProductToWishList} = useContext(wishList)
  let {addTocCart} = useContext(cartContext);

  useEffect(() => {
    getAllProductWishList().then((res) => {
    
      setProducts(res.data)
    });
  }, [delProductToWishList]);
  return (
    <>
      <div className="container">
      {products == 0?<div className='border border-green-400 p-8 '>
            No wish product here please go to  <Link className='text-green-400 underline uppercase text-lg ' to="/">Home</Link>
          </div>:""}
        <section className=" grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 justify-between items-stretch ">
      
       { products? products.map((product)=>{
          return (
            <div key={product.id} className="item  bg-gray-100 p-4 rounded-md flex justify-between gap-4 flex-col">
            <img src={product.imageCover} alt={product.title} />
            <h1 className="text-lg font-semibold">{product.title}</h1>
            <div className="rate space-x-2">
              <i class="fa-solid fa-star text-green-400 text-lg"></i>
              <i class="fa-solid fa-star text-green-400 text-lg"></i>
              <i class="fa-solid fa-star text-green-400 text-lg"></i>
              <i class="fa-solid fa-star text-green-400 text-lg "></i>
              <span className="ml-4 text-lg">{product.ratingsAverage}</span>
            </div>
            <h2 className="text-xl font-bold">{product.price} Egy</h2>
            <button className="btn" onClick={()=>{addTocCart(product.id)}}>
              <i class="fa-solid fa-cart-shopping text-white"></i>
              <span className="ml-2" > Add to cart</span>
            </button>
            <button
              onClick={()=>{delProductToWishList(product.id);}}
                type="button"
                className="self-center space-x-1 inline-flex items-center text-sm font-medium text-red-600 hover:underline "
              >
                <i class=" text-red-600 text-lg fa-sharp-duotone fa-solid fa-xmark"></i>
                <span>Remove from wishList</span>
              </button>
          </div>
          )
       })
       :<Loading/>}
          
        </section>
      </div>
    </>
  );
}
