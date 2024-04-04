import React from "react"; 

export default function Categories() {
    return (<div className="row p-5 pt-0 align-items-center no_gutter">
        <h3><b>Categories: </b></h3>
        <div>
            <button type="button" className="btn btn-secondary mr-10px">
                All Categories
            </button>

            <button type="button" className="btn btn-secondary mr-10px">
                Electronics
            </button>

            <button type="button" className="btn btn-secondary mr-10px">
                Furniture
            </button>
            <button type="button" className="btn btn-secondary mr-10px">
                Fashion
            </button>
            <button type="button" className="btn btn-secondary mr-10px">
                Toys & Games
            </button>
            <button type="button" className="btn btn-secondary mr-10px">
                Property Rentals
            </button>

            <button type="button" className="btn btn-secondary mr-10px mt-30px ">
                Home
            </button>
            <button type="button" className="btn btn-secondary mr-10px mt-30px ">
                Pet Supplies
            </button>
            <button type="button" className="btn btn-secondary mr-10px mt-30px ">
                Others
            </button>

        </div>
    </div>)
}