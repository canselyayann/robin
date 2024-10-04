import React, { Component } from "react";
import { Link } from "react-router-dom";
import { addToWish } from "../store/wishSlice";
import { useDispatch } from "react-redux";

export default function CategoryCard(props) {

  const dispatch = useDispatch();
  const addToWishlist1 = (product) => {
    dispatch(addToWish(product));
  };

  const url = "#";
  return (
    <>

    <div className="col-xl-custom-2 col-xl-3 col-lg-4 col-md-4 col-sm-6 col-custom-sm-6">
      <div className="single-grid-product single-grid-product--overlay">
        <div className="single-grid-product__image">
          <a
            href={url}
            className="favorite-icon"
            data-tippy="Add to Wishlist"
            data-tippy-inertia="true"
            data-tippy-animation="shift-away"
            onClick={() => addToWishlist1(props.product)}
            data-tippy-delay={50}
            data-tippy-arrow="true"
            data-tippy-theme="sharpborder"
            data-tippy-placement="left"
          >
            <i className="fa fa-heart-o" />
            <i className="fa fa-heart" />
          </a>
          <div className="product-badge-wrapper">
            <span className="hot">
              {props.product.status.new_arrival ? "New" : ""}
            </span>
            <span className="hot">
              {props.product.status.featured ? "Featured" : ""}
            </span>
            <span className="hot">
              {props.product.status.on_sale ? "On Sale" : ""}
            </span>
          </div>
          <Link
            to={"/product/" + props.product.slug}
            className="image-wrap"
          >
            <img
              src={"/" + props.product.image}
              className="img-fluid"
              alt=""
            />
            <img
              src={"/" + props.product.image}
              className="img-fluid"
              alt=""
            />
          </Link>
          <div className="product-hover-icon-wrapper">
            <span className="single-icon single-icon--add-to-cart">
              <button
                data-tippy="Add to cart"
                data-tippy-inertia="true"
                onClick={() => props.addToCart(props.product)}
                data-tippy-animation="shift-away"
                data-tippy-delay={50}
                data-tippy-arrow="true"
                data-tippy-theme="sharpborder"
                className="btn btn--icon btn--icon--left"
              >
                <i className="fa fa-shopping-basket" />
                <span>ADD TO CART</span>
              </button>
            </span>
          </div>
          <div className="product-info">
            <p className="title">
              <Link to={"/product/" + props.product.slug}>
                {props.product.title}
              </Link>
            </p>
            <p className="price">{props.product.price}$</p>
          </div>
        </div>
      </div>
    </div>
  </>
  )
}
