import React, { useEffect, useState } from "react";


export default function Testimonials() {
    
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
            <div className="row d-flex justify-content-center position-relative">
                <div>
                    {testimonials.map((testimonial,index) => (
                        <div key={index} className="row d-flex justify-content-center position-relative">                        
                            <div className="col-md-8">
                                <div className="card shadow p-1 mb-5 bg-light rounded">
                                    <div className="card-body m-0">
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <p className="text-muted fw-light">{testimonial.testimonialText}</p>
                                                <div>
                                                    <p className="mb-0 text-muted">{testimonial.testimonialProduct}</p>
                                                    <p className="text-end fw-bold mb-0 text-muted">{testimonial.user.firstName}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-1">
                                <div className="position-relative">
                                    <img
                                    src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20%2810%29.webp"
                                        className="rounded-circle shadow"
                                        alt="avatar"
                                        width="75"
                                        height="75"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}            
                </div>
            </div>
        </>
    );
}
