import React, { Component } from "react";

import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import { useDispatch, useSelector } from "react-redux";
import { removeToCart ,addToCart} from "../store/cartSlice";
import { addToWish,removeToWish } from "../store/wishSlice";


export default function Wishlist(props) {


  const dispatch = useDispatch();
  const addtoCart1 = (product) =>{
    console.log(product);
  dispatch(addToCart(product));
  }
  const removetowish1 = (product)=>{
    dispatch(removeToWish(product));
  }
const favori_urunler = useSelector((state)=>state.wish.wishs.length)
const favori_urunler_data = useSelector((state)=>state.wish.wishs)
  return (
    <>
    <Hero title="Wishlist" subtitle="Wishlist" />
    <div className="page-content-wrapper">
      <div className="shopping-cart-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="cart-table-container">
                <table className="cart-table">
                  <thead>
                    <tr>
                      <th className="product-name" colSpan={2}>
                        Product
                      </th>
                      <th className="product-price">Price</th>
                      <th className="product-subtotal">&nbsp;</th>
                      <th className="product-remove">&nbsp;</th>
                    </tr>
                  </thead>
                  <tbody>
                    {favori_urunler_data.map((item) => (
                      <tr>
                        <td className="product-thumbnail">
                          <Link to={"/product/" + item.product.slug}>
                            <img
                              src={"/" + item.product.image}
                              className="img-fluid"
                              alt=""
                            />
                          </Link>
                        </td>
                        <td className="product-name">
                          <Link to={"/product/" + item.product.slug}>
                            {item.product.title}
                          </Link>
                        </td>
                        <td className="product-price">
                          <span className="price">
                            ${item.product.price}
                          </span>
                        </td>
                        <td className="add-to-cart">
                          <button
                            onClick={() =>
                              addtoCart1(item.product)
                            }
                            className="theme-button theme-button--alt theme-button--wishlist"
                          >
                            ADD TO CART
                          </button>
                        </td>
                        <td className="product-remove">
                          <button
                            onClick={() =>
                              removetowish1(item.product)
                            }
                          >
                            <i className="pe-7s-close" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
  )
}
