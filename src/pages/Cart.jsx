import React, { Component } from "react";
import Hero from "../components/Hero";
import { Link } from "react-router-dom";
import {useDispatch, useSelector } from 'react-redux'
import { removeToCart } from "../store/cartSlice";

export default function Cart(props) {




 
  const sepetteki_urun_miktari = useSelector((state)=> state.cart.cartItems.length)

  const sepettekiurunler = useSelector((state)=>state.cart.cartItems)
const dispatch = useDispatch();

  const urunusil = (product)=>{
  dispatch(removeToCart(product));
  }

  return (
    <>
    <Hero title="Cart" bread="Cart" />
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
                      <th className="product-quantity">Quantity</th>
                      <th className="product-subtotal">Total</th>
                      <th className="product-remove">&nbsp;</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sepettekiurunler.map((item) => (
                      <tr key={item.product.id}>
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
                        <td className="product-quantity">
                          <div className="pro-qty d-inline-block mx-0">
                            <input
                              type="text"
                              defaultValue={item.quantity}
                            />
                          </div>
                        </td>
                        <td className="total-price">
                          <span className="price">
                            ${item.product.price * item.quantity}
                          </span>
                        </td>
                        <td className="product-remove">
                          <button
                            onClick={() =>
                              urunusil(item.product)
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

            <div className="col-lg-6 offset-lg-6">
              <div className="cart-calculation-area">
                <h2 className="cart-calculation-area__title">
                  Cart totals
                </h2>
                <table className="cart-calculation-table">
                  <tbody>
                    <tr>
                      <th>SUBTOTAL</th>
                      <td className="subtotal">
                        {sepettekiurunler.reduce(
                          (a, c) => a + c.product.price * c.quantity,
                          0
                        )}
                      </td>
                    </tr>
                    <tr>
                      <th>TOTAL</th>
                      <td className="total">
                        {sepettekiurunler.reduce(
                          (a, c) => a + c.product.price * c.quantity,
                          0
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="cart-calculation-button">
                  <Link
                    to="/checkout"
                    className="theme-button theme-button--alt theme-button--checkout"
                  >
                    PROCEED TO CHECKOUT
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
  )
}
