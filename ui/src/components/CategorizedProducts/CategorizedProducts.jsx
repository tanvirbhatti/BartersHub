import React, { useState, useEffect } from "react";
import Productcard from "../../UI/Cards/Productcard.jsx";
import "../../Assets/Stylesheets/Components/Productlisting.css";
import { useLocation } from "react-router";
import axios from "axios";
import { Link } from "react-router-dom";

export const CategorizedProducts = () => {
  const [products, setProducts] = useState([]);
  let [selectedCategory, setSelectedCategory] = useState();
  const location = useLocation();
  const slicedPath = location.pathname.slice(26);
  const [categories, setCategories] = useState();

  useEffect(() => {
    setSelectedCategory(decodeURIComponent(slicedPath));
  }, [])

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

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_SERVER}/get-products`)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data["list of products"]);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleClick = (category) => {
    setSelectedCategory(category)
  }

  return (
    <>
      <div className="marketplace">
            <header className='d-flex w-100 my-4 justify-content-center align-content-center gap-4 text-white py-3'>
                <h4 className='d-flex align-items-center mb-0'>List your product and get it sold Today!</h4>
                <button type="button" className="upload-btn">
                    <Link to="/ListingsUpload" className="Listinglink">Post Your Ad</Link>
                </button>
            </header>
        <div className="container pt-5">
          <div className="pb-3">
            <h4 className="fw-bold">Categories:</h4>
            <button className={`btn border mr-10px mb-2 ${selectedCategory === 'All' ? 'bg-orange text-white' : ''}`} to={'All'} onClick={() => handleClick('All')}>
              All
            </button>
            {categories && categories.map(category =>
              <button type="button" className={`btn border mr-10px mb-2 
                    ${(category.category === selectedCategory ? 'bg-orange text-white' : '')}`} key={category._id}
                onClick={() => handleClick(category.category)}
              >
                {category.category}
              </button>
            )}
          </div>

          <section className="products d-flex row">
            <>
              {selectedCategory === 'All' ? (
                products.map((product) => (
                  <Productcard product={product} key={product._id} />
                ))
              ) : (
                products.some((product) => product.category === selectedCategory) ? (
                  products.filter((product) => product.category === selectedCategory).map(
                    (product) => (
                      <Productcard product={product} key={product._id} />
                    )
                  )
                ) : (
                  <div className="p-5 mx-0 m-5 text-center">
                    <h2 className="fw-bold m-5 mx-0 p-4">No Results Found</h2>
                  </div>
                )
              )}

            </>
          </section>
        </div>
      </div>
    </>
  );
};
