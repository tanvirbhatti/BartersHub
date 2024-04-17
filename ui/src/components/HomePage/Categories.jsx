import React, { useEffect, useState } from "react"; 
import axios from "axios";

export default function Categories() {

    const [categories,setCategories] = useState();

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = () => {
        axios
            .get(`${process.env.REACT_APP_API_SERVER}/get-all-categories`)
            .then((response) => {
                setCategories(response.data.categories);
            })
            .catch((error) => {
                console.error("Error fetching categories:", error);
            });
    };


    return (<div className="row p-5 pt-0 align-items-center no_gutter">
        <h3><b>Categories: </b></h3>
        <div>
            {categories && categories.map(category=>
                <button type="button" className="btn btn-secondary mr-10px mb-2" key={category._id}>
                    {category.category}
                </button>
            )}
        </div>
    </div>)
}