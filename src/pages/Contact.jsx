import React, { useState,useEffect } from "react";
import alertify from "alertifyjs";
import Hero from "../components/Hero";
import { fetchContact } from "../store/contactSlices";
import { useSelector,useDispatch } from "react-redux";
import { sendToMail } from "../store/contactSlices"; 



export default function Contact() {
  const dispatch = useDispatch();

  const contacts = useSelector((state) => state.contact);
  const contactStatus = useSelector((state) => state.contact.status);
  const error = useSelector((state) => state.contact.error);

  useEffect(()=>{
    if (contactStatus === "idle"){
      dispatch(fetchContact());
    }
  }, [contactStatus, dispatch]);
  
  

    const [formData, setFormData] = useState({
      customerName: "",
      customerEmail: "",
      contactSubject: "",
      contactMessage: "",
    });
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      const newContact = {
        name: formData.customerName,
        email: formData.customerEmail,
        subject: formData.contactSubject,
        message: formData.contactMessage,
      };
    
      dispatch(sendToMail(newContact));
      alertify.success("Contact sent successfully");

     
  
      setFormData({
        customerName: "",
        customerEmail: "",
        contactSubject: "",
        contactMessage: "",
      });
    };
  



  return (
    <>
    <Hero title="Contact Us" />
    <div className="page-content-wrapper">
      <div className="box-layout-map-area section-space">
        <div className="container">
          <div className="row">
      

            <div className="col-lg-12">
              <div className="box-layout-map-container">
                <iframe
                  title="map"
                  src={contacts?.maps?.[0]?.url || ""}
                  width="100%"
                  height={450}
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="contact-icon-text-area section-space">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="contact-icon-text-wrapper">
                <div className="row">
                  <div className="col-sm-4">
                    <div className="single-contact-icon-text">
                      <div className="single-contact-icon-text__icon">
                        <i className="fa fa-map-marker" />
                      </div>
                      <h3 className="single-contact-icon-text__title">
                       ADRES
                      </h3>
                      <p className="single-contact-icon-text__value">
                      {contacts.contact[0]?.address}
                      </p>
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="single-contact-icon-text">
                      <div className="single-contact-icon-text__icon">
                        <i className="fa fa-phone" />
                      </div>
                      <h3 className="single-contact-icon-text__title">
                        TELEFON NUMARASI
                      </h3>
                      <p className="single-contact-icon-text__value">
                      {contacts.contact[0]?.phone}

                      </p>
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="single-contact-icon-text">
                      <div className="single-contact-icon-text__icon">
                        <i className="fa fa-envelope" />
                      </div>
                      <h3 className="single-contact-icon-text__title">
                        MAİL ADRESİ
                      </h3>
                      <p className="single-contact-icon-text__value">
                      {contacts.contact[0]?.mail}

                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="contact-form-content-area section-space--contact-form">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="contact-form-content-wrapper">
                <div className="row">
                  <div className="col-md-8">
                    <div className="contact-form-wrapper">
                      <form id="contact-form" onSubmit={handleSubmit}>
                        <div className="row">
                          <div className="col-lg-4 col-sm-6">
                            <input
                              type="text"
                              placeholder="First Name *"
                              name="customerName"
                              id="customerName"
                              value={formData.customerName}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                          <div className="col-lg-4 col-sm-6">
                            <input
                              type="text"
                              placeholder="Email *"
                              name="customerEmail"
                              id="customerEmail"
                              value={formData.customerEmail}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                          <div className="col-lg-4">
                            <input
                              type="text"
                              placeholder="Subject"
                              name="contactSubject"
                              id="contactSubject"
                              value={formData.contactSubject}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="col-lg-12">
                            <textarea
                              cols={30}
                              rows={10}
                              placeholder="Message *"
                              name="contactMessage"
                              id="contactMessage"
                              value={formData.contactMessage}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                          <div className="col-lg-12">
                            <button
                              type="submit"
                              id="submit"
                              className="theme-button"
                            >
                              SEND A MESSAGE
                            </button>
                          </div>
                        </div>
                      </form>
                      <p className="form-messege" />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="contact-form-content">
                      <p>
                      {contacts.contact[0]?.pagedesc}

                      </p>
                      <ul className="social-links">
                        <li>
                          <a href="http://www.facebook.com/">
                            <i className="fa fa-facebook" />
                          </a>
                        </li>
                        <li>
                          <a href="http://www.plus.google.com/">
                            <i className="fa fa-google-plus" />
                          </a>
                        </li>
                        <li>
                          <a href="http://www.linkedin.com/">
                            <i className="fa fa-linkedin" />
                          </a>
                        </li>
                        <li>
                          <a href="http://www.twitter.com/">
                            <i className="fa fa-twitter" />
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
      </div>
    </div>
  </>
  )
}
