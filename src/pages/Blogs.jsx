import React, {useState} from 'react';
import {Link} from "react-router-dom";
import BlogListCard from "../components/BlogListCard";
import Hero from "../components/Hero";
import { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux'
import { fetchBlogs,filterBlogs } from '../store/blogSlices';

export default function Blogs() {

    const getBlogs = () => {
        dispatch(fetchBlogs());
      };

    const searchBlogs = (searchKey) => {
        if (searchKey === "") {
          getBlogs();
        }else {
            console.log("arama kelimesine göre arama işlemi yapılıyor..");
            dispatch(filterBlogs(searchKey)); 
            
        }
  
      };
    


    const [searchKey, setSearchKey] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        console.log("arama yapılıyor..");
        searchBlogs(searchKey);
    };

    const dispatch = useDispatch();

    const blogstatus = useSelector((state) =>  state.blog.status);

    const blog_yazilari = useSelector((state) => state.blog.blogs);

    useEffect(() => {
        if (blogstatus === "idle") {
            dispatch(fetchBlogs());
            console.log("bloglar yükleniyor...");
    
        }
    }, [blogstatus, dispatch]);


  return (
    <>
    <Hero title="Blogs"/>
    <div className="page-content-wrapper">
        <div className="blog-page-area">
            <div className="container">
                <div className="row">
                    <div className="col-lg-3 order-2">
                        <div className="blog-sidebar-wrapper">
                            <div className="single-sidebar-widget single-sidebar-widget--extra-space">
                                <h2 className="single-sidebar-widget__title single-sidebar-widget__title--extra-space">Search</h2>
                                <div className="sidebar-search">
                                    <form onSubmit={handleSearch}>
                                        <input
                                            type="search"
                                            placeholder="Search..."
                                            value={searchKey}
                                            onChange={(e) => setSearchKey(e.target.value)}
                                        />
                                        <button type="submit">
                                            <i className="fa fa-search"/>
                                        </button>
                                    </form>
                                </div>
                            </div>
                            <div className="single-sidebar-widget">
                                <h2 className="single-sidebar-widget__title">Recent Posts</h2>
                                <ul className="single-sidebar-widget__dropdown single-sidebar-widget__dropdown--extra-height">
                                    {/* only 5 posts slice */}
                                    
                                    {blog_yazilari.slice(0, 5).map((blog, index) => (
                                        <li key={index}>
                                            <Link to={`/blog/${blog.slug}`}>
                                                {blog.title}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-9 order-1">
                        <div className="blog-post-wrapper">
                            <div className="row">
                                

                                
                            {blog_yazilari.map((blog, index) => (
                                    <BlogListCard key={index} blog={blog}/>
                                ))}


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
