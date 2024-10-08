import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import alertify from "alertifyjs";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./pages/Main";
import About from "./pages/About";
import Blog from "./pages/Blogs";
import BlogDetails from "./pages/BlogDetails";
import Faq from "./pages/Faq";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Wishlist from "./pages/Wishlist";
import OrderTracking from "./pages/OrderTracking";
import Categories from "./pages/Categories";
import ProductDetails from "./pages/ProductDetails";

import { fetchProducts } from "./store/productSlice";
import { fetchCategories } from "./store/categoriesSlice";

export default function App() {
  const [categories, setCategories] = useState([]);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [orders, setOrders] = useState([]);

  const dispatch = useDispatch();

  const productStatus = useSelector((state) => state.product.status);
  const productsRedux = useSelector((state) => state.product.products);

  const categoryStatus = useSelector((state) => state.category.categoryStatus);
  const categoriesRedux = useSelector((state) => state.category.categories);

  useEffect(() => {
    if (productStatus === "idle") {
      dispatch(fetchProducts());
    }
    if (categoryStatus === "idle") {
      dispatch(fetchCategories());
    }
  }, [dispatch, productStatus, categoryStatus]);

  const addToWishlist = (product) => {
    let newWishlist = [...wishlist];
    const addedItem = newWishlist.find((c) => c.product.id === product.id);

    if (!addedItem) {
      newWishlist.push({ product: product });
    }

     setWishlist(newWishlist);
    alertify.success(`${product.title} added to wishlist!`);
  };

  const removeToWishlist = (product) => {
    const newWishlist = wishlist.filter((c) => c.product.id !== product.id);
    setWishlist(newWishlist);
    alertify.error(`${product.title} removed from wishlist!`);
  };

  const searchBlogs = (searchKey) => {
    if (searchKey === "") {
      getBlogs();
    } else {
      const filteredBlogs = blogs.filter((blog) =>
        blog.title.toLowerCase().includes(searchKey.toLowerCase())
      );
      setBlogs(filteredBlogs);
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <>
      <Header
        cart={cart}
        wishlist={wishlist}
        removeToWishlist={removeToWishlist}
        categories={categoriesRedux}
      />

      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/product/:slug" element={<ProductDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog/:slug" element={<BlogDetails />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout cart={cart} clearCart={clearCart} />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/ordertracking" element={<OrderTracking orders={orders} />} />
        <Route path="/category/:categoryId" element={<Categories />} />
      </Routes>
      
      <Footer />
    </>
  );
}
