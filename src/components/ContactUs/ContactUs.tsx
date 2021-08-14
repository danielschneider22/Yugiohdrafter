import emailjs from 'emailjs-com';
import _ from 'lodash';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import emailkey from '../../constants/emailkey';
import { toastBGColorDict } from '../../constants/Toast';
import { addToast } from '../../data/toasts/actions';

type loadingState = "notLoading" | "loading" | "loaded" | "failed"

function ContactUs() {
    const [loadingState, setLoadingState] = useState("notLoading" as loadingState)
    const dispatch = useDispatch();
    
    function sendEmail(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoadingState("loading")
        emailjs.sendForm(emailkey.SERVICE_ID, emailkey.TEMPLATE_ID, e.target as HTMLFormElement, emailkey.USER_ID)
        .then((result) => {
            setLoadingState("loaded")
            dispatch(addToast({id: _.uniqueId("message-sent-"), type: "Success", description: "Message Sent", title: "Success", backgroundColor: toastBGColorDict["Success"]}))
        }, (error) => {
            setLoadingState("failed")
            dispatch(addToast({id: _.uniqueId("message-not-sent-"), type: "Danger", description: "Message Failed to Send", title: "Error", backgroundColor: toastBGColorDict["Danger"]}))
        });
    }
    return (
        <section id="contact" className="contact">
        <div className="container">

            <header className="section-header">
            <h2>Contact</h2>
            <p>Contact Us</p>
            </header>

            <div className="row gy-4">

            <div className="col-lg-6">

                <div className="row gy-4">
                <div className="col-md-6">
                    <div className="info-box">
                    <i className="bi bi-geo-alt"></i>
                    <h3>Address</h3>
                    <p>A108 Adam Street,<br />New York, NY 535022</p>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="info-box">
                    <i className="bi bi-telephone"></i>
                    <h3>Call Us</h3>
                    <p>+1 5589 55488 55<br />+1 6678 254445 41</p>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="info-box">
                    <i className="bi bi-envelope"></i>
                    <h3>Email Us</h3>
                    <p>yugiohdrafter@gmail.com</p>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="info-box">
                    <i className="bi bi-clock"></i>
                    <h3>Open Hours</h3>
                    <p>Monday - Friday<br />9:00AM - 05:00PM</p>
                    </div>
                </div>
                </div>

            </div>

            <div className="col-lg-6">
                <form action="forms/contact.php" method="post" className="php-email-form" onSubmit={sendEmail}>
                <div className="row gy-4">

                    <div className="col-md-6">
                        <input type="text" name="name" className="form-control" placeholder="Your Name" required />
                    </div>

                    <div className="col-md-6 ">
                        <input type="email" className="form-control" name="email" placeholder="Your Email" required />
                    </div>

                    <div className="col-md-12">
                        <input type="text" className="form-control" name="subject" placeholder="Subject" required />
                    </div>

                    <div className="col-md-12">
                        <textarea className="form-control" name="message" rows={6} placeholder="Message" required></textarea>
                    </div>

                    <div className="col-md-12 text-center">
                    { loadingState === "loading" && 
                        <div className="loading">Loading</div>
                    }

                    <button type="submit">Send Message</button>
                    </div>

                </div>
                </form>

            </div>

            </div>

        </div>

        </section>
        
        
    );
}

export default ContactUs;

