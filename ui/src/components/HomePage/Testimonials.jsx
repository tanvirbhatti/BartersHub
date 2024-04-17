import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export default function Testimonials() {
    const responsive = {
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3,
        }
      };
    
    const [testimonials,setTestimonials] = useState([])

    useEffect(() => {
        // Fetch data from the API
        
        fetch(`${process.env.REACT_APP_API_SERVER}/get-testimonials`)
            .then(response => response.json())
            .then(data => {
                // Assuming your response data structure is { "list of products": [...] }
                setTestimonials(data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <div>
            <div className="product-list-container p-0">
                <h3 className='p-5 pt-0 pb-0'><b>Testimonials:</b></h3>
                <Carousel
                    swipeable={false}
                    responsive={responsive}
                    infinite={true}
                    keyBoardControl={true}
                    containerClass="carousel-container"
                    removeArrowOnDeviceType={["tablet", "mobile"]}
                    dotListClass="custom-dot-list-style"
                    itemClass="carousel-item-padding-40-px"
                >
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="p-4">                        
                                <div className="card shadow p-1 bg-secondary rounded">
                                    <div className="card-body m-0">
                                        <div className="row">
                                            <div className="col-lg-12 p-3 pt-0 pb-0">
                                                <div className="row">
                                                    <div className="col-lg-12">
                                                        <div className="d-flex justify-content-center pb-3">
                                                            <div
                                                                className="userImage rounded"
                                                                alt="avatar"
                                                            />
                                                        </div>
                                                        <p className="text-capitalize text-center text-light fw-bold mb-0 pb-3">{testimonial.user.firstName}</p>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-lg-12">
                                                        <p className="text-center fw-light text-light mb-0 pb-3 px-3">"{testimonial.testimonialText}"</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        </div>
                    ))}
                </Carousel>
                {/* <div className="d-flex bg-dark p-3 mb-5 text-white text-center align-items-center justify-content-center">
                    <h4 className="m-0">Rate your experince with us!</h4>
                    <button type="button" className="upload-btn rounded mx-3">
                        <a href="/ListingsUpload" className="Listinglink">Post Your Ad</a>
                    </button>
                </div> */}
            </div>
        </div>
    );
}
