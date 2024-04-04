import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import GradientButton from '../../UI/GradientButton/GradientButton'

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
        
        fetch("http://localhost:8000/get-testimonials")
            .then(response => response.json())
            .then(data => {
                // Assuming your response data structure is { "list of products": [...] }
                setTestimonials(data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <div>
            <div className="product-list-container pt-0">
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
                                                        <div className="text-center">
                                                            <img
                                                                src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20%2810%29.webp"
                                                                className="rounded-circle shadow w-25"
                                                                alt="avatar"
                                                            />
                                                        </div>
                                                        <p className="text-capitalize text-center text-light fw-bold mb-0 pt-2">{testimonial.user.firstName}</p>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-lg-12">
                                                        <p className="text-center fw-light text-light mb-0 pt-1 pb-2">"{testimonial.testimonialText}"</p>
                                                        <p className="text-center text-capitalize text-light"><b>&nbsp;{testimonial.testimonialProduct}</b></p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        </div>
                    ))}
                    
                </Carousel>
            </div>
        </div>
    );
}
