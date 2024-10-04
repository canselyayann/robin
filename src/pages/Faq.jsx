
import React, { Component } from 'react';
import Hero from "../components/Hero";

import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { fetchFaq } from "../store/faqSlices";



export default function Faq(props) {

    const dispatch = useDispatch();
    const faqs = useSelector((state) => state.faqs.faqs);
    const faqsStatus = useSelector((state) => state.faqs.status);
    const error = useSelector((state) => state.faqs.error);

    useEffect(() => {
        if (faqsStatus === "idle") {
            dispatch(fetchFaq());
        }
    }, [faqsStatus, dispatch]);


    return (
        <>
            <Hero title="FAQ" />
            <div className="page-content-wrapper">
                <div className="faq-area section-space">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="faq-wrapper">
                                    <div className="single-faq">
                                        <h2 className="faq-title">Frequently Asked Questions</h2>
                                        <div className="accordion" id="shippingInfo">

                                            {faqsStatus === "succeeded" && (
                                                <div>
                                                    {faqs.map((faq) => (

                                                        <div className="accordion-item" >
                                                            <h2 className="accordion-header" 
                                                            id=
                                                            {"heading" + faq.id}
                                                            >
                                                                <button className="accordion-button" type="button"
                                                                    data-bs-toggle="collapse"
                                                                    data-bs-target={"#collapse" + faq.id}
                                                                    aria-expanded="true" aria-controls="collapseOne">
                                                                   {faq.faqName}
                                                                </button>
                                                            </h2>
                                                            <div id={"collapse" + faq.id}
                                                                className="accordion-collapse collapse"
                                                                aria-labelledby={"heading" + faq.id}
                                                                data-bs-parent="#shippingInfo">
                                                                <div className="accordion-body">
                                                                    <p>{faq.faqDescription}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}

                                                </div>
                                            )}
                                        </div>
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
