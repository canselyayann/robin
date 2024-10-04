import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../store/categoriesSlice";
import { removeToCart ,addToCart} from "../store/cartSlice";
import { addToWish,removeToWish } from "../store/wishSlice";
export default function Header(props) {
  const url = "#";
  const categoriesredux = useSelector((state) => state.category.categories);
  const categorystatus = useSelector((state) => state.category.status);


  const urunusil = (product)=>{
    dispatch(removeToCart(product));
    }

  const dispatch = useDispatch();

  useEffect(() => {
    if (categorystatus === "idle") {
      dispatch(fetchCategories());
    }
  }, [categorystatus, dispatch]);

 const sepetteki_urun_miktari = useSelector((state)=> state.cart.cartItems.length)

 const sepettekiurunler = useSelector((state)=>state.cart.cartItems)
console.log("Sepetteki ürün miktarı: "+sepetteki_urun_miktari);

const addtoCart1 = (product) =>{
  console.log(product);
dispatch(addToCart(product));
}

const removetowish1 = (product)=>{
  dispatch(removeToWish(product));
}

const favori_urunler = useSelector((state)=>state.wish.wishs.length)
const favori_urunler_data = useSelector((state)=>state.wish.wishs)
console.log("favori ürün sayısı: "+favori_urunler);
  return (
    <>
      <div className="header-area header-area--default header-area--default--white header-sticky">
        <div className="header-navigation-area header-navigation-area--white header-navigation-area--extra-space d-none d-lg-block">
          <div className="container wide">
            <div className="row">
              <div className="col-lg-12">
                <div className="header-info-wrapper header-info-wrapper--alt-style">
                  <div className="header-logo">
                    <Link to="/">
                      <img
                        src="/img/logo.png"
                        className="img-fluid"
                        alt="Logo"
                      />
                    </Link>
                  </div>
                  <div className="header-navigation-wrapper">
                    <nav>
                      <ul>
                        <li className="has">
                          <Link to="/">Home</Link>
                        </li>
                        <li className="has">
                          <Link to="/about">About</Link>
                        </li>
                        <li className="has-children">
                          <a href="/">Categories</a>
                          <ul className="submenu submenu--column-1">
                            {categoriesredux.map((category) => (
                              <li key={category.id}>
                                <Link to={`/category/${category.id}`}>
                                  {category.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </li>
                        <li className="has">
                          <Link to="/blog">Blog</Link>
                        </li>
                        <li className="has">
                          <Link to="/faq">Faq</Link>
                        </li>
                        <li className="has">
                          <Link to="/contact">Contact</Link>
                        </li>
                      </ul>
                    </nav>
                  </div>
                  <div className="header-icon-area">
                    <div className="account-dropdown">
                      <Link to="/ordertracking">Order Tracking</Link>
                    </div>
                    <div className="header-icon d-flex align-items-center">
                      <ul className="header-icon__list">
                        <li>
                          <Link to="/wishlist">
                            <i className="fa fa-heart-o" />
                            <span className="item-count">
                              {favori_urunler}
                            </span>
                          </Link>
                          <div className="minicart-wrapper">
                            <p className="minicart-wrapper__title">WISHLIST</p>
                            <div className="minicart-wrapper__items ps-scroll">
                              {favori_urunler_data.map((item) => (
                                <div
                                  key={item.product.slug}
                                  className="minicart-wrapper__items__single"
                                >
                                  <p
                                    onClick={() => {
                                      removetowish1(item.product);
                                    }}
                                    className="close-icon"
                                  >
                                    <i className="pe-7s-close" />
                                  </p>
                                  <div className="image">
                                    <Link
                                      to={`/product/${item.product.slug}`}
                                    >
                                      <img
                                        src={`/${item.product.image}`}
                                        className="img-fluid"
                                        alt=""
                                        style={{
                                          width: "90px",
                                          height: "100px",
                                        }}
                                      />
                                    </Link>
                                  </div>
                                  <div className="content">
                                    <p className="product-title">
                                      <Link
                                        to={`/product/${item.product.slug}`}
                                      >
                                        {item.product.title}
                                      </Link>
                                    </p>
                                    <p className="product-calculation">
                                      <span className="price">
                                        {item.product.price}$
                                      </span>
                                    </p>
                                    <a
                                      href={url}
                                      onClick={() => {
                                        addtoCart1(item.product);
                                      }}
                                      className="wishlist-cart-icon"
                                    >
                                      <i className="fa fa-shopping-basket" />
                                      ADD TO CART
                                    </a>
                                  </div>
                                </div>
                              ))}
                            </div>
                            <div className="minicart-wrapper__buttons mb-0">
                              <Link
                                to="/wishlist"
                                className="theme-button theme-button--minicart-button mb-0"
                              >
                                VIEW WISHLIST
                              </Link>
                            </div>
                          </div>
                        </li>
                        <li>
                          <Link to="/cart">
                            <i className="fa fa-shopping-basket" />
                            <span className="item-count">
                              {sepetteki_urun_miktari}
                            </span>
                          </Link>
                          <div className="minicart-wrapper">
                            <p className="minicart-wrapper__title">CART</p>
                            <div className="minicart-wrapper__items ps-scroll">
                              {sepettekiurunler.map((item) => (
                                <div
                                  key={item.product.slug}
                                  className="minicart-wrapper__items__single"
                                >
                                  <p
                                    className="close-icon"
                                    onClick={() => {
                                      urunusil(item.product);
                                    }}
                                  >
                                    <i className="pe-7s-close" />
                                  </p>
                                  <div className="image">
                                    <Link
                                      to={`/product/${item.product.slug}`}
                                    >
                                      <img
                                        src={`/${item.product.image}`}
                                        className="img-fluid"
                                        alt=""
                                        style={{
                                          width: "90px",
                                          height: "100px",
                                        }}
                                      />
                                    </Link>
                                  </div>
                                  <div className="content">
                                    <p className="product-title">
                                      <Link
                                        to={`/product/${item.product.slug}`}
                                      >
                                        {item.product.title}
                                      </Link>
                                    </p>
                                    <p className="product-calculation">
                                      <span className="count">
                                        {item.quantity}
                                      </span>{" "}
                                      x
                                      <span className="price">
                                        {item.product.price} $
                                      </span>
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                            <p className="minicart-wrapper__subtotal">
                              SUBTOTAL:{" "}
                              <span>
                                {sepettekiurunler.reduce(
                                  (a, b) =>
                                    a + b.product.price * b.quantity,
                                  0
                                )}{" "}
                                $
                              </span>
                            </p>
                            <div className="minicart-wrapper__buttons">
                              <Link
                                to="/cart"
                                className="theme-button theme-button--minicart-button"
                              >
                                VIEW CART
                              </Link>
                              <Link
                                to="/checkout"
                                className="theme-button theme-button--alt theme-button--minicart-button theme-button--minicart-button--alt mb-0"
                              >
                                CHECKOUT
                              </Link>
                            </div>
                            <p className="minicart-wrapper__featuretext">
                              Free Shipping on All Orders Over $100!
                            </p>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="header-mobile-navigation d-block d-lg-none">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-6 col-md-6">
              <div className="header-logo">
                <a href="/">
                  <img
                    src="/img/logo.png"
                    className="img-fluid"
                    alt="Logo"
                  />
                </a>
              </div>
            </div>
            <div className="col-6 col-md-6">
              <div className="mobile-navigation text-right">
                <ul className="header-icon__list header-icon__list--white">
                  <li>
                    <a
                      href="#"
                      className="mobile-menu-icon"
                      id="mobile-menu-trigger"
                    >
                      <i className="fa fa-bars" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
