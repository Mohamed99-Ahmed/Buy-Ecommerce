import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { cartContext } from "../../Context/cart.context";
import { ProductSp } from "../../Context/ProductSp";
import { wishList } from "../../Context/WishList.context.jsx";

export default function Product({ product }) {
  const {getSpProduct} = useContext(ProductSp)
  const {addTocCart} = useContext(cartContext);
  const {addProductToWishList} = useContext(wishList)
  // useEffect(()=>{
  //   addProductToWishList('6428ebc6dc1175abc65ca0b9')
  // },[])

  return (
    <>
      <figure className="flex overflow-hidden  relative cursor-pointer group flex-col justify-between items-center gap-2 p-2 pb-14  shadow-product  border-1 rounded-md">
        <div className="overflow-hidden self-stretch">
          <img
            src={product.imageCover}
            className=" h-[200px]  duration-1000 w-full object-cover   transition-[transform]  group-hover:scale-125"
            alt={product.title}
          />
        </div>
        <p className="text-green-800 font-bold capitalize text-lg">
          {product.category.name}
        </p>
        <h1 className="capitalize text-lg font-bold line-clamp-2">
          {product.title}
        </h1>
        <p className="space-x-4">
          <i class="fa-solid fa-star text-green-600"></i>
          <i class="fa-solid fa-star text-green-600"></i>
          <i class="fa-regular fa-star"></i>
          <span className="bg-green-300 px-3 py-1 round-sm">
            {product.ratingsAverage}
          </span>
        </p>
        <span className="font-bold text-xl whitespace-nowrap">
          price : {product.price} EGP
        </span>
        <div className="layer flex gap-2  px-3 absolute bottom-[-100px] transition-all duration-[1s] group-hover:bottom-[5px]">
          <span
            onClick={()=>addProductToWishList(product.id)}
            className="btn p-2 rounded-full w-10 h-10 flex items-center justify-center love  whitespace-nowrap "
          >
            <i className="fa-regular fa-heart"></i>
          </span>
          <span
            onClick={()=>addTocCart(product.id)}
            className="btn p-2 rounded-full w-10 h-10 flex items-center justify-center  buy whitespace-nowrap "
          >
            <i className="fa-solid fa-dumpster"></i>
          </span>
         <div className="show inline" onClick={()=>{getSpProduct(product.id)}}>
         <Link
            to={`/product/${product.id}`}
            className="btn p-2 rounded-full w-10 h-10 flex items-center justify-center veiw  whitespace-nowrap "
          >
            <i className="fa-regular fa-eye"></i>
          </Link>
         </div>
        </div>
      </figure>
    </>
  );
}
