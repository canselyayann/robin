import React, {useEffect} from 'react';
import Hero from "../components/Hero";
import {useParams} from "react-router-dom";
import CategoryCard from "../components/CategoryCard";
import { fetchProducts ,filterProductsByCategoryId} from "../store/productSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Categories({addToCart, addToWishlist}) {

    const {categoryId} = useParams();
    console.log("Mevcut category id = "+categoryId)
   
    const productstatus = useSelector((state)=>state.product.status)
    const products_redux = useSelector((state)=>state.product.products)
    const dispatch = useDispatch();
   
    useEffect(() => {
      console.log("Yükleniyor = "+categoryId)
      dispatch(filterProductsByCategoryId(categoryId));
    }, [categoryId, dispatch]);


  return (
    <>
    <Hero title="Categories"/>
    <div className="product-fullpage-no-gutter-area">
        <div className="row no-gutters">
            {products_redux.map((item, index) => (
                <CategoryCard key={index} product={item} addToCart={addToCart}
                             addToWishlist={addToWishlist}/>
            ))}
        </div>
    </div>
</>
  )
}
