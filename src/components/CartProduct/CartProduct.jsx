import React, { useContext, useEffect, useState } from "react";
import { cartContext } from "../../Context/cart.context";
import { wishList } from "../../Context/WishList.context";


export default function CartProduct({ cart }) {
    // Getting some props from carts component
  const { product, price } = cart;
  const{addProductToWishList} = useContext(wishList)
  const [count, setCount] = useState(cart.count);
//   get some state from cartContext state
  const {quantityCart,deleteCart} = useContext(cartContext);
// increase count when click in it
        async function increase(id){
            setCount(count + 1)
            await quantityCart({id, count})
        }
        // decrease function count
       async function decrease(id){
        if(count  <= 0){
            deleteCart(product._id)
        }
            setCount(count - 1);
            await quantityCart({id, count})
        }

  return (
    <>
      <div className="cart group rounded-lg border  border-gray-200 bg-white p-4 shadow-sm ">
        <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
          <img
            src={product.imageCover}
            alt={product.title}
            className="h-20 w-20  object-cover group-hover:scale-150 transition-transform duration-[1s]"
          />

          <label htmlFor="counter-input" className="sr-only">
            Choose quantity:
          </label>
          <div className="flex items-center justify-between md:order-3 md:justify-end">
            <div className="count-container flex items-center">
              <i onClick={()=>decrease(product._id)} className="decrease fa-solid text-md hover:bg-slate-300 cursor-pointer fa-minus text-slate-500 rounded-md border bg-slate-100 p-0.5"></i>
              <span className="count mx-2"> {count}</span>
              <i onClick={()=>increase(product._id)} className="increase fa-solid text-md hover:bg-slate-300 cursor-pointer fa-plus text-slate-500 rounded-md  border bg-slate-100 p-0.5"></i>
            </div>
            <div className="price text-end md:order-4 md:w-32">
              <span className="text-base font-bold text-gray-900 ">
                {price} EGY
              </span>
            </div>
          </div>
          <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
            <h3 className="text-base font-medium text-gray-900 hover:underline ">
              {product.title}
            </h3>
            <div className="flex items-center gap-4">
              <button
                type="button"
                className="favorite inline-flex group items-center text-sm font-medium text-gray-500 hover:text-gray-900  "
              >
                <i className="group-hover:text-green-400 text-lg fa-regular fa-heart pr-4"></i>
                <span className="hover:text-green-400 " onClick={()=>addProductToWishList(product._id)}>
                  Add to Favorites
                </span>
              </button>
              <button
              onClick={()=>{deleteCart(product._id)}}
                type="button"
                className="space-x-1 inline-flex items-center text-sm font-medium text-red-600 hover:underline "
              >
                <i class=" text-red-600 text-lg fa-sharp-duotone fa-solid fa-xmark"></i>
                <span>Remove</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
