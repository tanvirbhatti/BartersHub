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
        
        fetch("http://localhost:8000/get-testimonials")
            .then(response => response.json())
            .then(data => {
                // Assuming your response data structure is { "list of products": [...] }
                setTestimonials(data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <>
            <Carousel
                swipeable={false}
                showDots={true}
                responsive={responsive}
                ssr={true} // means to render carousel on server-side.
                infinite={true}
                autoPlaySpeed={1000}
                keyBoardControl={true}
                containerClass="carousel-container"
                removeArrowOnDeviceType={["tablet", "mobile"]}
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-40-px"
                className="h-100"
            >
                {testimonials.map((testimonial, index) => (
                    <div key={index} className="p-4">                        
                            <div className="card shadow p-1 mb-5 bg-light rounded">
                                <div className="card-body m-0">
                                <div className="text-center">
                                            <img
                                            src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20%2810%29.webp"
                                            className="rounded-circle shadow w-25"
                                            alt="avatar"
                                            />
                                    </div>
                                    <p className="text-center fw-bold mb-0 text-muted">{testimonial.user.firstName}</p>
                                    <div className="row">
                                        <div className="col-lg-12 p-3 pt-0 pb-0">
                                            <p className="text-center fw-light">{testimonial.testimonialText}</p>
                                            <p className="mb-0 text-center p-5 pt-0 pb-0">product: {testimonial.testimonialProduct}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    </div>
                ))}
            </Carousel>
        </>
    );
}
