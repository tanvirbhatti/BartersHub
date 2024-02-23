import React from "react";

export default function Testimonials() {
    return (
        <>
            <div className="row d-flex justify-content-center position-relative">
                <div className="col-md-8">
                    <div className="card shadow p-1 mb-5 bg-light rounded">
                        <div className="card-body m-0">
                            <div className="row">
                                <div className="col-lg-12">
                                    <p className="text-muted fw-light">
                                        BartersHub have utterly transformed my perspective on consumption. Now, instead of purchasing brand-new products, I seek chances to exchange or repurpose my existing possessions. This approach is not just beneficial for the environment but also smart from an economic standpoint. My home has been decluttered, I've uncovered new passions, and have forged significant relationships with other members. BartersHub transcends being merely a platform; it embodies a way of living.
                                    </p>
                                    <div className="text-end">
                                        <p className="fw-bold text-muted mb-0">- Sarah</p>
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
                            alt="woman avatar"
                            width="75"
                            height="75"
                        />
                    </div>
                </div>
            </div>

            <div className="row d-flex justify-content-center position-relative">
            <div className="col-md-1">
                    <div className="position-relative">
                        <img
                            src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20%2810%29.webp"
                            className="rounded-circle shadow"
                            alt="woman avatar"
                            width="75"
                            height="75"
                        />
                    </div>
                </div>
                <div className="col-md-8">
                    <div className="card shadow p-1 mb-5 bg-light rounded">
                        <div className="card-body m-0">
                            <div className="row">
                                <div className="col-lg-12">
                                    <p className="text-muted fw-light">
                                    Navigating financial challenges as a student is difficult, yet BartersHub has unveiled a pathway for me to acquire what I require without expending any money. Be it exchanging textbooks, swapping language tutoring, or even trading art materials, this platform has facilitated connections with individuals eager to trade goods and services. The essence of this isn't solely in monetary savings; it revolves around establishing bonds and gleaning insights from peers.
John
                                    </p>
                                    <div className="text-end">
                                        <p className="fw-bold text-muted mb-0">- John, College Student</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
