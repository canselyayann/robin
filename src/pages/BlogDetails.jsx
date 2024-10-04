import React from "react";
import Hero from "../components/Hero";
import { useParams } from "react-router-dom";
import { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux'
import { fetchBlogs,filterBlogs } from '../store/blogSlices';

export default function BlogDetails() {



  const dispatch = useDispatch();

  const blogstatus = useSelector((state) =>  state.blog.status);

  const blog_yazilari = useSelector((state) => state.blog.blogs);
 
  useEffect(() => {
      if (blogstatus === "idle") {
          dispatch(fetchBlogs());
     
  
      }
  }, [blogstatus, dispatch]);

  const getBlogBySlug = (slug) => {
    return blog_yazilari.find((item) => item.slug === slug);
  };
  
  const { slug } = useParams();
  const blog = getBlogBySlug(slug);

  console.log(blog);

  return (
    <>
    <Hero title={blog.title} />
    <div className="page-content-wrapper">
      <div className="blog-page-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 order-1">
              <div className="blog-single-post-details-wrapper">
                <h2 className="post-title">{blog.title}</h2>

                <div className="post-thumbnail">
                  {blog.image === "" ? (
                    <iframe
                      width="100%"
                      height="500px"
                      src={blog.video}
                      frameBorder="0"
                      title="video"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <img src={"/" + blog.image} alt="" />
                  )}
                </div>
                <div className="post-text-content">
                  <p>{blog.long_description}</p>
                </div>
                <div className="post-share-section">
                  <span>SHARE :</span>
                  <ul className="post-social-icons">
                    <li>
                      <a href="/">
                        <i className="fa fa-facebook" />
                      </a>
                    </li>
                    <li>
                      <a href="/">
                        <i className="fa fa-twitter" />
                      </a>
                    </li>
                    <li>
                      <a href="/">
                        <i className="fa fa-google-plus" />
                      </a>
                    </li>
                    <li>
                      <a href="/">
                        <i className="fa fa-pinterest" />
                      </a>
                    </li>
                  </ul>
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
