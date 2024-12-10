import React, { useContext, useEffect } from "react";
import { ProductSp } from "../../Context/ProductSp";
import Loading from "../../components/Loading/Loading";
import { cartContext } from "../../Context/cart.context";
import ReactImageGallery from "react-image-gallery";
import Product from "../../components/Product/Product";
import { useParams } from "react-router-dom";
export default function ProductDetails() {
  const { productItem, getRelatedProducts, relatedProduct } =   useContext(ProductSp);
  const { addTocCart } = useContext(cartContext);
  const { param } = useParams();

  useEffect(() => {
    if (productItem == null) return;
    getRelatedProducts(productItem.category._id);
    // call this function when change in productItem or param => rerender form component
  }, [productItem,param]);
 
  return (
    <>
      {productItem && relatedProduct ? (
        <>
          <div className="container">
            <section className="product grid grid-cols-1  items-start lg:grid-cols-2 gap-12    lg:grid-rows-1">
              <div className="imgages col-span-1 space-y-4">
                <ReactImageGallery
                  showNav={false}
                  showPlayButton={false}
                  items={productItem.images.map((img) => {
                    return { original: img, thumbnail: img };
                  })}
                />
              </div>
              <article className="space-y-4">
                <h1 className="title font-semibold capitalize text-2xl">
                  {productItem.title}
                </h1>
                <p className="font-semibold capitalize text-xl">
                  category :{" "}
                  <span className="ml-4 text-gray-700">
                    {" "}
                    {productItem.category.name}
                  </span>
                </p>
                <div className=" font-bold uppercase flex  gap-40">
                  <h2 className="price text-xl">{productItem.price} Egy</h2>
                  <div className="rate">
                    <i class="fa-solid fa-star text-green-400 text-lg"></i>
                    <span className="px-3 py-1  text-xl">
                      {productItem.ratingsAverage}
                    </span>
                  </div>
                </div>
                <p className="details">
                  <h2 className="font-semibold capitalize text-xl">
                    product details
                  </h2>
                  <span>{productItem.description}</span>
                </p>
                <button
                  className="btn capitalize"
                  onClick={() => {
                    addTocCart(productItem.id);
                  }}
                >
                  Add to cart
                </button>
              </article>
            </section>
            <section className="relatedProduct ">
              <swiper-container  slides-per-view="4" loop="true"    space-between={10}   > 
                {relatedProduct.map((product)=>{
                  return (<swiper-slide className="flex flex-col items-center justify-between bg-gray-100 rounded-lg shadow-md h-full p-4"><Product   key={product._id} product={product}/></swiper-slide>)
                })}
        
              
              </swiper-container>
            </section>
          </div>
        </>
      ) : (
        <Loading></Loading>
      )}
    </>
  );
}
